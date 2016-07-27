import Firebase from 'firebase';

let ref = new Firebase('https://resplendent-heat-3135.firebaseio.com');

export function getDocuments() {
  return ref.once('value').then(data => {
    return data.val();
  });
}
