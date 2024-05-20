'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function GarlicParmesanChicken() {
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
                <h1>Garlic Parmesan Chicken</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>2 chicken breasts, cut in half lengthwise</li>
                        <li>Salt & pepper to taste</li>
                        <li>1/2 teaspoon garlic powder</li>
                        <li>1 tablespoon olive oil</li>
                        <li>1 tablespoon butter</li>
                        <li>1 tablespoon flour</li>
                        <li>3 cloves garlic, minced</li>
                        <li>1/2 cup chicken broth or dry white wine</li>
                        <li>1 cup heavy/whipping cream</li>
                        <li>1/2 cup freshly grated Parmesan cheese</li>
                        <li>1 tablespoon fresh parsley, chopped</li>

                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Prepare the chicken:</h3>
                            Cut the chicken in half lengthwise so you have 4 thinner pieces. Season them generously on both sides with salt, pepper, and garlic powder.
                        </li>
                        <li>
                            <h3>Cook the chicken:</h3>
                            Add olive oil and butter to a skillet over medium-high heat, and let the pan heat up for a few minutes. Cook the chicken for about 5-6 minutes per side or until it&apos;s nicely seared and cooked through. Transfer chicken to a plate and loosely tent it with foil to keep it warm.
                        </li>
                        <li>
                            <h3>Make the sauce:</h3>
                            Turn the heat back on to medium-high and sprinkle in the flour and garlic to the skillet. Let it cook for about a minute, stirring often. Pour in the chicken broth and whisk until the flour has dissolved and the liquid has reduced by half.
                        </li>
                        <li>
                            <h3>Finish the sauce:</h3>
                            Stir in the cream and let it bubble gently for a few minutes until it&apos;s thickened to your desired consistency. Take the skillet off the heat and stir in the Parmesan until it has melted into the sauce.
                        </li>
                        <li>
                            <h3>Combine and serve:</h3>
                            Add the chicken back to the skillet (along with any juices from the plate) and spoon some sauce over top. Season with extra salt and pepper if needed and sprinkle with parsley. Serve immediately.
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}