import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';

export default function Home() {

    // const input = useInput();

    return (
        <main className={styles.main}>
            <div>
                <h1>U-Cook</h1>
                <p>Welcome to U-Cook!</p>
                <p>LETS GET COOKING 🧑‍🍳</p>
            </div>
            {/* <p>{input.transcript}</p> */}
        </main>
    );
}
