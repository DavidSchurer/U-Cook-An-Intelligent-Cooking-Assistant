'use client'
import React from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";

export default function ContactsPage() {
    const router = useRouter();
    const input = useInput();
  
      const handleContinueClick = () => {
        router.push("/categories-page");
      };
    return (
            <div className={styles.ContactsPage}>
                <h1>Please Choose from your list of contacts to create group call:</h1>
                <ul>
                    <li>David</li>
                    <li>Ben</li>
                    <li>Shivam</li>
                    <li>Harshitha</li>
                </ul>
                <button onClick={handleContinueClick}><strong>Continue</strong></button>
            </div>
    );
}