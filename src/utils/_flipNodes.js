// Utility method that takes a tree, and a node.
// If the node id matches a node in the tree, then selected is true.
// Everything else should be set to false.

import _ from 'lodash';
export default function flipNodes(obj, node = {}) {
  let newTree = _.cloneDeep({}, obj);
  // if the node is a selected item
  if (node) {
    if (newTree.hasOwnProperty('children')) {
      Object.keys(newTree.children).forEach((key) => {
        let child = newTree.children[key];
        // console.log(`COMPARING ${node.id} with ${child.id}`);
        // If there is a match on id's
        if (node.id === child.id) {
          child.selected = true;
        } else {
          child.selected = false;
        }
      });
    }
  }
  return newTree;
}
