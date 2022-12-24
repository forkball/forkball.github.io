import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Screen } from '../Components';
import Input from '../Components/Input';
import './Device.scss';

const NUMBER_OF_PANELS = 1;
const MINIMUM_HORIZONTAL_VIEW_HEIGHT = 900;
const MAXIMUM_HORIZONTAL_VIEW_WIDTH = 728;
function Device({ classes }) {
  const panelRef = useRef(null);

  const [panel, setPanel] = useState(0);
  const [panelScrollDir, setPanelScrollDir] = useState('DOWN');
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const scrollSpeed = 25;
  const scrollStep = 25;
  const scrollBoundaryThreshold = 50;

  const scroll = (direction, speed, distance, step) => {
    let scrollAmount = 0;
    const { scrollTop, offsetHeight, scrollHeight } = panelRef.current;
    const slideTimer = setInterval(() => {
      panelRef.current.scrollTop += step * direction;
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
        // change scroll direction text
        const scrollPosition = Math.max(0, scrollHeight - (offsetHeight + scrollTop + distance));
        if (scrollPosition < scrollBoundaryThreshold) {
          if (direction === 1) setPanelScrollDir('UP');
          else setPanelScrollDir('DOWN');
        }
      }
    }, speed);
  };

  const onLeftPress = () => {
    setPanelScrollDir('DOWN');
    if (panel > 0) setPanel(panel - 1);
    else setPanel(NUMBER_OF_PANELS);
  };

  const onRightPress = () => {
    setPanelScrollDir('DOWN');
    if (panel < NUMBER_OF_PANELS) setPanel(panel + 1);
    else setPanel(0);
  };

  const onUpPress = () => {
    if (panelRef.current) {
      const scrollDistance = panelRef.current.scrollHeight * 0.33;
      scroll(-1, scrollSpeed, scrollDistance, scrollStep);
    }
  };

  const onDownPress = () => {
    if (panelRef.current) {
      const scrollDistance = panelRef.current.scrollHeight * 0.33;
      scroll(1, scrollSpeed, scrollDistance, scrollStep);
    }
  };

  const renderVerticalDevice = () => (
    <div className={`handheld flex flex-col shadow-lg ${classes}`}>
      <div className="handheld__screen flex justify-center">
        <Screen ref={panelRef} panel={panel} scrollDirection={panelScrollDir} />
      </div>
      <div className="handheld__input flex flex-col w-full h-full self-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
        />
        {/* <h1 className="mt-auto">forkball.games</h1> */}
      </div>
    </div>
  );

  const renderHorizontalDevice = () => (
    <div className={`handheld handheld--horizontal flex flex-col shadow-lg ${classes}`}>
      <div className="handheld__input flex flex-col w-full h-full self-center items-center">
        <Input
          handleLeft={onLeftPress}
          handleRight={onRightPress}
          handleDown={onDownPress}
          handleUp={onUpPress}
          Screen={<Screen ref={panelRef} panel={panel} scrollDirection={panelScrollDir} />}
        />
        {/* <h1 className="mt-auto w-full">forkball.games</h1> */}
      </div>
    </div>
  );

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
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
