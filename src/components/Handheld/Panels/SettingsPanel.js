import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';

// device settings: each row shows its current value, and A or a tap changes
// the selected one
const SettingsPanel = forwardRef(({ settings, settingsIndex, changeSetting, goHome }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content panel-settings flex flex-col h-full w-full overflow-y-auto"
    >
      <div className="handheld-screen__interface__content__body flex flex-col text-left mt-4">
        <h2>SETTINGS/</h2>
        {settings.map(({ label, value }, index) => (
          <button
            key={label}
            type="button"
            className={`setting${settingsIndex === index ? ' selected' : ''}`}
            onClick={() => changeSetting(index)}
          >
            <span>{label}</span>
            <span className="setting__value">{value}</span>
          </button>
        ))}
      </div>
      <PageBar
        hints={[
          ['A', 'CHANGE'],
          ['B', 'BACK'],
        ]}
        blinkHints
        onHome={goHome}
      />
    </div>
  );
});

SettingsPanel.propTypes = {
  // [{ label, value }] in display order
  settings: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ),
  settingsIndex: PropTypes.number,
  changeSetting: PropTypes.func,
  goHome: PropTypes.func,
};

SettingsPanel.defaultProps = {
  settings: [],
  settingsIndex: 0,
  changeSetting: () => {},
  goHome: () => {},
};

export default SettingsPanel;
