// Dependencies.
import React from 'react';
import { Grid, Row, Col, Alert, Panel, Button, ButtonInput } from 'react-bootstrap';

// Load bootstrap CSS.
import 'bootstrap/dist/css/bootstrap.css';


// Define class.
class Login extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      loginOk: true
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let userHasPermission = this.props.onLogin(this.refs.loginName.value, this.refs.password.value);
    this.setState({loginOk: userHasPermission});
  }

  // Render method.
  render() {
    let alertBlock = '';
    if (!this.state.loginOk) {
      alertBlock = (
        <Alert bsStyle="danger" className="text-center">
          <h4>Incorrect Login/Password.</h4>
          <p>Please check your credentials and try again.</p>
        </Alert>
      );
    }

    const panelHeader = <h4 className="text-center">Sign in to continue</h4>;
    const panelFooter = (
      <div className="text-center">
        Do not have an account?
        <Button bsStyle="link" bsSize="xs"> Contact ProcessMAP </Button>
      </div>
    );

    return (
       <Grid>
        <Row>
          <Col sm={6} smOffset={3} md={4} mdOffset={4}>

            {alertBlock}

            <Panel header={panelHeader} footer={panelFooter}>
              <form role="form" action="#" method="POST" onSubmit={this.handleSubmit.bind(this)}>
                <Row>
                  <Col md={10} mdOffset={1}>

                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-user"></i>
                        </span>
                        <input className="form-control" placeholder="Username" ref="loginName" name="loginName" type="text" autoFocus />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-lock"></i>
                        </span>
                        <input className="form-control" placeholder="Password" ref="password" name="password" type="password" />
                      </div>
                    </div>

                    <ButtonInput type="submit" value="Login" bsStyle="primary" block />

                  </Col>
                </Row>
              </form>
            </Panel>

          </Col>
        </Row>
      </Grid>
    );
  }
}

// Validation.
Login.propTypes = {
  onLogin: React.PropTypes.func
};


// Export.
export default Login;
