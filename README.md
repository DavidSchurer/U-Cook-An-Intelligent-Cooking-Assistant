# U-Cook: An Intelligent Cooking Assistant

## Overview
This application is a virtual cooking assistant that allows you to learn how to cook with friends and family while 
using voice recognition to effortlessly browse through different recipes and cookbooks!

## Live Website
[https://u-cook.org/](https://u-cook.org/)

## Features
- Integration with the react-speech-recognition React hook to allow users to fully navigate through the website using just their voice.
  
- A contacts page where a user can select one or many contacts to start a group cooking call with.
  
- An interactive call screen page that displays all of the users in a video meeting-like setting, where each user can collaborate and cook together on a recipe.
  
- Various recipe categories displayed on a recipe categories page, each accompanied with full recipes that include ingredients and instructions.
  
- The ability to search recipes, select them, and add them to the call screen.

## Technologies Used
- Next.js
- TypeScript
- SCSS
- react-speech-recognition

## Instructions
Instructions on how to use the U-Cook: An Intelligent Cooking Assistant application:

1) In order to run our U-Cook prototype, the user must first access the website link at https://u-cook.org/
     * The user must also have a microphone installed on their computer along with a supported browser that
       supports continuous voice recognition. Note that browsers without continuous voice recognition would
       not have the ability to constantly listen for the wakeup command.
       
2) Manually click on the voice recognition button in the bottom right corner of the screen to
toggle the voice recognition ON, the red stripe across the microphone icon will go away
once the voice recognition is toggled on.

3) Try speaking to ensure the microphone is detecting their input device, if the microphone
icon starts flashing green it means that the user’s audio is being picked up.

4) To use the voice assistant, say “Hi Cook” or “Hey Cook” and then your request. (For
example on the starting welcome page, the user can say “Hi Cook, Select Continue” to
select the continue button and navigate to the next page).

5) To list all of the available commands on the current page, say “Hi Cook, Help” to the
voice assistant.
