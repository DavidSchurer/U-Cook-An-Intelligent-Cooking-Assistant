'use client'
import Image from 'next/image';
import styles from './page.module.scss';
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import { useInput } from 'compo/global/context/InputContext';

interface ParticipantTileProps {
    name: string;
    image: string;
}

function ParticipantTile({name, image}: ParticipantTileProps){
    return (
        <div className={styles.participant}>
            
            <Image className={styles.image} src={image} alt={name} width={400} height={300} />
            <p className={styles.name}>{name}</p>

        </div>
    )
}

function BottomPanel(){
    const router = useRouter();

    const {addVoiceRoute, removeVoiceRoute} = useInput();

    const handleButtonClick = () => {
        router.push('/categories-page');
    };

    const handleEndCall = () => {
        router.push('/');
    }

    useEffect(() => {
        addVoiceRoute('recipes', 'Okay, I have selected Recipes.', handleButtonClick, {
            visual: 'View Recipes'
        });
        addVoiceRoute('end call', 'Okay, I have ended the call.', handleEndCall, {
            visual: 'End Call'
        });

        return () => {
            removeVoiceRoute('recipes');
            removeVoiceRoute('end call');
        }
    }, []);

    return (
        <div className={styles.bottomPanel}>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/microphone.png" alt="Microphone" width={24} height={24} />
                    <span>Mute</span>
                </button>
            </div>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/video-camera.png" alt="Video Camera" width={24} height={24} />
                    <span>Video</span>
                </button>
            </div>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton} onClick={handleEndCall}>
                    <Image src="/icons/end-call.png" alt="End Call" width={24} height={24} />
                    <span>End Call</span>
                </button>
            </div>
            <div className={styles.bottomPanelItem} onClick={handleButtonClick}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/recipe-categories.svg" alt="Recipe Categories" width={24} height={24} />
                    <span>Recipes</span>
                </button>
            </div>
        </div>
    )
}

export default function CallScreen() {
    return (
        <div className={styles.container}>
            <div className={styles.callGrid}>
                <ParticipantTile name="David" image="/participants/david.png" />
                <ParticipantTile name="Ben" image="/participants/ben.png" />
                <ParticipantTile name="Shivam" image="/participants/shivam.png" />
                <ParticipantTile name="Harshitha" image="" />
                <ParticipantTile name="Selina (me)" image="/participants/selina.png" />
            </div>
            <BottomPanel />
        </div>
    )
}