// Helper for returning a unique string.
export default function downloadDocument(url) {
  // Get file name from url.
  const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // delete a;
  };
  xhr.open('GET', url);
  xhr.send();

  console.log('FINE DOWNLOAD TRIGGERED!');
}
