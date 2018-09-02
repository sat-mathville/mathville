# Mathville

Mathville is a fun 2D adventure game that makes users learn to love math again. As a user, when you enter Mathville you are presented with the task of saving a villager who was kidnapped days before. However, you find out that you cannot rescue them until you have eight items that will aid your journey to save them. 

In order to attain these items, you must assist villagers with various tasks that involve math. Each villager provides their own category of math for you to solve such as probability, geometry, or arithmetic. Once you answer all the questions correctly for that character, you will be given an item. As you dodge monsters, explore shops, and talk to villagers you will then be directed to the cave, where it is rumored the kidnapped person is trapped. 

## Tech Stack
We use a Javascript game engine, **Phaser**, to track which part of the game the player is in and transfer the player from one part of the game to the next. In Phaser, game state objects represent different states in the game, and a global game object manages the transitions between them.

Inside each Phaser game state, we define the rules that govern the interactions between different things inside the game as well as the game's responses to user input from the keyboard. 

We use Phaser because it leverages HTML5 and WebGL, making it an ideal tool for a browser-based game. Phaser also has a strong user community that provides technical support.

When there is a need to persist a change in the game, the change is saved in a database. From the Phaser game state, we dispatch a thunk, and **Axios** makes a request to the API route on our **Express** server. In the backend, **Sequelize** creates new instances and associations as needed. We use **PostgreSQL**, a relational database, to store persisting data, because our data has many-to-many relations. 

Once this request is completed, **Redux** updates the store to reflect this change and Phaser renders any changes inside the game. 
Since we save the progress of the game in the backend, each user must log in to play the game. We handle login and sign up using **React**. We use Redux to manage the global state of the app so that React and Phaser can both access the data and subscribe to their changes.

Finally, to create the complex visual elements in the game, we use **Tiled** to compose large tilemaps from small images. Phaser has an animation feature that generates moving images from still frames in sprite sheets.

## Deployed Version
Please checkout our game at https://mathville.herokuapp.com.

