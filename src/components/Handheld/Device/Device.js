import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Screen } from '../Components';
import Input from '../Components/Input';
import { APPS, HOME_COLUMNS, SECTIONS } from '../../../constants';
import './Device.scss';

// index of the last selectable entry on the socials page (the email)
const NUMBER_OF_SOCIAL_LINKS = 4;
const MINIMUM_HORIZONTAL_VIEW_HEIGHT = 900;
const MAXIMUM_HORIZONTAL_VIEW_WIDTH = 728;
function Device({ classes }) {
  const panelRef = useRef(null);

  const [screenSections, setScreenSections] = useState({});
  const [sectionPosition, setSectionPosition] = useState(0);

  const [homeIndex, setHomeIndex] = useState(0);
  const [panelSet, setPanelSet] = useState(SECTIONS.HOME);
  const [socialPanelIndex, setSocialPanelIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const onHome = panelSet === SECTIONS.HOME;

  // move the cursor on the home screen's app grid, stopping at its edges;
  // reads the latest index so quick repeated presses each move one tile
  const moveHomeCursor = (step) => {
    setHomeIndex((index) => {
      const next = index + step;
      if (next < 0 || next >= APPS.length) return index;
      // left and right stay on the same row
      if (
        Math.abs(step) === 1 &&
        Math.floor(next / HOME_COLUMNS) !== Math.floor(index / HOME_COLUMNS)
      )
        return index;
      return next;
    });
  };

  // open an app from the top
  const openSection = (section) => {
    setPanelSet(section);
    setSectionPosition(0);
  };

  // back to the home screen, with the cursor on the app just closed
  const goHome = () => {
    const appIndex = APPS.findIndex(({ section }) => section === panelSet);
    if (appIndex >= 0) setHomeIndex(appIndex);
    setPanelSet(SECTIONS.HOME);
  };

  // apps are single pages, so left and right only move around the home screen
  const onLeftPress = () => {
    if (onHome) moveHomeCursor(-1);
  };
  const onRightPress = () => {
    if (onHome) moveHomeCursor(1);
  };

  // navigate up
  const onUpPress = () => {
    switch (panelSet) {
      case SECTIONS.HOME:
        moveHomeCursor(-HOME_COLUMNS);
        break;
      case SECTIONS.SOCIALS:
        if (socialPanelIndex > 0) setSocialPanelIndex(socialPanelIndex - 1);
        break;
      default:
        if (panelRef.current) {
          scroll(-1);
        }
        break;
    }
  };

  // navigate down
  const onDownPress = () => {
    switch (panelSet) {
      case SECTIONS.HOME:
        moveHomeCursor(HOME_COLUMNS);
        break;
      case SECTIONS.SOCIALS:
        if (socialPanelIndex < NUMBER_OF_SOCIAL_LINKS) setSocialPanelIndex(socialPanelIndex + 1);
        break;
      default:
        if (panelRef.current) {
          scroll(1);
        }
        break;
    }
  };

  // start always returns to the home screen
  const onStartPress = () => {
    if (!onHome) goHome();
  };

  // interact ui, opens apps and selects items
  const onAButtonPress = () => {
    switch (panelSet) {
      case SECTIONS.HOME:
        openSection(APPS[homeIndex].section);
        break;
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
  };

  // close the open app; on the home screen B does nothing
  const onBButtonPress = () => {
    if (!onHome) goHome();
  };

  // map keyboard keys to the device buttons
  const handleKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // app tiles and links on the screen itself, not the device's own buttons
    const onScreenControl =
      ['BUTTON', 'A'].includes(event.target.tagName) && event.target.closest('.handheld-screen');
    const keyHandlers = {
      ArrowUp: onUpPress,
      ArrowDown: onDownPress,
      ArrowLeft: onLeftPress,
      ArrowRight: onRightPress,
      Enter: onAButtonPress,
      Escape: onBButtonPress,
      Backspace: onBButtonPress,
      // the A and B keys match the on-screen hints
      a: onAButtonPress,
      b: onBButtonPress,
    };
    // let enter activate a focused on-screen app tile or link natively
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

  const renderVerticalDevice = () => (
    <div className={`handheld flex flex-col shadow-lg ${classes}`}>
      <h1 className="mt-auto w-full">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__screen flex justify-center">
        <Screen
          ref={panelRef}
          panelSet={panelSet}
          homeIndex={homeIndex}
          openApp={openSection}
          socialPanelIndex={socialPanelIndex}
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
          handleSelect={onStartPress}
          handleStart={onStartPress}
          handleA={onAButtonPress}
          handleB={onBButtonPress}
          Screen={
            <Screen
              ref={panelRef}
              panelSet={panelSet}
              homeIndex={homeIndex}
              openApp={openSection}
              socialPanelIndex={socialPanelIndex}
            />
          }
        />
      </div>
    </div>
  );

  useEffect(() => {
    setSections();
  }, [panelSet]);

  // track the window size so rotating a phone or resizing switches layouts
  useEffect(() => {
    const updateSize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
