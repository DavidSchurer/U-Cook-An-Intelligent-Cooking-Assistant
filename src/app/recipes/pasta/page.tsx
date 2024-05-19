'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function Pasta() {
    const router = useRouter();

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

    return (
    <>
       <main className={styles.main}>
        <div className={styles.UCookHomePage}>
            <h1>U-Cook: Virtual Cooking Assistant</h1>
            
        </div>
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