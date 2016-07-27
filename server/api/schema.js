import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

import * as api from './http';

const dbStatus = new Promise(api.getDBStatus);
const dbFolder = new Promise(api.getDBFolder);
const dbDocument = new Promise(api.getDBDocument);


const StatusType = new GraphQLObjectType({
  name: 'Status',
  description: 'This represents the Status',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(status) {
          return status.doc_status_id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(status) {
          return status.doc_status_name;
        }
      }
    };
  }
});

const FolderType = new GraphQLObjectType({
  name: 'Folder',
  description: 'This represents a Folder',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(folder) {
          return folder.folder_id;
        }
      },
      parent_id: {
        type: GraphQLInt,
        resolve(folder) {
          return folder.parent_folder_id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(folder) {
          return folder.folder_name;
        }
      }
    };
  }
});

const DocumentType = new GraphQLObjectType({
  name: 'Document',
  description: 'This represents a Document',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(document) {
          return document.doc_id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(document) {
          return document.doc_title;
        }
      },
      name: {
        type: GraphQLString,
        resolve(document) {
          return document.file_name;
        }
      },
      author: {
        type: GraphQLString,
        resolve(document) {
          return document.doc_author;
        }
      },
      description: {
        type: GraphQLString,
        resolve(document) {
          return document.doc_description;
        }
      },
      doc_status_id: {
        type: GraphQLInt,
        resolve(document) {
          return document.doc_status_id;
        }
      },
      status: {
        type: StatusType,
        resolve() {
          return {};
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      status: {
        type: new GraphQLList(StatusType),
        resolve() {
          return dbStatus;
        }
      },
      folder: {
        type: new GraphQLList(FolderType),
        resolve() {
          return dbFolder;
        }
      },
      document: {
        type: new GraphQLList(DocumentType),
        resolve() {
          return dbDocument;
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create data',
  fields() {
    return {
      addStatus: {
        type: StatusType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(_, args) {
          return api.addDBStatus({
            doc_status_name: args.name
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
