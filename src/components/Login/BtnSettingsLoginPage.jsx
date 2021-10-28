import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BtnSettingsLoginPage extends Component {
  render() {
    const { redirect } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ redirect }
      >
        Settings
      </button>
    );
  }
}

BtnSettingsLoginPage.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default BtnSettingsLoginPage;
