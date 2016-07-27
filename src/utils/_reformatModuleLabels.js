// Reformat the modulelabels object to be used in the ui.
export default function reformatModuleLabels(arr) {
  // // Array of objects.
  // const newArray = [];
  //
  // if (arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     newArray.push(
  //       {
  //         [arr[i].Key]: arr[i].Description
  //       }
  //     );
  //   }
  // }

  const obj = {};

  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i].Key] = arr[i].Description;
    }
  }
  return obj;
}
