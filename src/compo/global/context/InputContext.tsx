'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './_InputContext.module.scss';
import microphoneImage from 'app/images/microphoneImage.png';
import Image from 'next/image';

import useSound from 'use-sound';
import { convertNumbersInPhrase } from 'util/numToWorded';

const calculateLikelihood = (target: string, input: string)=>{
    // Example likelihood function: string similarity using Jaccard index
    const targetSet = new Set(target.split(' '));
    const inputSet = new Set(input.split(' '));
    const intersection = new Set([...targetSet].filter(x => inputSet.has(x)));
    const union = new Set([...targetSet, ...inputSet]);
    return intersection.size / union.size;
}

const THRESHOLD = 0.1;

const findMaxIndexes = (arr: number[]) => {
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
    if(max < THRESHOLD) return [];
    return maxIndexes;
}

const determineCommand = (targetPhrase: string, inputPhrases: string[])=>{

    const weights = inputPhrases.map(phrase => calculateLikelihood(targetPhrase, phrase));
    console.log(weights);
    let maxIndexes = findMaxIndexes(weights);
    console.log(maxIndexes);

    return maxIndexes.map(index => inputPhrases[index]);
}


interface InputAPI {
    transcript: string;

    voiceToggle: boolean;

    startListening: ()=>void;
    stopListening: ()=>void;

    addVoiceRoute: (route: string, feedback: string, callback: ()=>void, args?: any)=>void;
    removeVoiceRoute: (route: string)=>void;
}

type VoiceRoute = ()=>void;

type VoiceRouteProps = {
    feedback: string;
    callback: VoiceRoute;
    visual?: string;
}

const sanitizeTranscript = (transcript: string) => {
    return convertNumbersInPhrase(transcript.toLowerCase());
}

export const InputContext = createContext<InputAPI | null>(null);

export const InputProvider = ({ children }: { children: React.ReactNode }) => {

    const [playWake] = useSound('/sounds/cook_wakeup.mp3');
    const [playFail] = useSound('/sounds/cook_fail.mp3');
    const [playProcess] = useSound('/sounds/cook_process.mp3');

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

    const [voiceToggle, setVoiceToggle] = useState(false);

    const [commandTranscript, setCommandTranscript] = useState('');

    const [assistantListening, setAssistantListening] = useState(false);
    const [assistantFeedback, setAssistantFeedback] = useState(false);
    const [assistantMessage, setAssistantMessage] = useState([]);

    const voiceRoutes = useRef<Map<string,VoiceRouteProps>>(new Map());

    const addVoiceRoute = (route: string, feedback: string, callback: VoiceRoute, args: any = {}) => {
        const props: VoiceRouteProps = {feedback, callback, visual: args.visual};
        voiceRoutes.current.set(sanitizeTranscript(route), props);
    }

    const removeVoiceRoute = (route: string) => {
        voiceRoutes.current.delete(sanitizeTranscript(route));
    }
    
    const startListening = () => {
        SpeechRecognition.startListening({continuous: true});
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    const voiceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

    const firstWords = ['a', 'me', 'i', 'hi', 'hey', 'hello', 'high', 'hay']

    const secondWords = ['cook', 'chef'];

    const processTranscript = (transcript: string)=>{

        // add voice processing data here

        if(voiceRoutes.current.size === 0) return ["I cannot process your request at this time."];

        const matches: string[] = determineCommand(transcript, Array.from(voiceRoutes.current.keys()));

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
        return [bestProps?.feedback];
    }

    const processPassiveTranscript = (transcript: string)=>{
        
        const words = transcript.split(' ');

        // // For all pages with a continue button, when the user says the word 'Continue'
        // // the continue button will be clicked.
        // if (words.includes('continue')) {
        //     const continueButton = document.querySelector('button[data-continue-button]');
        //     if (continueButton) {
        //         continueButton.click();
        //     }
        // }

        // // On the recipe category page, when the user says 'Pasta' the pastas recipe
        // // button will be clicked.
        // if (words.includes('pasta') || words.includes('pastas')) {
        //     const pastasButton = document.querySelector('button[data-pastas-button]');
        //     if (pastasButton) {
        //         pastasButton.click();
        //     }
        // }

        if(words.length < 2) return;

        const lastWord = words[words.length-1].toLowerCase().replace(/[^\w\s]|_/g, '');
        const secondLastWord = words[words.length-2].toLowerCase().replace(/[^\w\s]|_/g, '');

        console.log([secondLastWord, lastWord]);

        if(assistantListening) {
            setCommandTranscript(transcript);
        }

        if(firstWords.includes(secondLastWord) && secondWords.includes(lastWord)){
            resetTranscript();
            setAssistantListening(true);
            setAssistantFeedback(false);
            playWake();
            clearTimeout(voiceTimerRef.current);
            clearTimeout(feedbackTimerRef.current);
            setCommandTranscript("");
            return;
        }

        if(!assistantListening && words.length > 5 && !firstWords.includes(lastWord)){
            resetTranscript();
        }
    }

    const toggleVoiceRecognition = () => {
        if(voiceToggle)
            stopListening();
        else
            startListening();
        setVoiceToggle(prevState => !prevState);
    }

    const speakText = (text: string) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    useEffect(() => {
        if (transcript) {
            processPassiveTranscript(transcript);
            console.log('Transcript:',transcript);
        }
    }, [transcript]);

    useEffect(() => {
        if(!assistantListening) return;

        clearTimeout(voiceTimerRef.current);
        voiceTimerRef.current = setTimeout(()=>{
            setAssistantListening(false);

            if(transcript === ''){
                playFail();
                return;
            }
            resetTranscript();
            playProcess();

            setAssistantFeedback(true);
            
            const response = processTranscript(sanitizeTranscript(transcript));
            speakText(response.join(' '));
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

        }, transcript=='' ? 5000 : 2000);
    }, [transcript]);

    const api = {
        transcript,
        voiceToggle,
        startListening,
        stopListening,

        addVoiceRoute,
        removeVoiceRoute
    }

    return (
        <InputContext.Provider value={api}>
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