'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';  // Ensure you have the corresponding CSS module for styles

export default function BLT() {
    const router = useRouter();

    return (
        <>
            <main className={styles.main}>
                <div className={styles.UCookHomePage}>
                    <h1>U-Cook: Virtual Cooking Assistant</h1>

                </div>
            </main>
            <div className={styles.PastaPage}>
                <h1>BLT Sandwich</h1>
                <div className={styles.Ingredients}>
                    <h2>Ingredients:</h2>
                    <ul>
                        <li>3 slices bacon (regular, not thick cut)</li>
                        <li>1 small tomato</li>
                        <li>kosher salt</li>
                        <li>Freshly ground black pepper</li>
                        <li>2 slices hearty white sandwich bread</li>
                        <li>2 tablespoons mayonnaise</li>
                        <li>1 romaine lettuce leaf</li>
                    </ul>
                </div>
                <div className = {styles.equipment}>
                    <h2>Equipments</h2>
                    <ul>
                    <li>Toaster</li>
                    <li>Serrated knife</li>
                    <li>Cutting board</li>
                    <li>Measuring spoon</li>
                    <li>Butter knife</li>
                    <li>Paper towels</li>
                    </ul>
                </div>
                <div className={styles.instructions}>
                    <h2>Instructions:</h2>
                    <ol>
                        <li>
                            <h3>Cook the bacon:</h3>
                             Cook 3 slices bacon, using one of these methods: stove, oven, or microwave. 
                             (If you’re making several BLTs, use the oven to cook the bacon, as it’s the easiest
                              way to cook a lot of bacon). Make sure every slice is evenly crispy with no areas of 
                              unrendered fat. No flabbiness allowed! Transfer to a paper towel to drain.
                        </li>
                        <li>
                            <h3>Slice and season the tomato:</h3>
                            Slice 1 small tomato crosswise with a serrated knife into 1/3-inch thick slices. 
                            Place the slices in a single layer on a double layer of paper towels 
                            (the towels will absorb some of the moisture, preventing a soggy sandwich). 
                            Season lightly with kosher salt and some black pepper. Let sit while you toast the bread.
                        </li>
                        <li>
                            <h3>Toast the bread:</h3>
                            Toast 2 slices white sandwich bread until light golden brown
                        </li>
                        <li>
                            <h3>Build the BLT:</h3>
                            Spread 1 tablespoon mayonnaise on each slice of bread. 
                            Place 1 romaine lettuce leaf on one slice of bread, 
                            folding it as needed to fit neatly on the bread. 
                            Top with the seasoned tomato slices in a single layer (no need to pat the top dry),
                             cutting them in half as needed to fit in a single layer. 
                             Tear the 3 bacon slices in half and place on top of the tomatoes in 2 layers. 
                             Close the sandwich with the second slice of bread mayonnaise-side down.
                        </li>
                        <li>
                            <h3>Cut the BLT in half:</h3>
                            Gently press down on the top of the sandwich to compact slightly. 
                            Cut in half with the serrated knife and serve immediately.
                        </li>

                    </ol>
                </div>
            </div>
        </>
    );
}