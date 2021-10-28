import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputLoginPage extends Component {
  render() {
    const { name, value, handleChange, dataTestid } = this.props;
    return (
      <input
        type="text"
        data-testid={ dataTestid }
        placeholder={ `Insert your ${name}` }
        value={ value }
        name={ name }
        onChange={ handleChange }
      />
    );
  }
}

InputLoginPage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputLoginPage;
