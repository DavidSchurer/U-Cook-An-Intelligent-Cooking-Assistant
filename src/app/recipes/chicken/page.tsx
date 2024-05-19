'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles
import { useInput } from 'compo/global/context/InputContext';

export default function Chicken() {
    const router = useRouter();

    const { addVoiceRoute, removeVoiceRoute } = useInput();

    // Sample data for chicken recipes
    const chickenRecipes = [
        { id: 'lemon-herb-chicken', name: 'Grilled Lemon Herb Chicken', description: 'Juicy chicken marinated in zesty lemon and herbs, grilled to perfection for a fresh, flavorful dish.' },
        { id: 'garlic-parmesan-chicken', name: 'Creamy Garlic Parmesan Chicken', description: 'Pan-seared chicken in a creamy garlic Parmesan sauce, rich and indulgent, perfect with pasta or veggies.' },
        { id: 'honey-mustard-chicken', name: 'Honey Mustard Baked Chicken', description: 'Tender chicken thighs glazed in sweet honey mustard, baked to sticky perfection, a simple crowd-pleaser.' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/chicken/${id}`);
    }

    useEffect(() => {
        addVoiceRoute('lemon herb chicken', 'Okay, I have selected Grilled Lemon Herb Chicken.', () => handleSelectRecipe('lemon-herb-chicken'), {
            visual: 'Select Grilled Lemon Herb Chicken'
        });
        addVoiceRoute('creamy garlic parmesan chicken', 'Okay, I have selected Creamy Garlic Parmesan Chicken.', () => handleSelectRecipe('garlic-parmesan-chicken'), {
            visual: 'Select Creamy Garlic Parmesan Chicken'
        });
        addVoiceRoute('honey mustard baked chicken', 'Okay, I have selected Honey Mustard Baked Chicken.', () => handleSelectRecipe('honey-mustard-chicken'), {
            visual: 'Select Honey Mustard Baked Chicken'
        });

        return () => {
            removeVoiceRoute('lemon herb chicken');
            removeVoiceRoute('creamy garlic parmesan chicken');
            removeVoiceRoute('honey mustard baked chicken');
        }
    }, []);

    return (
    <>
       <main className={styles.main}>
        <div className={styles.UCookHomePage}>
            <h1>U-Cook: Virtual Cooking Assistant</h1>
            
        </div>
        </main>
        <div className={styles.ChickenPage}>
            <h1>Chicken Recipes</h1>
            <ul>
                {chickenRecipes.map((recipe) => (
                    <li key={recipe.id} className={styles.recipeItem}>
                        <button onClick={() => handleSelectRecipe(recipe.id)}>
                            <h2>{recipe.name}</h2>
                            <p>{recipe.description}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}