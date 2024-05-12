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

const processTranscript = (transcript: string)=>{
    console.log(transcript);
}

export const InputProvider = ({ children }: { children: React.ReactNode }) => {

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

    const [voiceToggle, setVoiceToggle] = useState(true);

    const startListening = () => {
        SpeechRecognition.startListening({continuous: true});
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    const toggleVoiceRecognition = () => {
        setVoiceToggle(prevState => !prevState);
    }

    useEffect(()=>{
        if(listening) return;
        startListening();
        console.log('Starting to listen...');
    }, [listening]);

    useEffect(() => {
        if (transcript) {
            processTranscript(transcript);
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
            <div className={styles.MicrophoneIcon}>
                <Image src={microphoneImage} alt="Microphone Image" width={50} height={50}/>
            </div>
            <div className={styles.MicrophoneIconButton}>
                <button onClick={toggleVoiceRecognition}>
                    Voice Recognition: {voiceToggle ? 'On' : 'Off'}
                </button>
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