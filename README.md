# ssr-app-consumes-markdowns-boilerplate
This is a Boilerplate app for a blog webpage. It uses Server Side Rendering with Webpack 4 and consume Markdown files for populate post pages.

As normal run npm install for install the dependencies. And try your own configuration or play with the one given.

Create a SSR app that consumes Markdown files to create a post block.

- Create dynamically routes for MK files
- Set webpack SSR
- Consume data from MK files
- Get list of MK files

## Summary

This is a Boilerplate app for a blog webpage. It uses Server Side Rendering with Webpack 4 and consume Markdown files for populate post pages.

---

Hello There! 

I want to share my repository of a Boilerplate blog application. This application makes the rendering on the server side when the user request the webpage. We all know this as **Server-Side-Rendering**. It includes two examples: one that returns an static web page (only the html) and another one that includes a JS file that will make more dynamic the webpage. This JS file is bundled and transpiled by Webpack and Babel. Redux is already set, so we can interact with it in case you want to add more functionalities to your application. Finally, I mentioned that is a Blog app, so it shows you how to consume markdown files to be rendered as HTML files.

A personal tip is that use Private Window, and be carefull with the cache from the browser

## Overview

Initial steps for both scenarios

1. The app is running (Node.js + Express)
2. When Node.js starts, it reads all the MarkDown files and save the content in an object.
3. The user makes the request

Then, the server process the request. Here are two options for SSR.

Generate static files

1. Renders the component
2. If need it, it injects HTML content (markdown content transformed)
3. Set the full HTML template
4. Send final HTML file

Generate static files with React+Redux functionality

1. Create the Redux Store with any initial data
2. Add the Provider component with the Store created to the app component
3. Render this new component
4. Start setting the full HTML template
5. Save the state from the Store in the window variable
6. Add in the Script tag, the JS file with our application logic (React app)
7. Apply the rest of the elements to complete the HTML template
8. Send final HTML file
