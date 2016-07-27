// Utility method that sorts a collection alphabetically, given a key to target
export default function alphabetizeByKey(array = [], key) {
  array.sort((a, b) => {
    if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
      return a[key].localeCompare(b[key]);
    }
  });
  return array;
}
