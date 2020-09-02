// create a full HTML file and inject it our preload app content
// adding our app script to keep the logic from our React app

const template = (title, appContent = '') => {
  let htmlFile = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <link rel="stylesheet" href="assets/style.css">
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      ${appContent}
                   </div>
                </div>                  
              </body>
              `;

  return htmlFile;
};

export default template;
