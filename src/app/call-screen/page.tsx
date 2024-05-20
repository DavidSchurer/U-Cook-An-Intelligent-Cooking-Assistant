import Image from 'next/image';
import styles from './page.module.scss';

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
    return (
        <div className={styles.bottomPanel}>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/microphone.svg" alt="Microphone" width={24} height={24} />
                </button>
            </div>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/video-camera.svg" alt="Video Camera" width={24} height={24} />
                </button>
            </div>
            <div className={styles.bottomPanelItem}>
                <button className={styles.bottomPanelButton}>
                    <Image src="/icons/end-call.svg" alt="End Call" width={24} height={24} />
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
                <div className={styles.participant}>
                    Shivam
                </div>
                <div className={styles.participant}>
                    Harshitha
                </div>
                <div className={styles.participant}>
                    Selina (Me)
                </div>
            </div>
            <BottomPanel />
        </div>
    )
}