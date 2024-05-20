'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect, useRef, useState } from 'react';
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {addVoiceRoute, removeVoiceRoute} = useInput();

    const handleContinueClick = () => {
      router.push("/");
    };

    const continueButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(()=>{

      const pressContinue = () => {
        if(continueButtonRef.current){
          continueButtonRef.current.click();
        }
      }

      addVoiceRoute('continue', ['Okay, I have pressed Continue for you.'], pressContinue, {
        visual: 'Continue'
      });

      return () => {
        removeVoiceRoute('continue');
      }

    }, []);

    const [rating, setRating] = useState<number>(0);

    const handleRatingClick = (ratingValue: number) => {
      setRating(ratingValue);
    };

    return (
        <main className={styles.main}>
            <div className={styles.UCookHomePage}>

              <div className={styles.WelcomePopUp}>
                <h1>Thank you for using U-Cook: An Intelligent Cooking Assistant</h1>

                <p>How was your experience using U-Cook: An Intelligent Cooking Assistant?</p>
                <p>Please enter a rating below:</p>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= rating ? styles.selectedStar : styles.star}
                      onClick={() => handleRatingClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
        </main>
    );
}