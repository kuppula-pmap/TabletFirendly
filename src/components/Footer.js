// Dependencies.
import React from 'react';


// Define class.
class Footer extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);
  }

  // Render method.
  render() {
    return (
      <footer role="copyright">
        <hr />
        <p className="text-muted">
          <small>&copy; 2015 ProcessMAP. All rights reserved.</small>
        </p>
      </footer>
    );
  }
}

// Export.
export default Footer;
