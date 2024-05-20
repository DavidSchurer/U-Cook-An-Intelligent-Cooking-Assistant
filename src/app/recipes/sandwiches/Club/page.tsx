'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function Club() {
    const router = useRouter();

    // Function to handle navigation back to the call screen page
    const handleCallScreenButton = () => {
        router.push(`/call-screen`);
    }

    return (
        <>
            <main className={styles.main}>
            </main>
            <div className={styles.PastaPage}>
                <h1>Club Sandwich</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>3 pieces sliced bread</li>
                        <li>Butter, softened</li>
                        <li>3 Tbsp. mayonnaise</li>
                        <li>Romaine</li>
                        <li>2 tomato slices</li>
                        <li>Kosher salt </li>
                        <li>Freshly ground black pepper</li>
                        <li>2 pieces bacon, cooked</li>
                        <li>1 thick slice cheddar </li>
                        <li>2 slices turkey</li>
                        <li>2 slices ham</li>
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Toast Bread:</h3>
                            Toast bread until golden, then spread a thin layer of butter on both sides of every slice.
                        </li>
                        <li>
                            <h3>Prepate First Slice:</h3>
                            Spread mayonnaise on one side of one slice of bread.
                            Top with lettuce and tomato slices, then season lightly with salt and pepper.
                            Place bacon slices on top.
                        </li>
                        <li><h3>Prepare Second and Third Slice:</h3>
                            Spread mayonnaise on both sides of a second piece of bread and place on top of bacon.
                            Top with cheddar, turkey, and ham. Spread mayonnaise on one side of the last piece of
                            bread and place on top of sandwich, mayo side down.
                        </li>
                        <li>
                            <h3>Serve:</h3>
                            Secure with toothpicks and cut into 4 triangles.
                        </li>

                    </ol>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleCallScreenButton}><strong>Call Screen</strong></button>
                </div>
            </div>
        </>
    );
}