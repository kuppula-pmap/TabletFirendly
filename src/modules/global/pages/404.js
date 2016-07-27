// Dependencies.
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

// Layout components.
import Main from '../../../layouts/main';


// Define class.
class PageNotFound extends React.Component {
  // Render method.
  render() {
    return (
      <Main>
        <div className="text-center" style={{ width: '80%', minWidth: 300, margin: '50px auto' }}>
          <h1 className="text-muted" style={{ fontSize: '1000%', marginBottom: -20 }}>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, but we are cannot find the page you are looking for.</p>
          <br/>
          <LinkContainer to="/home">
            <Button bsSize="lg" bsStyle="success">
              Return to the Homepage
            </Button>
          </LinkContainer>
        </div>
      </Main>
    );
  }
}

// Export.
export default PageNotFound;
