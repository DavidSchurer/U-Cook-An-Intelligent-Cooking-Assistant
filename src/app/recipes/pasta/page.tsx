'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles
import { useInput } from 'compo/global/context/InputContext';

export default function Pasta() {
    const router = useRouter();

    const { addVoiceRoute, removeVoiceRoute } = useInput();

    // Sample data for pasta recipes
    const pastaRecipes = [
        { id: 'Carbonara', name: 'Spaghetti Carbonara', description: 'Creamy Italian classic with eggs, cheese, and bacon.' },
        { id: 'Arrabbiata', name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic, tomatoes, and red chili peppers.' },
        { id: 'Alfredo', name: 'Fettuccine Alfredo', description: 'A rich sauce of butter, cream, and Parmesan cheese.' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/pasta/${id}`);
    }

    useEffect(() => {
        addVoiceRoute('spaghetti carbonara', 'Okay, I have selected Spaghetti Carbonara.', () => handleSelectRecipe('Carbonara'), {
            visual: 'Select Spaghetti Carbonara'
        });
        addVoiceRoute('penne arrabbiata', 'Okay, I have selected Penne Arrabbiata.', () => handleSelectRecipe('Arrabbiata'), {
            visual: 'Select Penne Arrabbiata'
        });
        addVoiceRoute('fettuccine alfredo', 'Okay, I have selected Fettuccine Alfredo.', () => handleSelectRecipe('Alfredo'), {
            visual: 'Select Fettuccine Alfredo'
        });

        return () => {
            removeVoiceRoute('spaghetti carbonara');
            removeVoiceRoute('penne arrabbiata');
            removeVoiceRoute('fettuccine alfredo');
        }
    }, []);

    return (
    <>
       <main className={styles.main}>
        </main>
        <div className={styles.PastaPage}>
            <h1>Pasta Recipes</h1>
            <ul>
                {pastaRecipes.map((recipe) => (
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