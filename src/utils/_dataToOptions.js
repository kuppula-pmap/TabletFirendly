// Create Data to Options method for using with react-select control.
export default function dataToOptions(arr) {
  const newArray = [];

  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      newArray.push({Id: arr[i], Description: arr[i]});
    }
  }
  return newArray;
}
