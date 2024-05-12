'use client'
import React from 'react';
import Image from "next/image";
import styles from "./page.module.scss";
import { useInput } from 'compo/global/context/InputContext';
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
    return (
            <div className={styles.CategoriesPage}>
                <h1>Please choose a recepie category:</h1>
                <ul>
                    <li className = "horizotal-list">
                        <button class="button" onclick="">
                            <img src = "" alt ="pasta"/>
                            <span className = "button-text">Pastas</span>
                        </button>
                    </li>
                        
                    <li className = "horizotal-list">
                        <button class="button" onclick="">
                            <img src = "" alt ="Sandwiches"/>
                            <span className = "button-text">Sandwiches</span>
                        </button>
                    </li>
                    
                    <li className = "horizotal-list">
                        <button class="button" onclick="">
                            <img src = "" alt ="Soups"/>
                            <span className = "button-text">Soups</span>
                        </button>
                    </li>

                    <li className = "horizotal-list">
                        <button class="button" onclick="">
                            <img src = "" alt ="Chicken"/>
                            <span className = "button-text">Chicken</span>
                        </button>
                    </li>

                </ul>
                <button type="submit"><strong>Continue</strong></button>
            </div>
    );
}