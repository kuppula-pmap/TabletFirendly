// Set the page `<title>`.
export default function(props, pageTitle) {
  // Fallback site title.
  const suffix = 'Powered By ProcessMAP';
  const routeTitle = props.route ? props.route.title : null;

  // Used in conditional.
  let title = routeTitle || pageTitle;

  // console.log('title', title);
  // console.log('pageTitle', pageTitle);

  // Is there a title?
  if (title) {
    title = title + ' | ' + suffix;

  // If no title exists.
  } else {
    title = suffix;
  }

  // title = 'EHS System - Powered By ProcessMAP';

  // Set title.
  document.title = title;
}
