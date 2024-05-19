'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function ChickenNoodleSoup() {
    const router = useRouter();

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/pasta/${id}`);
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.UCookHomePage}>
                    <h1>U-Cook: Virtual Cooking Assistant</h1>

                </div>
            </main>
            <div className={styles.SoupsPage}>
                <h1>Chicken Noodle Soup</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>1 pound skinless, boneless chicken thighs (4 or 5 thighs)</li>
                        <li>5 ounces egg noodles (or pasta of choice)</li>
                        <li>2 tablespoons butter, chicken fat or olive oil</li>
                        <li>1 large onion, chopped</li>
                        <li>2 large carrots, chopped</li>
                        <li>2 stalks celery, chopped (optional)</li>
                        <li>Heaped tablespoon minced garlic (4 cloves)</li>
                        <li>2 bay leaves</li>
                        <li>3 sprigs fresh thyme or use 1/2 teaspoon dried thyme</li>
                        <li>8 cups chicken stock or broth, low sodium or use homemade stock</li>
                        <li>Salt and pepper, to taste</li>
                        <li>1/4 cup fresh parsley, finely chopped</li>
                        <li>Water or more stock, as needed</li>
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Melt the butter:</h3>
                            Melt butter in a large pot or Dutch oven over medium heat. Add the onions, carrots, and celery. Cook, stirring every few minutes until the vegetables begin to soften; 5 to 6 minutes.
                        </li>
                        <li>
                            <h3>Add garlic and herbs:</h3>
                            Stir in the garlic, bay leaves, and thyme. Cook, while stirring the garlic around the pan, for about 1 minute.
                        </li>
                        <li>
                            <h3>Simmer the soup:</h3>
                            Pour in the chicken stock and bring to a low simmer. Taste the soup then adjust the seasoning with salt and pepper. Depending on the stock used, you might need to add 1 or more teaspoons of salt.
                        </li>
                        <li>
                            <h3>Cook the chicken:</h3>
                            Submerge the chicken thighs into the soup so that the broth covers them. Bring the soup back to a low simmer then partially cover the pot with a lid and cook, stirring a few times until the chicken thighs are cooked through; about 20 minutes.
                        </li>
                        <li>
                            <h3>Adjust the broth:</h3>
                            If, during this time, the broth seems low, add a splash more stock or a bit of water. Turn the heat to medium-low.
                        </li>
                        <li>
                            <h3>Cook the noodles:</h3>
                            Transfer the cooked chicken to a plate. Stir the noodles into the soup and cook until done, 6 to 10 minutes depending on the type of noodles used.
                        </li>
                        <li>
                            <h3>Shred the chicken:</h3>
                            While the noodles cook, shred the chicken into strips or dice into cubes. Slide the chicken back into the pot and then taste the soup once more for seasoning. Adjust with more salt and pepper, as needed. Stir in the parsley and serve.
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}