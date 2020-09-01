import express from 'express';
import template from './src/ssr/template';
import ssr from './src/ssr/ssr';
import path from 'path';
import getAllPages from './lib/getAllPages';

const app = express();

const listPages = getAllPages();
console.log(listPages);

// here we are going to add the markdown files data
let initialState = {
  //apps: data,
  listPages,
};

// this allow the html file sent to the client to get files
// like stylesheets or js
app.use(express.static(path.join(__dirname, '/assets')));

// route - handle the render of the page and send the html file rendered
app.get('/', (req, res) => {
  // pre-load content of our application
  const { appContent, preloadedState } = ssr(initialState);

  // create the final HTML with our content
  const finalHtml = template('Blog App', preloadedState, appContent);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(finalHtml);
});

module.exports = app;
