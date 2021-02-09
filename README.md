# Before Started

## Components
1. Smaller elements can be created to be a component, while bigger ones would be views.
## Views
1. Bigger elements, such as half of a whole page, or a whole page.
2. You can find all complete pages in `MainContentPage.js` with router, including three main different contents: `Labeling.js`, `ParagraphCard.js`, `TitleCards.js`
3. `TitleCards.js` contains all article titles of each label task, each card should contain how many paragraphs the user has finished on the bottom right corner.
4. `ParagraphCard.js` contains all sections of a article, if user have labeled the section, opacity of the specific card would be lower.
5. `Labeling.js` contains label functions, users can label articles, check all question history, add new question pairs, go to the label area of next paragraph here. Alerts should be shown when user hasn't finished creating a new question.
## CSS
1. `_global.css` contains some commonly used style, you can follow the rules to create your owns. Be careful to create duplicate ones.
2. Note that each view or component js would have a css file of the same name, but classnames are declared global, so be careful to create duplicate classnames or would cause disastrous consequences.
3. If css files grows to be too many, we can discuss and consider to create a css folder for them.
4. I created some components and icons using [material-ui](https://material-ui.com), you can find components and elements from this reference. Don't be afraid, the usage of material-ui is similar to bootstrap.
## Others
1. `ValidationPage.js` and `ValidationPage.css` in `views` folder is only for designing router and testing for the correctness of routers, so they can be removed when ValidationPages are finished within `Labeling.js`, `ParagraphCards.js`, and `TitleCards.js`.
2. `EntryMenu.js` is mostly copied from [material-UI](https://material-ui.com), coding style haven't been modified my own style. If needed, please DO NOT follow coding style of this file.

# Run This repo
1. Please make sure that you have node.js (version should be higher than 14.8.0) on your computer.
2. run simply with the following command in your terminal:
  1. `npm install`
  2. `npm start`

# Contents can be ignored temporarily after this line

# Getting Started with Create React App (Default)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
