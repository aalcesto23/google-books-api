# Using Google Books API
This application uses the Google Books API to search books based on the user's input and provides the user with useful information about the book, along with providing a link to learn more.

### Tech/framework used
*Language:*
- JavaScript ES6

*Frameworks:*
- React.js

*Libraries:*
- Materialize

### Initial Set-up
I use yarn commands to run this application (specifically version ```1.3.2```, but newer versions will work as well), so if you need to install or update your yarn you can do so by following the steps listed below
*These instructions are under the assumption that you are using Homebrew for package management, for further info on Homebrew follow the [link](https://brew.sh/)

Installing Yarn:
- open up your terminal and type ```brew install yarn```
- this will also install Node.js if you don't have it
- you can then type ```yarn -v``` to check your version once downloaded

Updating Yarn:
- you can update your yarn by entering ```brew upgrade yarn```

As for node, I am currently running the application on version ```8.12.0```. You won't run into any issues for newer version, but if you are trying to run it in older versions I suggest updating your node. You can do this by following the steps below

- first check your node version by typing ```node -v```
- if it is lower than ```v8.12.0``` enter in ```brew upgrade node```


### Features and Use
The user can enter in information into the input field and click search. Once the user clicks search, the application will utilize the Google Books API to find books related to the users input. If the user's input returns no results, the application will state that in the area below the input field. If the input causes an error, the application will also inform the user that this occured.

If results return from the API, a list of 40 books will appear below the input field within a card. Each card will contain the following information.

- title of the book
- publishing company
- an image of the book
- description of the book
- a link to learn more about the book

You can run this application locally by following the steps listed below

Steps:
- clone the project
- navigate to the project directory
- obtain a Google Books API key and create an env.local file within the project to hold the key
- run ```yarn start``` in your terminal while within the project directory

### Tests
This application uses Jest and enzyme for testing. You can run the test suite using the following command in the terminal within the project directory:

```
yarn test
```

### Heroku Hosting Link
(https://aalcesto-google-books-api.herokuapp.com/)