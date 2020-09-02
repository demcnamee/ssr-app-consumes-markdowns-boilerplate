import fs from 'fs';
import path from 'path';

//const reducerFilterPages = ;

// read the elements from target directory
function readFilesProcess(startPath, targetDirectory) {
  // get full path of the directory
  const layerPath = path.join(startPath, targetDirectory);
  // read all files
  const layerFiles = fs.readdirSync(layerPath);

  const accumulator = {
    pageTitles: [],
    fullPages: {},
    directories: [],
  };

  // separate the files in pages and directories
  return layerFiles.reduce((accumulator, currentVal) => {
    // avoid adding next.js files that are not pages
    if (currentVal.endsWith('.md')) {
      // read the file
      const fileContent = fs.readFileSync(layerPath + `/${currentVal}`, 'utf8');
      const newPage = {
        title: currentVal,
        content: fileContent,
        //content: 'content',
      };
      accumulator.fullPages[currentVal] = newPage;
      accumulator.pageTitles.push(currentVal);
    } else {
      accumulator.directories.push(currentVal);
    }
    return accumulator;
  }, accumulator);
}

export default function getAllPages() {
  let pagesLayers = {
    pageTitles: [],
    fullPages: {},
  };

  // separate directories from files in the content directory (initial)
  const dividedElements = readFilesProcess(process.cwd(), 'content');

  // save the root pages
  pagesLayers.pageTitles = dividedElements.pageTitles;
  pagesLayers.fullPages = dividedElements.fullPages;

  // start reading deeper directories
  dividedElements.directories.forEach(directory => {
    readProcess(directory, path.join(process.cwd(), 'content'));
  });

  // this function is a clousure, because we need to access pagesLayers to keep tracking the result
  function readProcess(directory, directoryPath) {
    // separate directories from files
    const dividedElLayer = readFilesProcess(directoryPath, directory);

    // save pages from current directory
    //pagesLayers.concat(dividedElLayer.pages);
    pagesLayers.pageTitles = [
      ...pagesLayers.pageTitles,
      ...dividedElLayer.pageTitles,
    ];
    pagesLayers.fullPages = {
      ...pagesLayers.fullPages,
      ...dividedElLayer.fullPages,
    };

    // check if there are more directories to check in the current layer
    if (dividedElLayer.directories.length !== 0) {
      // pass the current layer path to could keep going deeper
      dividedElLayer.directories.forEach(directory => {
        readProcess(directory, layerPath);
      });
    }
  }

  return pagesLayers;
}
