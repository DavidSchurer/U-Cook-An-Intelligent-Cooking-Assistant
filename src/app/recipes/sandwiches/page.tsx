'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function Sandwiches() {
    const router = useRouter();

    // Sample data for pasta recipes
    const sandwichRecipes = [
        { id: '1', name: 'BLT Sandwich', description: 'This sandwich combines crispy bacon, fresh lettuce, and tomatoes with mayo and seasoning.' },
        { id: '2', name: 'Club Sandwich', description: 'This sandwich comes with layers of turkey, bacon, lettuce, tomato, and mayonnaise between toasted bread.' },
        { id: '3', name: 'Caprese Sandwich', description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze or olive oil' }
    ];

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/sandwiches/${id}`);
    }

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