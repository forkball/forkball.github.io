import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Screen } from '../Components';
import Input from '../Components/Input';
import SettingsContext from '../SettingsContext';
import { APPS, HOME_COLUMNS, SECTIONS } from '../../../constants';
import './Device.scss';

// index of the last selectable entry on the socials page (the email)
const NUMBER_OF_SOCIAL_LINKS = 4;
const MINIMUM_HORIZONTAL_VIEW_HEIGHT = 900;
const MAXIMUM_HORIZONTAL_VIEW_WIDTH = 728;
// screens at least this much wider than tall get the landscape device even
// when they're tall enough for the portrait one, so wide monitors aren't
// mostly empty
const MINIMUM_WIDE_ASPECT_RATIO = 1.6;
const TIPS_STORAGE_KEY = 'handheld-tips';
const BUTTON_SIZE_STORAGE_KEY = 'handheld-buttons';
const HOME_BUTTON_STORAGE_KEY = 'handheld-home-button';
// control hints: blinking, steady, or hidden
const TIP_MODES = ['BLINK', 'ON', 'OFF'];
// AUTO sizes the controls to the screen; LARGE and SMALL scale from there
const BUTTON_SIZES = ['AUTO', 'LARGE', 'SMALL'];
// rows on the settings page, in order
const SETTING_TIPS = 0;
const SETTING_BUTTONS = 1;
const SETTING_HOME_BUTTON = 2;
const NUMBER_OF_SETTINGS = 3;

// settings are remembered per browser; storage can be blocked, in which case
// the defaults return on the next visit
const loadSetting = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
};
const saveSetting = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // storage blocked: keep the setting for this visit only
  }
};
const loadTipMode = () => {
  const mode = loadSetting(TIPS_STORAGE_KEY);
  // 'off' was saved by the earlier on/off switch
  if (mode === 'off') return 'OFF';
  return TIP_MODES.includes(mode) ? mode : TIP_MODES[0];
};
const loadShowHomeButton = () => loadSetting(HOME_BUTTON_STORAGE_KEY) !== 'OFF';
const loadButtonSize = () => {
  const size = loadSetting(BUTTON_SIZE_STORAGE_KEY);
  return BUTTON_SIZES.includes(size) ? size : BUTTON_SIZES[0];
};
function Device({ classes }) {
  const panelRef = useRef(null);

  const [screenSections, setScreenSections] = useState({});
  const [sectionPosition, setSectionPosition] = useState(0);

  const [homeIndex, setHomeIndex] = useState(0);
  const [panelSet, setPanelSet] = useState(SECTIONS.HOME);
  const [socialPanelIndex, setSocialPanelIndex] = useState(0);
  const [tipMode, setTipMode] = useState(loadTipMode);
  const [showHomeButton, setShowHomeButton] = useState(loadShowHomeButton);
  const [buttonSize, setButtonSize] = useState(loadButtonSize);
  const [settingsIndex, setSettingsIndex] = useState(0);
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

  // keep the home cursor on the app being shown
  const pointHomeAt = (section) => {
    const appIndex = APPS.findIndex((app) => app.section === section);
    if (appIndex >= 0) setHomeIndex(appIndex);
  };

  // open an app from the top, as a history entry so the phone's or
  // browser's back button closes it instead of leaving the site. Swapping
  // one app for another replaces that entry, so back still goes home
  const openSection = (section, { replace = false } = {}) => {
    pointHomeAt(section);
    setPanelSet(section);
    setSectionPosition(0);
    if (replace) window.history.replaceState({ section }, '');
    else window.history.pushState({ section }, '');
  };

  // back to the home screen, with the cursor still on the app just closed.
  // Going back through history keeps the back button in step; the
  // popstate listener below then shows the home screen
  const goHome = () => {
    if (window.history.state && window.history.state.section !== undefined) window.history.back();
    else setPanelSet(SECTIONS.HOME);
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
      case SECTIONS.SETTINGS:
        if (settingsIndex > 0) setSettingsIndex(settingsIndex - 1);
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
      case SECTIONS.SETTINGS:
        if (settingsIndex < NUMBER_OF_SETTINGS - 1) setSettingsIndex(settingsIndex + 1);
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

  // select a settings row and step it to its next value
  const changeSetting = (index) => {
    setSettingsIndex(index);
    if (index === SETTING_TIPS) {
      const next = TIP_MODES[(TIP_MODES.indexOf(tipMode) + 1) % TIP_MODES.length];
      setTipMode(next);
      saveSetting(TIPS_STORAGE_KEY, next);
    } else if (index === SETTING_BUTTONS) {
      const next = BUTTON_SIZES[(BUTTON_SIZES.indexOf(buttonSize) + 1) % BUTTON_SIZES.length];
      setButtonSize(next);
      saveSetting(BUTTON_SIZE_STORAGE_KEY, next);
    } else if (index === SETTING_HOME_BUTTON) {
      setShowHomeButton(!showHomeButton);
      saveSetting(HOME_BUTTON_STORAGE_KEY, showHomeButton ? 'OFF' : 'ON');
    }
  };

  const settings = [
    { label: 'TIPS', value: tipMode },
    { label: 'BUTTONS', value: buttonSize },
    { label: 'HOME BUTTON', value: showHomeButton ? 'ON' : 'OFF' },
  ];
  const displaySettings = useMemo(() => ({ tipMode, showHomeButton }), [tipMode, showHomeButton]);

  // start opens settings from anywhere, and closes them back to where you were
  const onStartPress = () => {
    if (panelSet === SECTIONS.SETTINGS) goHome();
    else openSection(SECTIONS.SETTINGS);
  };

  // select flips to the next app, skipping settings; from the home screen
  // it opens the app under the cursor
  const onSelectPress = () => {
    const contentApps = APPS.filter(({ section }) => section !== SECTIONS.SETTINGS);
    const current = contentApps.findIndex(({ section }) => section === panelSet);
    let next;
    if (current >= 0) next = contentApps[(current + 1) % contentApps.length];
    else if (onHome) next = contentApps.find(({ section }) => section === APPS[homeIndex].section);
    next = next || contentApps[0];
    openSection(next.section, { replace: !onHome });
  };

  // interact ui, opens apps and selects items
  const onAButtonPress = () => {
    switch (panelSet) {
      case SECTIONS.HOME:
        openSection(APPS[homeIndex].section);
        break;
      case SECTIONS.SETTINGS:
        changeSetting(settingsIndex);
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

  // the listener reads the handler from a ref updated on every render, so a
  // key pressed right after another (Right then Enter) sees the new state
  // rather than waiting for the listener to be re-attached
  const keyDownRef = useRef(handleKeyDown);
  keyDownRef.current = handleKeyDown;
  useEffect(() => {
    const onKeyDown = (event) => keyDownRef.current(event);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const renderVerticalDevice = () => (
    <div
      className={`handheld handheld--buttons-${buttonSize.toLowerCase()} flex flex-col shadow-lg ${classes}`}
    >
      <h1 className="mt-auto w-full">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__screen flex justify-center">
        <Screen
          ref={panelRef}
          panelSet={panelSet}
          homeIndex={homeIndex}
          openApp={openSection}
          goHome={goHome}
          settings={settings}
          settingsIndex={settingsIndex}
          changeSetting={changeSetting}
          socialPanelIndex={socialPanelIndex}
        />
      </div>
      <div className="handheld__input flex flex-col w-full h-full self-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          handleSelect={onSelectPress}
          handleStart={onStartPress}
          handleA={onAButtonPress}
          handleB={onBButtonPress}
        />
      </div>
    </div>
  );

  const renderHorizontalDevice = () => (
    <div
      className={`handheld handheld--horizontal handheld--buttons-${buttonSize.toLowerCase()} flex flex-col shadow-lg ${classes}`}
    >
      <h1 className="w-full self-center">
        <a href="https://forkball.ca">forkball</a>
      </h1>
      <div className="handheld__input flex flex-col w-full h-full self-center items-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          handleSelect={onSelectPress}
          handleStart={onStartPress}
          handleA={onAButtonPress}
          handleB={onBButtonPress}
          Screen={
            <Screen
              ref={panelRef}
              panelSet={panelSet}
              homeIndex={homeIndex}
              openApp={openSection}
              goHome={goHome}
              settings={settings}
              settingsIndex={settingsIndex}
              changeSetting={changeSetting}
              socialPanelIndex={socialPanelIndex}
            />
          }
        />
      </div>
    </div>
  );

  // every page opens at the top, with its own cursor back on the first item
  useEffect(() => {
    setSections();
    setSocialPanelIndex(0);
    setSettingsIndex(0);
  }, [panelSet]);

  // follow the back and forward buttons between the home screen and apps
  useEffect(() => {
    // the device always starts on the home screen, so forget any app a
    // reload left in this history entry; otherwise going back from the next
    // app would land on that one instead of home
    window.history.replaceState(null, '');
    const onPopState = (event) => {
      const section = event.state ? event.state.section : undefined;
      setPanelSet(section !== undefined ? section : SECTIONS.HOME);
      if (section !== undefined) pointHomeAt(section);
      setSectionPosition(0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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

  const wideScreen = windowWidth >= windowHeight * MINIMUM_WIDE_ASPECT_RATIO;
  // portrait screens (tablets held upright) always get the portrait device;
  // the landscape one would be a short strip with empty space above and below
  const landscape = windowWidth > windowHeight;
  if (
    landscape &&
    windowWidth > MAXIMUM_HORIZONTAL_VIEW_WIDTH &&
    (windowHeight < MINIMUM_HORIZONTAL_VIEW_HEIGHT || wideScreen)
  )
    return (
      <SettingsContext.Provider value={displaySettings}>
        {renderHorizontalDevice()}
      </SettingsContext.Provider>
    );
  return (
    <SettingsContext.Provider value={displaySettings}>
      {renderVerticalDevice()}
    </SettingsContext.Provider>
  );
}

Device.propTypes = {
  classes: PropTypes.string,
};

Device.defaultProps = {
  classes: '',
};

export default Device;
