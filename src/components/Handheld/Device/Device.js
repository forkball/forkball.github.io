import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Screen } from '../Components';
import Input from '../Components/Input';
import { SECTIONS } from '../../../constants';
import './Device.scss';

const NUMBER_OF_SOCIAL_LINKS = 3;
const MINIMUM_HORIZONTAL_VIEW_HEIGHT = 900;
const MAXIMUM_HORIZONTAL_VIEW_WIDTH = 728;
const MAXIMUM_MENU_INDEX = Object.keys(SECTIONS).length - 1;
function Device({ classes }) {
  const panelRef = useRef(null);

  const [screenSections, setScreenSections] = useState({});
  const [sectionPosition, setSectionPosition] = useState(0);

  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [panelSet, setPanelSet] = useState(0);
  const [socialPanelIndex, setSocialPanelIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);

  // divide the screen into sections for better readability in scrolling
  const setSections = () => {
    const elements = document.getElementsByClassName('scroll-anchor');
    setScreenSections({
      ...screenSections,
      [panelSet]: elements,
    });
    return elements;
  };

  // handle vertical scroll behaviour
  const scroll = (direction) => {
    let sections = screenSections[panelSet];
    if (!sections || sections.length === 0) sections = setSections();
    // scroll down
    if (direction === 1) {
      if (sectionPosition + 1 < sections.length) {
        setSectionPosition(sectionPosition + 1);
        sections[sectionPosition + 1].scrollIntoView({
          behavior: 'smooth',
        });
      }
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

  // every section is a single page, so left and right have nothing to flip
  const onLeftPress = () => {};
  const onRightPress = () => {};

  // switch to a section from the top
  const openSection = (section) => {
    setPanelSet(section);
    setMenuIndex(section);
    setSectionPosition(0);
    setShowMenu(false);
  };

  // navigate up
  const onUpPress = () => {
    if (!showMenu) {
      switch (panelSet) {
        case SECTIONS.SOCIALS:
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
        case SECTIONS.SOCIALS:
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
    setHasOpenedMenu(true);
  };

  // interact ui, selects items
  const onAButtonPress = (index = -1) => {
    if (showMenu) {
      openSection(index >= 0 ? index : menuIndex);
    } else {
      // handle a button behavior based on panel set
      switch (panelSet) {
        case SECTIONS.SOCIALS: {
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

  // back out of the menu; outside it B does nothing
  const onBButtonPress = () => {
    if (showMenu) setShowMenu(false);
  };

  // map keyboard keys to the device buttons
  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // links and menu items on the screen itself, not the device's own buttons
    const onScreenControl =
      ['BUTTON', 'A'].includes(event.target.tagName) && event.target.closest('.handheld-screen');
    const keyHandlers = {
      ArrowUp: onUpPress,
      ArrowDown: onDownPress,
      // enter acts as A where A does something, otherwise opens the menu
      Enter: showMenu || panelSet === SECTIONS.SOCIALS ? () => onAButtonPress() : onStartPress,
      Escape: showMenu ? onBButtonPress : onStartPress,
      Backspace: onBButtonPress,
      // the A and B keys match the on-screen hints
      a: () => onAButtonPress(),
      b: onBButtonPress,
    };
    // let enter activate a focused on-screen menu item or link natively
    if (event.key === 'Enter' && onScreenControl) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const handler = keyHandlers[key];
    if (!handler) return;
    event.preventDefault();
    handler();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const menuControls = Object.values(SECTIONS).map((section) => () => openSection(section));

  const renderVerticalDevice = () => (
    <div className={`handheld flex flex-col shadow-lg ${classes}`}>
      <h1 className="mt-auto w-full">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__screen flex justify-center">
        <Screen
          ref={panelRef}
          panelSet={panelSet}
          showMenu={showMenu}
          menuIndex={menuIndex}
          menuControls={menuControls}
          socialPanelIndex={socialPanelIndex}
          showHint={!hasOpenedMenu}
        />
      </div>
      <div className="handheld__input flex flex-col w-full h-full self-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          handleSelect={onStartPress}
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
              panelSet={panelSet}
              showMenu={showMenu}
              menuIndex={menuIndex}
              menuControls={menuControls}
              socialPanelIndex={socialPanelIndex}
              showHint={!hasOpenedMenu}
            />
          }
        />
      </div>
    </div>
  );

  useEffect(() => {
    setSections();
  }, [panelSet]);

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
