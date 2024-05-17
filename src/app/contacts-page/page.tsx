'use client'
import React from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from 'react';
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";

export default function ContactsPage() {

    const router = useRouter();
    const input = useInput();
  
      const handleContinueClick = () => {
        router.push("/categories-page");
      };


    return (
          <main className={styles.main}>
            <div className={styles.UCookHomePage}>
              <h1> U-Cook: Virtual Cooking Assistant</h1>
            </div>

            <div className={styles.ContactsPage}>
                <h1>Please Choose From Your List of Contacts to Create Group Call:</h1>
                <ul>
                    <li>David</li>
                    <li>Ben</li>
                    <li>Shivam</li>
                    <li>Harshitha</li>
                </ul>
                <button onClick={handleContinueClick} data-continue-button><strong>Continue</strong></button>
            </div>
          </main>
    );
}