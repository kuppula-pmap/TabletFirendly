// Create Folder Matrix.
export default function parseTreeWithBreadcrumb(data) {
  const childnode = 'folder_id';
  const parentnode = 'parent_folder_id';

  const dataMap = data.reduce((map, node) => {
    map[node[childnode]] = node;
    return map;
  }, {});

  // create the tree array
  let tree = [];
  data.forEach((node) => {
    // add to parent
    const parent = dataMap[node[parentnode]];
    let arr = [];
    let obj = {'breadcrumb_id': node.folder_id, 'breadcrumb_name': node.folder_name};
    // obj.breadcrumb_id = node.folder_id;
    // obj.breadcrumb_name = node.folder_name;

    arr.push(obj);

    if (parent !== node) {
      // create child array if it doesn't exist
      node.folder_breadcrumb = [];
      node.folder_breadcrumb.push(obj);
      node.folder_breadcrumb = node.folder_breadcrumb.concat(parent.folder_breadcrumb);
      (parent.children || (parent.children = []))
          // add node to child array
          .push(node);
    } else {
      // parent is null or missing
      node.folder_breadcrumb = arr;
      tree.push(node);
    }
  });

  return [{'folder_id': 0, 'folder_name': 'root', 'children': tree }];
}
