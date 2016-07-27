// import sourceData from '../../../../src/static/data/documents-data-DEMO.json';
import fs from 'fs';
import path from 'path';
import promise from 'bluebird';

const sourceData = '../../../../src/static/data/documents-data-DEMO.json';

// Promisify fs.
promise.promisifyAll(fs);

export function getDocuments() {
  return fs.readFileAsync(path.join(__dirname, sourceData))
  .then(data => {
    return JSON.parse(data);
  });
}
