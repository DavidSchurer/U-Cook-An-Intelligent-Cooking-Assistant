'use client'
import React, { useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import pastaImage from './pasta.jpg';
import soupImage from './soups.jpg';
import sandwichesImage from './sandwiches.jpeg';
import chickenImage from './chicken.jpg';

export default function CategoriesPage() {

    const router = useRouter();
    const {addVoiceRoute, removeVoiceRoute} = useInput();

    useEffect(()=>{
        addVoiceRoute('pastas', 'Okay, I have selected Pastas.', () => handleNavigate('pasta'), {
            visual: 'Select Pastas'
        });
        addVoiceRoute('sandwiches', 'Okay, I have selected Sandwiches.', () => handleNavigate('sandwiches'), {
            visual: 'Select Sandwiches'
        });
        addVoiceRoute('soups', 'Okay, I have selected Soups.', () => handleNavigate('soups'), {
            visual: 'Select Soups'
        });
        addVoiceRoute('chicken', 'Okay, I have selected Chicken.', () => handleNavigate('chicken'), {
            visual: 'Select Chicken'
        });

        return () => {
            removeVoiceRoute('pastas');
            removeVoiceRoute('sandwiches');
            removeVoiceRoute('soups');
            removeVoiceRoute('chicken');
        }
    }, []);

    const handleNavigate = (category: string) => {
        router.push(`/recipes/${category}`);
    }

    return (
        <>
         <main className={styles.main}>
            <div className={styles.UCookHomePage}>
               <h1> U-Cook: Virtual Cooking Assistant</h1>
            </div>

            <div className={styles.CategoriesPage}>
                <h1>Please Choose a Recipe Category:</h1>
                <ul className = {styles ["horizontal-list"]}>
                    <li className= {styles ["horizontal-list-item"]}>
                        <button className="button" onClick={() => handleNavigate('pasta')} data-pastas-button>
                            <div className="Image">
                            <Image src = {pastaImage}
                             height= {150}
                             alt ="pasta"/>
                            </div>
                            <span className = "button-text">Pastas</span>
                        </button>
                    </li>

                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" onClick={() => handleNavigate('sandwiches')}>
                            <div className="Image">
                            <Image src = {sandwichesImage} height= {150} alt ="Soups"/>
                            </div>
                            <span className = "button-text">Sandwiches</span>
                        </button>
                    </li>

                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" onClick={() => handleNavigate('soups')}>
                            <div className="Image">
                                <Image src = {soupImage} height= {150} alt ="Soups"/>
                            </div>
                            <span className = "button-text">Soups</span>
                        </button>
                    </li>

                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" onClick={() => handleNavigate('chicken')}>
                        <div className="Image">
                        <Image src = {chickenImage} height= {150} alt ="chicken"/>
                        </div>
                            <span className = "button-text">Chicken</span>
                        </button>
                    </li>

                </ul>
                <button type="submit" data-continue-button><strong>Continue</strong></button>
            </div>
          </main>
        </>
    );
}