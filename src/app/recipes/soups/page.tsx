'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function Soups() {
    const router = useRouter();

    // Sample data for pasta recipes
    const soupRecipes = [
        { id: '1', name: 'Tomato Basil Soup', description: 'This soup blends ripe tomatoes with aromatic basil and other seasonings and is served with a garnish of fresh basil.' },
        { id: '2', name: 'Chicken Noodle Soup', description: 'Chicken noodle soup features tender chicken, hearty vegetables, and noodles simmered in broth.' },
        { id: '3', name: 'Minestrone Soup', description: 'An italian favorite, minestrone soup comes packed with vegetables, beans, pasta, and herbs simmered in tomato-based broth.' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/soups/${id}`);
    }

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