// Dependencies.
import React from 'react';
import CardHeader from './CardHeader';


// Define class.
class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAccordionOpen: props.openAccordion
    };
  }

  toggleAccordion() {
    // e.preventDefault();
    // console.log('Triggered toggleAccordion()');
    // console.log('isAccordionOpen', this.state.isAccordionOpen);
    this.setState({ isAccordionOpen: !this.state.isAccordionOpen });
    this.props.propsCallback();
  }

  // Render method.
  render() {
    const { title, accordion, children } = this.props;
    const { isAccordionOpen } = this.state;

    // console.log('isAccordionOpen', this.state.isAccordionOpen);
    // this.toggleAccordion.bind(this)
    return (
      <div className="card">
        {title ?
          <CardHeader
            title={title}
            accordion={accordion}
            openAccordion={isAccordionOpen}
            toggleAccordion={this.toggleAccordion.bind(this)}
          />
        : null}
        {isAccordionOpen || !accordion ?
          <div className="card-body">
            {children}
          </div>
        : null}
      </div>
    );
  }
}

// Validation.
Card.propTypes = {
  title: React.PropTypes.string,
  accordion: React.PropTypes.bool,
  openAccordion: React.PropTypes.bool,
  propsCallback: React.PropTypes.func,
  children: React.PropTypes.node,
};

Card.defaultProps = {
  accordion: false
};

// Export.
export default Card;
