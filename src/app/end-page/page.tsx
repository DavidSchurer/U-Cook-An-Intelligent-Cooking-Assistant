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

    const handleRatingClick = (ratingValue: number) => {
      setRating(ratingValue);
    };

    useEffect(()=>{


      addVoiceRoute('1 star', ['Okay, I have set the rating to 1 star, very bad.'], ()=>handleRatingClick(1), {
        visual: '1 Star'
      });
      addVoiceRoute('2 stars', ['Okay, I have set the rating to 2 stars, bad.'], ()=>handleRatingClick(2), {
        visual: '2 Stars'
      });
      addVoiceRoute('3 stars', ['Okay, I have set the rating to 3 stars, okay.'], ()=>handleRatingClick(3), {
        visual: '3 Stars'
      });
      addVoiceRoute('4 stars', ['Okay, I have set the rating to 4 stars, good.'], ()=>handleRatingClick(4), {
        visual: '4 Stars'
      });
      addVoiceRoute('5 stars', ['Okay, I have set the rating to 5 stars, excellent.'], ()=>handleRatingClick(5), {
        visual: '5 Stars'
      });

      addVoiceRoute('very bad', ['Okay, I have set the rating to 1 star, very bad.'], ()=>handleRatingClick(1), {
        visual: 'Very Bad'
      });
      addVoiceRoute('bad', ['Okay, I have set the rating to 2 stars, bad.'], ()=>handleRatingClick(2), {
        visual: 'Bad'
      });
      addVoiceRoute('okay', ['Okay, I have set the rating to 3 stars, okay.'], ()=>handleRatingClick(3), {
        visual: 'Okay'
      });
      addVoiceRoute('good', ['Okay, I have set the rating to 4 stars, good.'], ()=>handleRatingClick(4), {
        visual: 'Good'
      });
      addVoiceRoute('excellent', ['Okay, I have set the rating to 5 stars, excellent.'], ()=>handleRatingClick(5), {
        visual: 'Excellent'
      });

      return () => {
        removeVoiceRoute('1 star');
        removeVoiceRoute('2 stars');
        removeVoiceRoute('3 stars');
        removeVoiceRoute('4 stars');
        removeVoiceRoute('5 stars');

        removeVoiceRoute('very bad');
        removeVoiceRoute('bad');
        removeVoiceRoute('okay');
        removeVoiceRoute('good');
        removeVoiceRoute('excellent');
      }

    }, []);

    const [rating, setRating] = useState<number>(0);

    const ratingLabels = ["Very Bad", "Bad", "Okay", "Good", "Excellent"];

    return (
        <main className={styles.main}>
            <div className={styles.UCookHomePage}>

              <div className={styles.WelcomePopUp}>
                <h1>Thank you for using U-Cook: An Intelligent Cooking Assistant</h1>

                <p>How was your experience using U-Cook: An Intelligent Cooking Assistant today?</p>
                <p>Please enter a rating below:</p>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className={`${styles.starContainer} ${star <= rating ? styles.popUp : ''}`} 
                    onClick={() => handleRatingClick(star)}>
                      <span className={star <= rating ? styles.selectedStar : styles.star}>★</span>
                      <span className={styles.ratingLabel}>{ratingLabels[star - 1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </main>
    );
}