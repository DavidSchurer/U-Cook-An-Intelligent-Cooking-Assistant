'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function TomatoBasilSoup() {
    const router = useRouter();
    
    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/pasta/${id}`);
    }

    return (
        <>
            <main className={styles.main}>
            </main>
            <div className={styles.SoupsPage}>
                <h1>Tomato Basil Soup</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>4 tomatoes - peeled, seeded and diced</li>
                        <li>4 cups tomato juice</li>
                        <li>14 leaves fresh basil</li>
                        <li>1 cup heavy whipping cream</li>
                        <li>½ cup butter</li>
                        <li>Salt and pepper to taste</li>
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Gather all ingredients.</h3>
                            Ensure you have all the necessary ingredients ready before you start.
                        </li>
                        <li>
                            <h3>Simmer the tomatoes and juice:</h3>
                            <ul>
                                <li>Place the diced tomatoes and tomato juice in a stockpot over medium heat.</li>
                                <li>Bring to a simmer and cook until the tomatoes have softened, about 30 minutes.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Add basil leaves:</h3>
                            <ul>
                                <li>Remove the pot from heat.</li>
                                <li>Add the fresh basil leaves to the pot.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Purée the soup:</h3>
                            Use an immersion blender to purée the soup until it is smooth.
                        </li>
                        <li>
                            <h3>Stir in cream and butter:</h3>
                            <ul>
                                <li>Stir in the heavy whipping cream and butter.</li>
                                <li>Cook and stir over medium heat until the butter is melted, about 5 minutes. Do not let the soup boil.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Season and serve:</h3>
                            <ul>
                                <li>Season with salt and pepper to taste.</li>
                                <li>Serve hot and enjoy!</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}