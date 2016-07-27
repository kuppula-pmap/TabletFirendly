import * as service from './rethinkdb/service/document';
// import * as service from './firebase/service/document';
// import * as service from './json/service/document';


export function getDocuments(req, res) {
  service.getDocuments()
  .then((documents) => res.json(documents))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

// Methods to load data through the GraphQL schema.
export function getDBStatus(resolve, reject) {
  service.getDocuments()
  .then((documents) => resolve(documents.document_status))
  .catch(err => {
    reject({error: err});
  });
}

export function getDBFolder(resolve, reject) {
  service.getDocuments()
  .then((documents) => resolve(documents.document_folder))
  .catch(err => {
    reject({error: err});
  });
}

export function getDBDocument(resolve, reject) {
  service.getDocuments()
  .then((documents) => resolve(documents.document))
  .catch(err => {
    reject({error: err});
  });
}

// Mutation methods.
export function addDBStatus(obj) {
  service.addStatus(obj)
  .then((status) => status)
  .catch(err => {
    JSON.stringify({error: err, status: obj});
  });
}
