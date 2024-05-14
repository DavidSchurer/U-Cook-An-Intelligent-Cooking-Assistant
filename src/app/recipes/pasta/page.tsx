'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function Pasta() {
    const router = useRouter();

    // Sample data for pasta recipes
    const pastaRecipes = [
        { id: '1', name: 'Spaghetti Carbonara', description: 'Creamy Italian classic with eggs, cheese, and bacon.' },
        { id: '2', name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with garlic, tomatoes, and red chili peppers.' },
        { id: '3', name: 'Fettuccine Alfredo', description: 'A rich sauce of butter, cream, and Parmesan cheese.' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/pasta/${id}`);
    }

    return (
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
    );
}