'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './_InputContext.module.scss';
import microphoneImage from 'app/images/microphoneImage.png';
import Image from 'next/image';

import { convertNumbersInPhrase } from 'util/numToWorded';
import useAudio from 'util/audio/useAudio';

// Function to calculate Levenshtein distance
function levenshtein(a, b) {
    const matrix = [];
    
    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1  // deletion
            )
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  
  // Function to calculate word similarity based on Levenshtein distance
  function wordSimilarity(word1, word2) {
    const maxLen = Math.max(word1.length, word2.length);
    return (maxLen - levenshtein(word1, word2)) / maxLen;
  }

// Function to calculate the likelihood based on word similarity
function calculateLikelihood(target, input) {
    const targetWords = target.split(' ');
    const inputWords = input.split(' ');
  
    let totalSimilarity = 0;
  
    targetWords.forEach(targetWord => {
      let maxSimilarity = 0;
      inputWords.forEach(inputWord => {
        let similarity = wordSimilarity(targetWord, inputWord);
        if(similarity<=0.5) similarity = 0;
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
        }
      });
      totalSimilarity += maxSimilarity;
    });

    let likelihood = totalSimilarity / targetWords.length;
    if(likelihood<0.1) likelihood = 0;
  
    return likelihood;
  }

const findMaxIndexes = (arr: number[], threshold: number) => {
    let max = -Infinity;
    let maxIndexes = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            maxIndexes = [i];
        } else if (arr[i] === max) {
            maxIndexes.push(i);
        }
    }
    if(max < threshold) return {
        max,
        maxIndexes: []
    };
    return {max, maxIndexes};
}

const determineCommand = (voiceRoutes: Map<string,VoiceRouteProps>, targetPhrase: string, inputPhrases: string[])=>{

    let weights = inputPhrases.map(phrase => calculateLikelihood(targetPhrase, phrase));
    console.log('weights',weights);
    let maxIndexesCompo = findMaxIndexes(weights, 0);

    if(maxIndexesCompo.max == 0) return [];

    let maxIndexes = maxIndexesCompo.maxIndexes;
    console.log('maxIndexes',maxIndexes);

    return maxIndexes.map(index => inputPhrases[index]);
}


interface InputAPI {
    transcript: string;

    voiceToggle: boolean;

    addVoiceRoute: (route: string, feedback: string|string[]|(()=>string[]), callback: ()=>void, args?: any)=>void;
    removeVoiceRoute: (route: string)=>void;
}

type VoiceRoute = ()=>void;

type VoiceRouteProps = {
    feedback: string[]|(()=>string[]);
    callback: VoiceRoute;
    visual?: string;
}

const sanitizeTranscript = (transcript: string) => {
    return convertNumbersInPhrase(transcript.toLowerCase()).replace(/[^a-zA-Z0-9 ]/g, '');
}

export const InputContext = createContext<InputAPI | null>(null);

export const InputProvider = ({ children }: { children: React.ReactNode }) => {

    const audioWake = useAudio('/sounds/cook_wakeup.mp3');
    const audioFail = useAudio('/sounds/cook_fail.mp3');
    const audioProcess = useAudio('/sounds/cook_process.mp3');

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
    
    const [voiceToggle, setVoiceToggle] = useState(true);

    const [sanitizedTranscript, setSanitizedTranscript] = useState('');

    const [commandTranscript, setCommandTranscript] = useState('');

    const [assistantListening, setAssistantListening] = useState(false);
    const [assistantFeedback, setAssistantFeedback] = useState(false);
    const [assistantMessage, setAssistantMessage] = useState([]);

    const residualTranscript = useRef<string | null>(null);

    const lastWakeupIndex = useRef<number | null>(null);
    const wakeupLenRef = useRef<number | null>(null);

    const extractTranscript = (transcript: string) => {
        if(lastWakeupIndex.current === null || wakeupLenRef.current === null) return transcript;
        return transcript.slice(lastWakeupIndex.current + wakeupLenRef.current);
    }

    const voiceRoutes = useRef<Map<string,VoiceRouteProps>>(new Map());
    
    const addVoiceRoute = (route: string, feedback: string|string[]|(()=>string[]), callback: VoiceRoute, args: any = {}) => {
        if(typeof feedback === 'string') feedback = [feedback];
        const props: VoiceRouteProps = {feedback, callback, visual: args.visual};
        voiceRoutes.current.set(sanitizeTranscript(route), props);
    }

    const removeVoiceRoute = (route: string) => {

        if(!voiceRoutes.current.has(sanitizeTranscript(route))) return;

        voiceRoutes.current.delete(sanitizeTranscript(route));
    }
    
    const startListening = () => {
        SpeechRecognition.startListening({continuous: true});
    }

    const stopListening = () => {
        SpeechRecognition.abortListening();
    }

    const voiceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

    const firstWords = ['a', 'me', 'i', 'hi', 'hey', 'hello', 'high', 'hay']

    const secondWords = ['cook', 'chef'];

    const helpRoute = {
        feedback: ()=>{
            let helpList = ["Here are the commands you can say:"];
            voiceRoutes.current.forEach((value, key)=>{
                helpList.push(`- ${value.visual || key}`);
            });
            helpList.push('');
            helpList.push('Tip: your commands only need to be similar enough to be recognized.')
            return helpList;
        },
        callback: ()=>{},
        visual: "Help"
    }

    const backRoute = {
        feedback: ['Going back...'],
        callback: ()=>{window.history.back()},
        visual: "Back"
    }

    const muteRoute = {
        feedback: ['Okay, I have muted the mic.'],
        callback: ()=>{setVoiceToggle(false)},
        visual: "Mute"
    }

    useEffect(()=>{

        let sanitizedSample = sanitizeTranscript(transcript);
        if(sanitizedSample !== sanitizedTranscript) {
            setSanitizedTranscript(sanitizedSample);
        };

    }, [transcript]);

    useEffect(()=>{
        addVoiceRoute('help', helpRoute.feedback, helpRoute.callback, helpRoute);
        addVoiceRoute('back', backRoute.feedback, backRoute.callback, backRoute);
        addVoiceRoute('mute', muteRoute.feedback, muteRoute.callback, muteRoute);

        return ()=>{
            removeVoiceRoute('help');
            removeVoiceRoute('back');
            removeVoiceRoute('mute');
        }
    }, []);

    const processTranscript = (transcript: string)=>{

        if(transcript=='help'){
            let helpList = ["Here are the commands you can say:"];
            voiceRoutes.current.forEach((value, key)=>{
                helpList.push(`- ${value.visual || key}`);
            });
            helpList.push('Tip: your commands only need to be similar enough to be recognized.')
            return helpList;
        }

        // add voice processing data here

        if(voiceRoutes.current.size === 0) return ["I cannot process your request at this time."];

        const matches: string[] = determineCommand(voiceRoutes.current, transcript, Array.from(voiceRoutes.current.keys()));

        if(matches.length === 0) return ["I don't understand what you mean."];

        if(matches.length > 1){
            let ambiguousOutput = ["Which of the following do you mean?"]
            for(let i = 0; i < matches.length; i++){
                let visual = voiceRoutes.current.get(matches[i])?.visual || matches[i];
                ambiguousOutput.push(`- ${visual}`);
            }
            return ambiguousOutput;
        };

        const bestMatch = matches[0];

        const bestProps = voiceRoutes.current.get(bestMatch);

        bestProps?.callback();

        let returnFeedback;

        if(typeof bestProps?.feedback === 'function'){
            returnFeedback = bestProps?.feedback();
        } else {
            returnFeedback = bestProps?.feedback;
        }

        return returnFeedback;
    }

    const processPassiveTranscript = (transcript: string)=>{
        
        const words = transcript.split(' ');

        if(assistantListening) {
            setCommandTranscript(extractTranscript(transcript));
        }

        if(words.length < 2) return;

        const lastWord = words[words.length-1].toLowerCase().replace(/[^\w\s]|_/g, '');
        const secondLastWord = words[words.length-2].toLowerCase().replace(/[^\w\s]|_/g, '');

        console.log([secondLastWord, lastWord]);

        if(firstWords.includes(secondLastWord) && secondWords.includes(lastWord)){

            lastWakeupIndex.current = transcript.toLowerCase().lastIndexOf([secondLastWord, lastWord].join(' '));
            wakeupLenRef.current = [secondLastWord, lastWord].join(' ').length;

            setAssistantListening(true);
            setAssistantFeedback(false);
            setAssistantMessage([]);
            window.speechSynthesis.cancel();
            audioWake();
            clearTimeout(voiceTimerRef.current);
            clearTimeout(feedbackTimerRef.current);
            setCommandTranscript("");
            return;
        }

        if(!assistantListening && words.length > 10 && !firstWords.includes(lastWord)){
            resetTranscript();
        }
    }

    const toggleVoiceRecognition = () => {
        setVoiceToggle(prevState => !prevState);
    }

    useEffect(() => {
        if(voiceToggle){
            startListening();
        } else {
            stopListening();
        }
    }, [voiceToggle]);

    const speakText = (text: string) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    useEffect(() => {
        if (sanitizedTranscript) {
            processPassiveTranscript(transcript);
            console.log('Transcript:',transcript);
        }
    }, [sanitizedTranscript]);

    useEffect(() => {

        console.log('extracted:',extractTranscript(transcript));

        clearTimeout(voiceTimerRef.current);
        voiceTimerRef.current = setTimeout(()=>{

            if(!assistantFeedback && extractTranscript(transcript) === ''){
                audioFail();
                setAssistantListening(false);
                return;
            }
            resetTranscript();

            if(!assistantListening) return;
            setAssistantListening(false);

            audioProcess();

            setAssistantFeedback(true);
            
            const response = processTranscript(sanitizeTranscript(transcript));
            speakText(response.join('\n'));
            setAssistantMessage(response);

            const startCloseTimer = ()=>{
                clearTimeout(feedbackTimerRef.current);
                feedbackTimerRef.current = setTimeout(()=>{

                    if(window.speechSynthesis.speaking){
                        startCloseTimer();
                        return;
                    }

                    setCommandTranscript("");
                    setAssistantFeedback(false);
                }, 5000);
            };

            startCloseTimer();

        }, extractTranscript(transcript)=='' ? 5000 : 2000);
    }, [sanitizedTranscript]);

    const api = {
        transcript,
        voiceToggle,

        addVoiceRoute,
        removeVoiceRoute
    }

    return (
        <InputContext.Provider value={api}>
            <header className={styles.header}>
                <Image className={styles.inlineUCook} src="ucook-inline.svg" alt="U-Cook" width={40} height={40}/>
                <h1>
                    <strong className={styles.title}>U-COOK:</strong> <span className={styles.desc}>An Intelligent Cooking Assistant for <span className={styles.em}>U</span> to <span className={styles.em}>COOK</span></span>
                </h1>
            </header>
            {children}
            <div className={styles.microphoneContainer}>
                <div className={styles.MicrophoneIcon}>
                    <Image src={microphoneImage} alt="Microphone Image" width={50} height={50}/>
                </div>
                <div className={styles.MicrophoneIconButton}>
                    <button onClick={toggleVoiceRecognition}>
                        Voice Recognition: {voiceToggle ? 'On' : 'Off'}
                    </button>
                </div>
                <div className={`${styles.microphoneTranscript} ${assistantListening || assistantFeedback ? styles.visible : ''}`}>
                    <div className={`${styles.prompt} ${!assistantFeedback ? styles.visible : ''}`}>
                        <h3 className={styles.label}>How can I help:</h3>
                    </div>
                    {commandTranscript}...
                    <div className={`${styles.response} ${assistantFeedback ? styles.visible : ''}`}>
                        <p>
                            {assistantMessage.map((line,i)=>
                                <span key={i}>{line}<br/></span>
                            )}
                        </p>

                    </div>
                </div>
            </div>
        </InputContext.Provider>
    )

}

export const useInput = ()=>{

    const context = useContext(InputContext);

    if (!context) {
        throw new Error('useInput must be used within an InputProvider');
    }

    return context;

}