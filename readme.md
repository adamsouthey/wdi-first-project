![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Project 1: Memarray Game

### Overview

Memarray Game is a card game in which all of the cards are laid face down on the screen. A user must then click on a card to reveal their value and find the matching pairs before the time expires.

[**Heroku**](https://memarray-game.herokuapp.com/)

[**GitHub Repository**](https://github.com/adamsouthey/wdi-first-project)   

---

### Technologies:

For this project I have used the following technologies:

* HTML5
* CSS
* Javascript (ECMAScript 6)
* jQuery
* Git
* Github
* Heroku

---
### Wireframes

My original wireframes are similar to how the project actually turned out:  

Wireframes:

<img width="695" alt="screenshot 2018-03-20 16 04 30" src="https://user-images.githubusercontent.com/32818032/37666828-69328494-2c58-11e8-8e19-6b590c34f118.png">

---

### Trello

I used Trello to make a thorough plan of all the tasks I had to do. It allowed me to keep track and to keep on top of what I needed to do. The screenshot below was taken early on in the project.

Trello Screenshot:
<img width="842" alt="screenshot 2018-03-20 15 55 59" src="https://user-images.githubusercontent.com/32818032/37666324-374bcd4c-2c57-11e8-9186-733f84aace58.png">

---

### My Project screenshots

Splash Page:
<img width="1370" alt="1" src="https://user-images.githubusercontent.com/32818032/38094277-44f5334c-3365-11e8-9402-2b74e997e0c6.png">

Game Page:
<img width="1368" alt="2" src="https://user-images.githubusercontent.com/32818032/38094302-56fb2628-3365-11e8-8b97-ab74bf28afc8.png">

---


# Challenges
Using setTimeout instead of clearInterval caused time penalties to carry over and stack following a level restart.

Using jQuery's data function to retrieve the data attribute of an element. Using jQuery .data() for dynamically setting data attributes. Used the DOM instead or jQuery .attr()

I initially tried to set the level of difficulty to multiple buttons via multiple event listeners. This was inefficient and decided to create an object containing key value pairs relating to difficulty.

# Wins
- Creating different levels of difficulty for the application
- The functionality for a user to restart a their current level if they fail to find the pairs in time


# Improvements
The UI could be more user friendly.

I would like to include more levels of difficulty perhaps following an incorrect guess have the two card elements switch places and flip back over.

Drier code with more comments to help other developers understand my thought process.

I would like to include a level up button when the user completes a level, rather than having to return to the homepage and select the next level.









