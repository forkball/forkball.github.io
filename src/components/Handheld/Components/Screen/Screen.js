/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import image from '../../../../assets/me-sprite.png';
import './Screen.scss';
import { BioPanel, BriefPanel, HomePanel, SettingsPanel, SocialPanel } from '../../Panels';
import { SECTIONS } from '../../../../constants';

const Screen = forwardRef(
  (
    {
      className,
      panelSet,
      homeIndex,
      openApp,
      goHome,
      showTips,
      toggleTips,
      // perhaps create a panel state
      socialPanelIndex,
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
        case SECTIONS.HOME:
          return <HomePanel ref={ref} homeIndex={homeIndex} openApp={openApp} />;
        case SECTIONS.SETTINGS:
          return (
            <SettingsPanel ref={ref} showTips={showTips} toggleTips={toggleTips} goHome={goHome} />
          );
        case SECTIONS.SOCIALS:
          return <SocialPanel ref={ref} socialPanelIndex={socialPanelIndex} goHome={goHome} />;
        case SECTIONS.SKILLS:
          return <BriefPanel ref={ref} more={canScrollDown} goHome={goHome} />;
        default:
          return <BioPanel ref={ref} image={image} more={canScrollDown} goHome={goHome} />;
      }
    };

    return (
      <div className={`handheld-screen flex flex-col justify-center items-center ${className}`}>
        <div className="handheld-screen__interface flex flex-col h-full font-pixel relative">
          {renderPanel()}
          {/* Pokédex-style frame: a double rule with square rivets in the corners */}
          <div className="dex-frame" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  },
);

Screen.propTypes = {
  className: PropTypes.string,
  panelSet: PropTypes.number,
  homeIndex: PropTypes.number,
  openApp: PropTypes.func,
  goHome: PropTypes.func,
  showTips: PropTypes.bool,
  toggleTips: PropTypes.func,
  socialPanelIndex: PropTypes.number,
};

Screen.defaultProps = {
  className: '',
  panelSet: SECTIONS.HOME,
  homeIndex: 0,
  openApp: () => {},
  goHome: () => {},
  showTips: true,
  toggleTips: () => {},
  socialPanelIndex: 0,
};

export default Screen;
