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

export default function CallScreen() {
    return (
        <div className={styles.container}>
            <h1>Call Screen</h1>
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
        </div>
    )
}