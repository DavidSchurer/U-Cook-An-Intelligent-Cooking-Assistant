'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const input = useInput();

    const handleContinueClick = () => {
      router.push("/contacts-page");
    };

    return (
        <main className={styles.main}>
            <div className={styles.UCookHomePage}>

              <h1> U-Cook: Virtual Cooking Assistant</h1>

              <div className={styles.WelcomePopUp}>
                <p>Welcome to the U-Cook Virtual Cooking Assistant! <br/><br/>
                  This application strives to help you learn to cook with friends and family while using voice recognition to <br/>
                  effortlessly browse through different recipes and cookbooks! <br/><br/>
                  To start cooking please press continue!
                </p>

                <button onClick={handleContinueClick}><strong>Continue</strong></button>
              </div>
             
            </div>
            <p>{input.transcript}</p>
        </main>

  
    );
}