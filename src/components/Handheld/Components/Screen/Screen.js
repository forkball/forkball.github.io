/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../../../assets/me.png';
import './Screen.scss';
import { BioPanel, BriefPanel, SocialPanel } from '../../Panels';
import { SECTIONS } from '../../../../constants';

// START menu labels, in SECTIONS order
const MENU_ITEMS = ['ABOUT', 'SKILLS', 'SOCIALS'];

const Screen = forwardRef(
  (
    {
      className,
      panelSet,
      showMenu,
      menuIndex,
      menuControls,
      // perhaps create a panel state
      socialPanelIndex,
      showHint,
    },
    ref,
  ) => {
    useEffect(() => {
      // eslint-disable-next-line no-param-reassign
      ref.current.scrollTop = 0;
    }, [panelSet]);

    // whether the panel has more text below, for the down arrow hint
    const [canScrollDown, setCanScrollDown] = useState(false);
    useEffect(() => {
      const content = ref.current;
      if (!content) return undefined;
      const update = () =>
        setCanScrollDown(content.scrollTop + content.clientHeight < content.scrollHeight - 4);
      update();
      content.addEventListener('scroll', update);
      window.addEventListener('resize', update);
      return () => {
        content.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      };
    }, [panelSet]);

    const renderPanel = () => {
      switch (panelSet) {
        case SECTIONS.SOCIALS:
          return <SocialPanel ref={ref} socialPanelIndex={socialPanelIndex} />;
        case SECTIONS.SKILLS:
          return <BriefPanel ref={ref} more={canScrollDown} />;
        default:
          return <BioPanel ref={ref} image={image} showHint={showHint} more={canScrollDown} />;
      }
    };
    const renderMenu = () => {
      return showMenu ? (
        <div className="handheld-screen__interface__menu absolute flex flex-col h-full w-1/2 right-0 top-0">
          <ol className="handheld-screen__interface__menu__items">
            {MENU_ITEMS.map((label, index) => (
              <li
                key={label}
                className={`handheld-screen__interface__menu__items__item${
                  menuIndex === index ? '--selected' : ''
                }`}
              >
                <button type="button" onClick={menuControls[index]}>
                  {label}
                </button>
              </li>
            ))}
          </ol>
          <div className="handheld-screen__interface__menu__hints mt-auto">
            <p>A SELECT</p>
            <p>B BACK</p>
          </div>
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
  panelSet: PropTypes.number,
  showMenu: PropTypes.bool,
  menuIndex: PropTypes.number,
  menuControls: PropTypes.arrayOf(PropTypes.func),
  socialPanelIndex: PropTypes.number,
  showHint: PropTypes.bool,
};

Screen.defaultProps = {
  className: '',
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
      console.log('skills');
    },
    () => {
      // eslint-disable-next-line no-console
      console.log('socials');
    },
  ],
  socialPanelIndex: 0,
  showHint: false,
};

export default Screen;
