// Method that takes two arguments, the initial tree, and a array of nodes.
// It returns a new tree with the it's children values updated with any matches
// found in the list of nodes.

// NOTE: It only maps selected values, it ignores if a child is already selected
export default function assignNodesToTree(obj, nodes = [], parent = {}) {
  let newTree = typeof obj !== 'undefined' ? obj : {};

  let childWasSelected = false;

  if (newTree.children) {
    Object.keys(newTree.children).forEach((key) => {
      // Grab the current child in the loop.
      let child = newTree.children[key];
      if (nodes.length) {
        nodes.forEach((node) => {
          if (node.id === child.id) {
            if (!child.selected) {
              child.selected = true;
              newTree.toggled = true;
              childWasSelected = true;
            }
          }
          if (node.id === newTree.id) {
            // node.toggled = !node.toggled;
            newTree.toggled = true;
            newTree.selected = true;
          }

          if (child.children.length) {
            if (childWasSelected) {
              newTree.toggled = true;
              parent.toggled = true;
            }
            assignNodesToTree(child, nodes, newTree);
          }
        });
      }
    });
  }

  return newTree;
}
