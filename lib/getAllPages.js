import fs from 'fs';
import path from 'path';

const reducerFilterPages = (accumulator, currentVal) => {
  // avoid adding next.js files that are not pages
  if (currentVal.endsWith('.md')) {
    accumulator.pages.push(currentVal);
  } else {
    accumulator.directories.push(currentVal);
  }
  return accumulator;
};

// read the elements from target directory
function readFilesProcess(startPath, targetDirectory) {
  // get full path of the directory
  const layerPath = path.join(startPath, targetDirectory);
  // read all files
  const layerFiles = fs.readdirSync(layerPath);

  // separate the files in pages and directories
  return layerFiles.reduce(reducerFilterPages, {
    pages: [],
    directories: [],
  });
}

export default function getAllPages() {
  const pagesLayers = {};

  // separate directories from files in the content directory (initial)
  const dividedElements = readFilesProcess(process.cwd(), 'content');

  // save the root pages
  pagesLayers['root'] = dividedElements.pages;

  console.log('first layer read');
  console.log(dividedElements);
  // start reading deeper directories
  dividedElements.directories.forEach(directory => {
    readProcess(directory, path.join(process.cwd(), 'content'));
  });

  // this function is a clousure, because we need to access pagesLayers to keep tracking the result
  function readProcess(directory, directoryPath) {
    // separate directories from files
    const dividedElLayer = readFilesProcess(directoryPath, directory);

    // save pages from current directory
    pagesLayers[directory] = dividedElLayer.pages;

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
