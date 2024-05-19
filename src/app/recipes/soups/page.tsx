'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles
import { useInput } from 'compo/global/context/InputContext';

export default function Soups() {
    const router = useRouter();

    const { addVoiceRoute, removeVoiceRoute } = useInput();

    // Sample data for soup recipes
    const soupRecipes = [
        { id: 'tomato-basil-soup', name: 'Tomato Basil Soup', description: 'This soup blends ripe tomatoes with aromatic basil and other seasonings and is served with a garnish of fresh basil.' },
        { id: 'chicken-noodle-soup', name: 'Chicken Noodle Soup', description: 'Chicken noodle soup features tender chicken, hearty vegetables, and noodles simmered in broth.' },
        { id: 'minestrone-soup', name: 'Minestrone Soup', description: 'An italian favorite, minestrone soup comes packed with vegetables, beans, pasta, and herbs simmered in tomato-based broth.' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/soups/${id}`);
    }

    useEffect(() => {
        addVoiceRoute('tomato basil soup', 'Okay, I have selected Tomato Basil Soup.', () => handleSelectRecipe('tomato-basil-soup'), {
            visual: 'Select Tomato Basil Soup'
        });
        addVoiceRoute('chicken noodle soup', 'Okay, I have selected Chicken Noodle Soup.', () => handleSelectRecipe('chicken-noodle-soup'), {
            visual: 'Select Chicken Noodle Soup'
        });
        addVoiceRoute('minestrone soup', 'Okay, I have selected Minestrone Soup.', () => handleSelectRecipe('minestrone-soup'), {
            visual: 'Select Minestrone Soup'
        });

        return () => {
            removeVoiceRoute('tomato basil soup');
            removeVoiceRoute('chicken noodle soup');
            removeVoiceRoute('minestrone soup');
        }
    }, []);

    return (
    <>
       <main className={styles.main}>
        <div className={styles.UCookHomePage}>
            <h1>U-Cook: Virtual Cooking Assistant</h1>
            
        </div>
        </main>
        <div className={styles.SoupsPage}>
            <h1>Soup Recipes</h1>
            <ul>
                {soupRecipes.map((recipe) => (
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