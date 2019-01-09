# Handprinter

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
-  [Errors](#-errors)
-  [Scripts](#-scripts)

## ❌ Errors

#### How to add new errors

1. First of all you must add new error on backend (see instructions in backend README).
2. Then you must add translations of new error in locale files (path to files: `src/locales/<locale>.js`). Add new error translations near rest error translations (at the top of the file).

Example: `'app.errors.0': 'Incorrect password'`

#### How to catch & handle error from the backend

To send request to the API we using `fetchHelper` that places in `src/api/index.js` file.
This helper send request and handle response. If backend return error in the response - `fetchHelper` will 
throw an error, in other case it will return data.

1.  First of all need inport API (import api requests `import api from 'src/api'`).
2.  Put api request into `try/catch`
3.  Handle response and catch error in `catch` block.
4.  Decode error using `decodeError` helper (getting error by code and then get error translation)
5.  Handle error.

Simple example of catching error:

It's getting user by invitation code.

```
  try {
    const { user } = await api.getUser({ invitationCode }) // fetching user
    ...handle success getting user
  } catch (error) { // catch error from backend
    // getting error by code and then get error translation
    formatMessage({ id: decodeError(error) }))
    ...handle error
  }
```


## 📜 Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.