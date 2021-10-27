import React from 'react';
import PropTypes from 'prop-types';
import FillerProgressBar from './FillerProgressBar';

class ProgressBar extends React.Component {
  render() {
    const { percentage } = this.props;
    return (
      <div className="progress-bar">
        <FillerProgressBar percentage={ percentage } />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
