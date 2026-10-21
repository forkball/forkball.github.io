import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';

// device settings; for now a single switch for the control hints
const SettingsPanel = forwardRef(({ showTips, toggleTips, goHome }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content panel-settings flex flex-col h-full w-full overflow-y-auto"
    >
      <div className="handheld-screen__interface__content__body flex flex-col text-left mt-4">
        <h2>SETTINGS/</h2>
        <button
          type="button"
          className="setting selected"
          aria-pressed={showTips}
          onClick={toggleTips}
        >
          <span>TIPS</span>
          <span className="setting__value">{showTips ? 'ON' : 'OFF'}</span>
        </button>
      </div>
      <PageBar
        hints={[
          ['A', 'SWITCH'],
          ['B', 'BACK'],
        ]}
        blinkHints
        onHome={goHome}
      />
    </div>
  );
});

SettingsPanel.propTypes = {
  showTips: PropTypes.bool,
  toggleTips: PropTypes.func,
  goHome: PropTypes.func,
};

SettingsPanel.defaultProps = {
  showTips: true,
  toggleTips: () => {},
  goHome: () => {},
};

export default SettingsPanel;
