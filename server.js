import express from 'express';
import template from './src/ssr/template';
import ssr from './src/ssr/ssr';
import ssrComponent from './src/ssr/ssrComponent';
import path from 'path';
import getAllPages from './lib/getAllPages';

import remark from 'remark';
import html from 'remark-html';

const app = express();

const listPages = getAllPages();

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

app.get('/:postTitle', async (req, res) => {
  const titlePost = req.params.postTitle;
  const contentHtml = await remark()
    .use(html)
    .process(listPages.fullPages[titlePost].content);

  const { appContent, preloadedState } = ssrComponent(
    preloadedState,
    contentHtml
  );
  // create the final HTML with our content
  const finalHtml = template('Blog App', preloadedState, appContent);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(finalHtml);
});

module.exports = app;
