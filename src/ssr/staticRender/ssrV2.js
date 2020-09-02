import React from 'react';
import { renderToString } from 'react-dom/server';

import remark from 'remark';
import html from 'remark-html';
import template from './template';

// render a component and inserts content to it
// returns an HTML file
const ssr = async ({ content = '', Component, htmlContent = '' } = {}) => {
  // convert the mk content into html syntax
  const contentHtml = await remark().use(html).process(htmlContent);
  let appContent = renderToString(
    <Component content={content} htmlContent={contentHtml} />
  );

  // create a full HTML file with app content
  const fullHtml = template('Post', appContent);

  return fullHtml;
};

export default ssr;
