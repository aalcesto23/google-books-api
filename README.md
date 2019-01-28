# Using Google Books API
This application uses the Google Books API to search books based on the user's input and provides the user with useful information about the book, along with providing a link to learn more.
###Tech/framework used

*Language:*
- JavaScript ES6

*Frameworks:*
- React.js

*Libraries:*
- Materialize

### Features and Use
The user can enter in information into the input field and click search. Once the user clicks search, the application will utilize the Google Books API to find books related to the users input. If the user's input returns no results, the application will state that in the area below the input field. If the input causes an error, the application will also inform the user that this occured.

If results return from the API, a list of 40 books will appear below the input field within a card. Each card will contain the following information.

- title of the book
- publishing company
- an image of the book
- description of the book
- a link to learn more about the book
###Tests
This application uses Jest and enzyme for testing. You can run the test suite using the following command in the terminal within the project directory:

```
yarn test
```