import React from 'react';
import PropTypes from 'prop-types';

// a small on-screen copy of one of the device's buttons, used in control hints
function ButtonChip({ label, round }) {
  return <span className={`button-chip${round ? ' button-chip--round' : ''}`}>{label}</span>;
}

ButtonChip.propTypes = {
  label: PropTypes.string.isRequired,
  round: PropTypes.bool,
};

ButtonChip.defaultProps = {
  round: false,
};

export default ButtonChip;
