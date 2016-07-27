// Determines the file icon based on the extension of the file name.
export default function nameIcon(fileName) {
  let ext;
  if (fileName) {
    // Extract the extention from the file name.
    ext = fileName.split('.').pop();
  }

  // Switch the name of the returned extention.
  switch (ext) {
  // Word.
  case 'doc':
    return 'file-word-o';
  // Excel.
  case 'xls':
    return 'file-excel-o';
  // PowerPoint.
  case 'ppt':
    return 'file-powerpoint-o';
  // PDF.
  case 'pdf':
    return 'file-pdf-o';
  // Images.(png|jpg|gif)
  case 'png':
    return 'file-image-o';
  // Movies.(mov|mpeg4|mp4|avi|mpegps|3GPP|WebM)
  case 'mov':
    return 'file-video-o';
  case 'mpeg4':
    return 'file-video-o';
  case 'mp4':
    return 'file-video-o';
  case 'avi':
    return 'file-video-o';
  case 'mpegs':
    return 'file-video-o';
  case '3gp':
    return 'file-video-o';
  case 'webm':
    return 'file-video-o';
  case 'wmv':
    return 'file-video-o';
  // All unknown extentions are images.
  default:
    return 'file-image-o';
  }
}
