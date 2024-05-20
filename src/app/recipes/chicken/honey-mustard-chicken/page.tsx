'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function HoneyMustardChicken() {
    const router = useRouter();

    // Function to handle navigation to the detailed recipe page
    const handleSelectRecipe = (id: string) => {
        router.push(`/recipes/pasta/${id}`);
    }

    return (
        <>
            <main className={styles.main}>
            </main>
            <div className={styles.ChickenPage}>
                <h1>Honey Mustard Chicken</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>8 bone-in chicken thighs</li>
                        <li>¼ cup honey</li>
                        <li>¼ cup Dijon mustard</li>
                        <li>2 garlic cloves, minced</li>
                        <li>1 tablespoon extra-virgin olive oil</li>
                        <li>1½ teaspoons finely chopped fresh rosemary</li>
                        <li>1½ teaspoons finely chopped fresh thyme</li>
                        <li>½ teaspoon kosher salt</li>
                        <li>¼ teaspoon freshly ground black pepper</li>
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Preheat the oven:</h3>
                            Preheat the oven to 350°F (177°C). Place the chicken in a baking dish and pat dry with a paper towel.
                        </li>
                        <li>
                            <h3>Prepare the honey mustard mixture:</h3>
                            In a small bowl, stir together the honey, mustard, garlic, oil, rosemary, thyme, salt, and pepper.
                        </li>
                        <li>
                            <h3>Apply the mixture to the chicken:</h3>
                            Brush or spoon the honey mustard mixture liberally on top of the chicken.
                        </li>
                        <li>
                            <h3>Bake the chicken:</h3>
                            Bake for 40 to 45 minutes or until the chicken is fully cooked and registers 175°F (80°C). Turn on the top oven broiler in the last 2 to 3 minutes to crisp up the skin.
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}