import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <div>
                <h1>U-Cook</h1>
                <p>Welcome to U-Cook!</p>
            </div>
        </main>
    );
}
