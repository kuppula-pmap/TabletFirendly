// Dependencies.
import React from 'react';

// Core components.
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';


// Define class.
export default class FileManagerRowLoader extends React.Component {
  // Render method.
  render() {
    return (
      <ListGroup className="file_manager-list">
        <ListGroupItem>
          <Row>
            <Col xs={12}>
              <div className="--file_manager-loader_wrapper">
                <div className="--file_manager-loader_inner">
                  <div className="--file_manager-loader_a"></div>
                  <div className="--file_manager-loader_b"></div>
                  <div className="--file_manager-loader_c"></div>
                  <div className="--file_manager-loader_d"></div>
                  <div className="--file_manager-loader_e"></div>
                  <div className="--file_manager-loader_f"></div>
                  <div className="--file_manager-loader_g"></div>
                  <div className="--file_manager-loader_h"></div>
                  <div className="--file_manager-loader_i"></div>
                </div>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col xs={12}>
              <div className="--file_manager-loader_wrapper">
                <div className="--file_manager-loader_inner">
                  <div className="--file_manager-loader_a"></div>
                  <div className="--file_manager-loader_b"></div>
                  <div className="--file_manager-loader_c"></div>
                  <div className="--file_manager-loader_d"></div>
                  <div className="--file_manager-loader_e"></div>
                  <div className="--file_manager-loader_f"></div>
                  <div className="--file_manager-loader_g"></div>
                  <div className="--file_manager-loader_h"></div>
                  <div className="--file_manager-loader_i"></div>
                </div>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col xs={12}>
              <div className="--file_manager-loader_wrapper">
                <div className="--file_manager-loader_inner">
                  <div className="--file_manager-loader_a"></div>
                  <div className="--file_manager-loader_b"></div>
                  <div className="--file_manager-loader_c"></div>
                  <div className="--file_manager-loader_d"></div>
                  <div className="--file_manager-loader_e"></div>
                  <div className="--file_manager-loader_f"></div>
                  <div className="--file_manager-loader_g"></div>
                  <div className="--file_manager-loader_h"></div>
                  <div className="--file_manager-loader_i"></div>
                </div>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
