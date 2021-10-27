import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FillerProgressBar extends Component {
  render() {
    const { percentage } = this.props;
    return <div className="filler" style={ { width: `${percentage}%` } } />;
  }
}

FillerProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

/* const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
} */
