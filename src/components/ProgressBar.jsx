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

// componente feito a partir deste site https://dzuz14.medium.com/how-to-build-a-progress-bar-with-react-8c5e79731d1f