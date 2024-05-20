'use client'
import React, { useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from 'react';
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";

export default function ContactsPage() {

    const router = useRouter();
    const {addVoiceRoute, removeVoiceRoute} = useInput();
  
      const handleContinueClick = () => {
        router.push("/call-screen");
      };

    const [option1Selected, setOption1Selected] = useState(false);
    const [option2Selected, setOption2Selected] = useState(false);
    const [option3Selected, setOption3Selected] = useState(false);
    const [option4Selected, setOption4Selected] = useState(false);
    
    useEffect(()=>{

      const selectOption1 = () => {
        setOption1Selected(true);
      }

      const selectOption2 = () => {
        setOption2Selected(true);
      }

      const selectOption3 = () => {
        setOption3Selected(true);
      }

      const selectOption4 = () => {
        setOption4Selected(true);
      }

      const deselectOption1 = () => {
        setOption1Selected(false);
      }

      const deselectOption2 = () => {
        setOption2Selected(false);
      }

      const deselectOption3 = () => {
        setOption3Selected(false);
      }

      const deselectOption4 = () => {
        setOption4Selected(false);
      }

      addVoiceRoute('select option 1', 'Okay, I have selected Option 1, David.', selectOption1, {
        visual: 'Select Option 1'
      });
      addVoiceRoute('select option 2', 'Okay, I have selected Option 2, Ben.', selectOption2, {
        visual: 'Select Option 2'
      });
      addVoiceRoute('select option 3', 'Okay, I have selected Option 3, Shivam.', selectOption3, {
        visual: 'Select Option 3'
      });
      addVoiceRoute('select option 4', 'Okay, I have selected Option 4, Harshitha.', selectOption4, {
        visual: 'Select Option 4'
      });

      addVoiceRoute('select david', 'Okay, I have selected Option 1, David.', selectOption1, {
        visual: 'Select David'
      });
      addVoiceRoute('select ben', 'Okay, I have selected Option 2, Ben.', selectOption2, {
        visual: 'Select Ben'
      });
      addVoiceRoute('select shivam', 'Okay, I have selected Option 3, Shivam.', selectOption3, {
        visual: 'Select Shivam'
      });
      addVoiceRoute('select harshitha', 'Okay, I have selected Option 4, Harshitha.', selectOption4, {
        visual: 'Select Harshitha'
      });
      
      addVoiceRoute('deselect option 1', 'Okay, I have de-selected Option 1, David.', deselectOption1, {
        visual: 'De-select Option 1'
      });
      addVoiceRoute('deselect option 2', 'Okay, I have de-selected Option 2, Ben.', deselectOption2, {
        visual: 'De-select Option 2'
      });
      addVoiceRoute('deselect option 3', 'Okay, I have de-selected Option 3, Shivam.', deselectOption3, {
        visual: 'De-select Option 3'
      });
      addVoiceRoute('deselect option 4', 'Okay, I have de-selected Option 4, Harshitha.', deselectOption4, {
        visual: 'De-select Option 4'
      });

      addVoiceRoute('select david', 'Okay, I have de-selected Option 1, David.', deselectOption1, {
        visual: 'De-Select David'
      });
      addVoiceRoute('select ben', 'Okay, I have de-selected Option 2, Ben.', deselectOption2, {
        visual: 'De-Select Ben'
      });
      addVoiceRoute('select shivam', 'Okay, I have de-selected Option 3, Shivam.', deselectOption3, {
        visual: 'De-Select Shivam'
      });
      addVoiceRoute('select harshitha', 'Okay, I have de-selected Option 4, Harshitha.', deselectOption4, {
        visual: 'De-Select Harshitha'
      });

      addVoiceRoute('continue', ['Okay, I have pressed Continue for you.'], handleContinueClick, {
        visual: 'Continue'
      });

      return () => {
        removeVoiceRoute('select option 1');
        removeVoiceRoute('select option 2');
        removeVoiceRoute('select option 3');
        removeVoiceRoute('select option 4');
        removeVoiceRoute('deselect option 1');
        removeVoiceRoute('deselect option 2');
        removeVoiceRoute('deselect option 3');
        removeVoiceRoute('deselect option 4');

        removeVoiceRoute('select david');
        removeVoiceRoute('select ben');
        removeVoiceRoute('select shivam');
        removeVoiceRoute('select harshitha');
        removeVoiceRoute('deselect david');
        removeVoiceRoute('deselect ben');
        removeVoiceRoute('deselect shivam');
        removeVoiceRoute('deselect harshitha');

        removeVoiceRoute('continue');
      }

    }, []);
    

    return (
          <main className={styles.main}>

            <div className={styles.ContactsPage}>
                <h1>Please Choose From Your List of Contacts to Create Group Call:</h1>
                <ol>
                    <li className={option1Selected ? styles.selected : ''}>David</li>
                    <li className={option2Selected ? styles.selected : ''}>Ben</li>
                    <li className={option3Selected ? styles.selected : ''}>Shivam</li>
                    <li className={option4Selected ? styles.selected : ''}>Harshitha</li>
                </ol>
                <button onClick={handleContinueClick} data-continue-button><strong>Continue</strong></button>
            </div>
          </main>
    );
}