'use client'
import React from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";
import pastaImage from './pasta.jpg';
import soupImage from './soups.jpg';
import sandwichesImage from './sandwiches.jpeg';
import chickenImage from './chicken.jpg';

export default function CategoriesPage() {
    return (
            <div className={styles.CategoriesPage}>
                <h1>Please choose a recepie category:</h1>
                <ul className = {styles ["horizontal-list"]}>
                    <li className= {styles ["horizontal-list-item"]}>
                        <button className="button" >
                            <div className="Image">
                            <Image src = {pastaImage}
                             height= {150}
                             alt ="pasta"/>
                            </div>
                            <span className = "button-text">Pastas</span>
                        </button>
                    </li>
                        
                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" >
                        <div className="Image">
                        <Image height= {150} src = {sandwichesImage} alt ="sandwiches"/>
                        </div>
                            <span className = "button-text">Sandwiches</span>
                        </button>
                    </li>
                    
                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" >
                            <div className="Image">
                                <Image src = {soupImage} height= {150} alt ="Soups"/>
                            </div>
                            <span className = "button-text">Soups</span>
                        </button>
                    </li>

                    <li className={styles ["horizontal-list-item"]}>
                        <button className="button" >
                        <div className="Image">
                        <Image src = {chickenImage} height= {150} alt ="chicken"/>
                        </div>
                            <span className = "button-text">Chicken</span>
                        </button>
                    </li>

                </ul>
                <button type="submit"><strong>Continue</strong></button>
            </div>
    );
}