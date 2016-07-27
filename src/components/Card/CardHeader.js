// Dependencies.
import React from 'react';
import Ficon from 'react-fa';


// Define class.
class CardHeader extends React.Component {

  // toggleAccordion(e) {
  //   this.props.toggleAccordion(e);
  // }

  // Render method.
  render() {
    const { title, accordion, openAccordion, toggleAccordion } = this.props;
    // this.toggleAccordion.bind(this)
    return (
      <div className="card-header">
        {accordion ?
          <a onClick={() => toggleAccordion()}>
            <Ficon name={openAccordion ? 'minus' : 'plus'} />
          </a>
        : null}
        {title}
      </div>
    );
  }
}

// Validation.
CardHeader.propTypes = {
  title: React.PropTypes.node,
  accordion: React.PropTypes.bool,
  openAccordion: React.PropTypes.bool,
  toggleAccordion: React.PropTypes.func,
};

// Export.
export default CardHeader;
