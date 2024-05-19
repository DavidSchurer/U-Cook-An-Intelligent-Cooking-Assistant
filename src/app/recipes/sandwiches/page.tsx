'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles
import { useInput } from 'compo/global/context/InputContext';

export default function Sandwiches() {
    const router = useRouter();

    const { addVoiceRoute, removeVoiceRoute } = useInput();

    // Sample data for sandwich recipes
    const sandwichRecipes = [
        { id: 'blt-sandwich', name: 'BLT Sandwich', description: 'This sandwich combines crispy bacon, fresh lettuce, and tomatoes with mayo and seasoning.' },
        { id: 'club-sandwich', name: 'Club Sandwich', description: 'This sandwich comes with layers of turkey, bacon, lettuce, tomato, and mayonnaise between toasted bread.' },
        { id: 'caprese-sandwich', name: 'Caprese Sandwich', description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze or olive oil' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/sandwiches/${id}`);
    }

    useEffect(() => {
        addVoiceRoute('blt sandwich', 'Okay, I have selected BLT Sandwich.', () => handleSelectRecipe('blt-sandwich'), {
            visual: 'Select BLT Sandwich'
        });
        addVoiceRoute('club sandwich', 'Okay, I have selected Club Sandwich.', () => handleSelectRecipe('club-sandwich'), {
            visual: 'Select Club Sandwich'
        });
        addVoiceRoute('caprese sandwich', 'Okay, I have selected Caprese Sandwich.', () => handleSelectRecipe('caprese-sandwich'), {
            visual: 'Select Caprese Sandwich'
        });

        return () => {
            removeVoiceRoute('blt sandwich');
            removeVoiceRoute('club sandwich');
            removeVoiceRoute('caprese sandwich');
        }
    }, []);

    return (
    <>
       <main className={styles.main}>
        <div className={styles.UCookHomePage}>
            <h1>U-Cook: Virtual Cooking Assistant</h1>
            
        </div>
        </main>
        <div className={styles.SandwichesPage}>
            <h1>Sandwich Recipes</h1>
            <ul>
                {sandwichRecipes.map((recipe) => (
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