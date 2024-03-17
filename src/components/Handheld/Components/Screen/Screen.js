/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../../../assets/me.png';
import './Screen.scss';
import { BioPanel, BriefPanel, SocialPanel } from '../../Panels';

const Screen = forwardRef(
  (
    {
      className,
      panel,
      panelSet,
      showMenu,
      menuIndex,
      menuControls,
      // perhaps create a panel state
      socialPanelIndex,
    },
    ref,
  ) => {
    useEffect(() => {
      // eslint-disable-next-line no-param-reassign
      ref.current.scrollTop = 0;
    }, [panel]);

    const renderPanel = () => {
      switch (panelSet) {
        case 1:
          switch (panel) {
            default:
              return <SocialPanel ref={ref} socialPanelIndex={socialPanelIndex} />;
          }
        default:
          switch (panel) {
            // overview panel
            case 1:
              return <BriefPanel ref={ref} />;
            // landing panel
            default:
              return <BioPanel ref={ref} image={image} />;
          }
      }
    };
    const renderMenu = () => {
      return showMenu ? (
        <div className="handheld-screen__interface__menu absolute h-full w-1/2 right-0 top-0">
          <ol className="handheld-screen__interface__menu__items">
            <li
              className={`handheld-screen__interface__menu__items__item${
                menuIndex === 0 ? '--selected' : ''
              }`}
            >
              <button type="button" onClick={menuControls[0]}>
                ABOUT
              </button>
            </li>
            <li
              className={`handheld-screen__interface__menu__items__item${
                menuIndex === 1 ? '--selected' : ''
              }`}
            >
              <button type="button" onClick={menuControls[1]}>
                SOCIALS
              </button>
            </li>
          </ol>
        </div>
      ) : null;
    };

    return (
      <div className={`handheld-screen flex flex-col justify-center items-center ${className}`}>
        <div className="handheld-screen__interface flex flex-col h-full font-pixel relative">
          {renderPanel()}
          {renderMenu()}
        </div>
      </div>
    );
  },
);

Screen.propTypes = {
  className: PropTypes.string,
  panel: PropTypes.number,
  panelSet: PropTypes.number,
  showMenu: PropTypes.bool,
  menuIndex: PropTypes.number,
  menuControls: PropTypes.arrayOf(PropTypes.func),
  socialPanelIndex: PropTypes.number,
};

Screen.defaultProps = {
  className: '',
  panel: 0,
  panelSet: 0,
  showMenu: false,
  menuIndex: 0,
  menuControls: [
    () => {
      // eslint-disable-next-line no-console
      console.log('about');
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('socials');
    },
  ],
  socialPanelIndex: 0,
};

export default Screen;
