'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './_InputContext.module.scss';
import microphoneImage from 'app/images/microphoneImage.png';
import Image from 'next/image';

import useSound from 'use-sound';

interface InputAPI {
    transcript: string;

    voiceToggle: boolean;

    startListening: ()=>void;
    stopListening: ()=>void;
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

        return "I don't understand what you mean."
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

    useEffect(()=>{

        const onWindowLoad = () => {
            // startListening();
        }

        window.addEventListener('load', onWindowLoad);

        return () => {
            window.removeEventListener('load', onWindowLoad);
        }
    }, []);

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
            
            const response = processTranscript(transcript);
            speakText(response);

            clearTimeout(feedbackTimerRef.current);
            feedbackTimerRef.current = setTimeout(()=>{
                setCommandTranscript("");
                setAssistantFeedback(false);
            }, 5000);

        }, transcript=='' ? 5000 : 2000);
    }, [transcript]);

    const api = {
        transcript,
        voiceToggle,
        startListening,
        stopListening
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
                        <p>I don&apos;t understand what you mean</p>
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