'use client'
import Image from 'next/image';
import styles from './page.module.scss';
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from 'react';
import { useInput } from 'compo/global/context/InputContext';

interface ParticipantTileProps {
    name: string;
    image: string;
    me?: boolean;
}

function ParticipantTile({name, image, me}: ParticipantTileProps){

    const router = useRouter();

    const toFullscreen = ()=>{
        router.push('/call-screen/fullscreen/' + name.toLowerCase());
    }

    return (
        <div className={styles.participant} onClick={toFullscreen}>
            
            <Image className={styles.image} src={image} alt={name} width={400} height={300} />
            <p className={styles.name}>{me ? name + ' (me)' : name}</p>

        </div>
    )
}

export function BigParticipantTile({name, image}: ParticipantTileProps){
    return (
        <div className={styles.bigParticipant}>
            
            <Image className={styles.image} src={image} alt={name} width={400} height={300} />
            <p className={styles.name}>{name}</p>

        </div>
    )
}

export function BottomPanel(){
    const router = useRouter();

    const {addVoiceRoute, removeVoiceRoute} = useInput();

    const handleButtonClick = () => {
        router.push('/categories-page');
    };

    const handleEndCall = () => {
        router.push('/end-page');
    }

    const handleFullscreen = (name: string) => {
        router.push('/call-screen/fullscreen/' + name.toLowerCase());
    }

    useEffect(() => {
        addVoiceRoute('recipes', 'Okay, I have selected Recipes.', handleButtonClick, {
            visual: 'View Recipes'
        });
        addVoiceRoute('end call', 'Okay, I have ended the call.', handleEndCall, {
            visual: 'End Call'
        });

        addVoiceRoute('fullscreen david', 'Okay, you are viewing David in fullscreen.', () => handleFullscreen('David'), {
            visual: 'David'
        });
        addVoiceRoute('fullscreen ben', 'Okay, you are viewing Ben in fullscreen.', () => handleFullscreen('Ben'), {
            visual: 'Ben'
        });
        addVoiceRoute('fullscreen shivam', 'Okay, you are viewing Shivam in fullscreen.', () => handleFullscreen('Shivam'), {
            visual: 'Shivam'
        });
        addVoiceRoute('fullscreen harshitha', 'Okay, you are viewing Harshitha in fullscreen.', () => handleFullscreen('Harshitha'), {
            visual: 'Harshitha'
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

    const {recipeHTML} = useInput();

    const recipeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        if(recipeHTML){
            recipeContainerRef.current.innerHTML = recipeHTML;
        }

    }, [recipeHTML]);

    return (
        <div className={styles.container}>
            <div className={styles.callGrid}>
                <ParticipantTile name="David" image="/participants/david.png" />
                <ParticipantTile name="Ben" image="/participants/ben.png" />
                <ParticipantTile name="Shivam" image="/participants/shivam.png" />
                <ParticipantTile name="Harshitha" image="/participants/harshitha.png" />
                <ParticipantTile name="Selina" image="/participants/selina.png" me={true}/>
            </div>
            <div className={styles.recipeDisplay}>
                <h1 className={styles.heading}>Current Recipe:</h1>
                <hr/>
                <div ref={recipeContainerRef} className={styles.recipeContainer}>
                    There is currently no recipe to display! Find one now!
                    <h3>&quot;Hi Cook, find me some recipes!&quot;</h3>
                </div>
            </div>
            <BottomPanel />
        </div>
    )
}