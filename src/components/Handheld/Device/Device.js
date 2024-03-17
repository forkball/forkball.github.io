import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Screen } from '../Components';
import Input from '../Components/Input';
import './Device.scss';

const NUMBER_OF_PANELS = 1;
const NUMBER_OF_SOCIAL_LINKS = 3;
const MINIMUM_HORIZONTAL_VIEW_HEIGHT = 900;
const MAXIMUM_HORIZONTAL_VIEW_WIDTH = 728;
const MAXIMUM_MENU_INDEX = 1;
function Device({ classes }) {
  const panelRef = useRef(null);

  const [screenSections, setScreenSections] = useState({ 0: [], 1: [] });
  const [sectionPosition, setSectionPosition] = useState(0);

  const [panel, setPanel] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [panelSet, setPanelSet] = useState(0);
  const [socialPanelIndex, setSocialPanelIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // divide the screen into sections for better readability in scrolling
  const setSections = () => {
    const elements =
      panel === 0
        ? document.getElementsByClassName('scroll-anchor')
        : document.getElementsByClassName('scroll-anchor');

    // set section state
    if (panel === 0)
      setScreenSections({
        ...screenSections,
        [panel]: elements,
      });
    if (panel === 1)
      setScreenSections({
        ...screenSections,
        [panel]: elements,
      });

    return elements;
  };

  // handle vertical scroll behaviour
  const scroll = (direction) => {
    let sections = screenSections[panel];
    if (screenSections[panel].length === 0) sections = setSections()[panel];
    // scroll down
    if (direction === 1) {
      if (sectionPosition + 1 < sections.length) setSectionPosition(sectionPosition + 1);
      sections[sectionPosition + 1].scrollIntoView({
        behavior: 'smooth',
      });
    }
    // scroll up
    else if (direction === -1) {
      if (sectionPosition - 1 >= 0) {
        setSectionPosition(sectionPosition - 1);
        sections[sectionPosition - 1].scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  // navigate left
  const onLeftPress = () => {
    if (!showMenu) {
      setSectionPosition(0);
      if (panel > 0) setPanel(panel - 1);
      else setPanel(NUMBER_OF_PANELS);
    }
  };

  // navigate right
  const onRightPress = () => {
    if (!showMenu) {
      setSectionPosition(0);
      if (panel < NUMBER_OF_PANELS) setPanel(panel + 1);
      else setPanel(0);
    }
  };

  // navigate up
  const onUpPress = () => {
    if (!showMenu) {
      switch (panelSet) {
        case 1:
          if (socialPanelIndex > 0) setSocialPanelIndex(socialPanelIndex - 1);
          break;
        default:
          if (panelRef.current) {
            scroll(-1);
          }
          break;
      }
    } else if (menuIndex > 0) setMenuIndex(menuIndex - 1);
  };

  // navigate down
  const onDownPress = () => {
    if (!showMenu) {
      switch (panelSet) {
        case 1:
          if (socialPanelIndex < NUMBER_OF_SOCIAL_LINKS) setSocialPanelIndex(socialPanelIndex + 1);
          break;
        default:
          if (panelRef.current) {
            scroll(1);
          }
          break;
      }
    } else if (menuIndex < MAXIMUM_MENU_INDEX) setMenuIndex(menuIndex + 1);
  };

  // show navigation menu on start press
  const onStartPress = () => {
    setShowMenu(!showMenu);
  };

  // interact ui, selects items
  const onAButtonPress = (index = -1) => {
    if (showMenu) {
      let mI = menuIndex;
      if (index >= 0) mI = index;
      setPanelSet(mI);
      setShowMenu(false);
      setPanel(0);
    } else {
      // handle a button behavior based on panel set
      switch (panelSet) {
        case 1: {
          const anchors = document
            .getElementsByClassName('panel-social')[0]
            .getElementsByTagName('a');
          anchors[socialPanelIndex].click();
          break;
        }
        default:
          break;
      }
    }
  };

  const onBButtonPress = () => {
    if (showMenu) setShowMenu(false);
  };

  const menuControls = [
    () => {
      setMenuIndex(0);
      onAButtonPress(0);
    },
    () => {
      setMenuIndex(1);
      onAButtonPress(1);
    },
  ];

  const renderVerticalDevice = () => (
    <div className={`handheld flex flex-col shadow-lg ${classes}`}>
      <h1 className="mt-auto w-full">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__screen flex justify-center">
        <Screen
          ref={panelRef}
          panel={panel}
          panelSet={panelSet}
          showMenu={showMenu}
          menuIndex={menuIndex}
          menuControls={menuControls}
          socialPanelIndex={socialPanelIndex}
        />
      </div>
      <div className="handheld__input flex flex-col w-full h-full self-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          handleStart={onStartPress}
          handleA={onAButtonPress}
          handleB={onBButtonPress}
        />
      </div>
    </div>
  );

  const renderHorizontalDevice = () => (
    <div className={`handheld handheld--horizontal flex flex-col shadow-lg ${classes}`}>
      <h1 className="w-full self-center">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__input flex flex-col w-full h-full self-center items-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          handleStart={onStartPress}
          handleA={onAButtonPress}
          handleB={onBButtonPress}
          Screen={
            <Screen
              ref={panelRef}
              panel={panel}
              panelSet={panelSet}
              showMenu={showMenu}
              menuIndex={menuIndex}
              menuControls={menuControls}
              socialPanelIndex={socialPanelIndex}
            />
          }
        />
      </div>
    </div>
  );

  useEffect(() => {
    setSections();
  }, [panel]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, [window]);

  if (windowHeight < MINIMUM_HORIZONTAL_VIEW_HEIGHT && windowWidth > MAXIMUM_HORIZONTAL_VIEW_WIDTH)
    return renderHorizontalDevice();
  return renderVerticalDevice();
}

Device.propTypes = {
  classes: PropTypes.string,
};

Device.defaultProps = {
  classes: '',
};

export default Device;
