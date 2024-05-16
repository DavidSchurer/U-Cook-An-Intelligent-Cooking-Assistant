'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './_InputContext.module.scss';
import microphoneImage from 'app/images/microphoneImage.png';
import Image from 'next/image';

interface InputAPI {
    transcript: string;

    voiceToggle: boolean;

    startListening: ()=>void;
    stopListening: ()=>void;
}

export const InputContext = createContext<InputAPI | null>(null);

export const InputProvider = ({ children }: { children: React.ReactNode }) => {

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

    const [voiceToggle, setVoiceToggle] = useState(true);

    const [commandTranscript, setCommandTranscript] = useState('');

    const [assistantListening, setAssistantListening] = useState(false);
    
    const startListening = () => {
        SpeechRecognition.startListening({continuous: true});
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    const firstWords = ['i', 'hi', 'hey', 'hello', 'high', 'hay']

    const secondWords = ['cook', 'chef'];

    const processPassiveTranscript = (transcript: string)=>{
        
        const words = transcript.split(' ');

        // For all pages with a continue button, when the user says the word 'Continue'
        // the continue button will be clicked.
        if (words.includes('continue')) {
            const continueButton = document.querySelector('button[data-continue-button]');
            if (continueButton) {
                continueButton.click();
            }
        }

        // On the recipe category page, when the user says 'Pasta' the pastas recipe
        // button will be clicked.
        if (words.includes('pasta') || words.includes('pastas')) {
            const pastasButton = document.querySelector('button[data-pastas-button]');
            if (pastasButton) {
                pastasButton.click();
            }
        }

        if(words.length < 2) return;

        const lastWord = words[words.length-1].toLowerCase().replace(/[^\w\s]|_/g, '');
        const secondLastWord = words[words.length-2].toLowerCase().replace(/[^\w\s]|_/g, '');

        console.log([secondLastWord, lastWord]);

        if(firstWords.includes(secondLastWord) && secondWords.includes(lastWord)){
            resetTranscript();
            setAssistantListening(true);
            alert('How are you')
            return;
        }

        if(words.length > 5 && !firstWords.includes(lastWord)){
            resetTranscript();
        }
    }

    const toggleVoiceRecognition = () => {
        setVoiceToggle(prevState => !prevState);
    }

    useEffect(()=>{
        if(listening) return;
        startListening();
        console.log('Starting to listen...');
    }, []);

    useEffect(() => {
        if (transcript) {
            processPassiveTranscript(transcript);
            console.log('Transcript:',transcript);
        }
    }, [transcript]);

    useEffect(()=>{
        console.log('Listening:',listening);
        if(!listening) startListening();
    }, [listening]);

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
                <div className={styles.microphoneTranscript}>
                    <h3>How can I help:</h3>
                    {commandTranscript}...
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