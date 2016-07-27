// Dependencies.
import React from 'react';

// Core components.
import {Row, Col, Button} from 'react-bootstrap';
import Icon from 'react-fa';

// Define class.
class RowHeader extends React.Component {
  // Render method.
  render() {
    const { rowData } = this.props;

    let styles = {
      actions: {
        display: 'none',
        padding: '10px 0',
      },

      titles: {
        padding: '20px 0 6px',
        marginLeft: 0,
        marginRight: 0,
      },
    };

    const header = rowData.map( (col, index) => {
      return (
        <Col key={index} className={ col.align }
          xs={col.xs}
          sm={col.sm}
          md={col.md}
          lg={col.lg}>
          <b>{col.label}</b>
        </Col>
      );
    });

    return (
      <div className="file_manager-list_header">

        <Row className="file_manager-list_actions" style={styles.actions}>
          <Col sm={12}>
            <Button href="#/" bsStyle="link" bsSize="xs">
              <Icon name="folder-open" className="text-info" /> Share
            </Button>
          </Col>
        </Row>

        <Row className="file_manager-list_titles hidden-xs" style={styles.titles}>
          {header}
        </Row>

      </div>
    );
  }
}

// Validation.
RowHeader.propTypes = {
  rowData: React.PropTypes.array
};

// Export.
export default RowHeader;
