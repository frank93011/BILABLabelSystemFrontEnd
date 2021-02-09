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

