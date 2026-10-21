import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TipsContext from '../TipsContext';

const HINT_SWAP_MS = 2000;
// blinking hints change every this many blinks
const BLINKS_PER_HINT = 2;
// the blink hides the hint for the second half of each cycle; swapping in
// the middle of that half means a change is never seen
const HIDDEN_MIDPOINT = 0.75;

// an element's CSS animation duration in milliseconds
const animationDurationMs = (style) => {
  const duration = style.animationDuration;
  return duration.endsWith('ms') ? parseFloat(duration) : parseFloat(duration) * 1000;
};

// bottom bar of a panel, showing a control hint. With several hints they take
// turns, so they don't read as one sentence; blinking ones change only while
// hidden. `more` floats a bobbing down arrow just above the bar while there's
// text below. `onHome` adds a tappable HOME button on the right for touch,
// while the hints guide people using the device's buttons, unless turned off
// in SETTINGS.
function PageBar({ hints, blinkHints, more, onHome }) {
  const tipMode = useContext(TipsContext);
  // the TIPS setting can hold the blink still
  const blinking = blinkHints && tipMode === 'BLINK';
  const [hintIndex, setHintIndex] = useState(0);
  const hintRef = useRef(null);

  useEffect(() => {
    const element = hintRef.current;
    if (hints.length < 2 || !element) return undefined;
    const nextHint = () => setHintIndex((index) => index + 1);
    const style = window.getComputedStyle(element);
    // no blink (or reduced motion turned it off): swap on a timer
    if (!blinking || style.animationName === 'none') {
      const timer = setInterval(nextHint, HINT_SWAP_MS);
      return () => clearInterval(timer);
    }
    // blinking: follow the animation, swapping while the hint is hidden
    const swapDelay = animationDurationMs(style) * HIDDEN_MIDPOINT;
    let blinks = 0;
    let timeout;
    const onIteration = () => {
      blinks += 1;
      if (blinks % BLINKS_PER_HINT === 0) timeout = setTimeout(nextHint, swapDelay);
    };
    element.addEventListener('animationiteration', onIteration);
    return () => {
      element.removeEventListener('animationiteration', onIteration);
      clearTimeout(timeout);
    };
  }, [hints.length, blinking]);

  const hint = tipMode !== 'OFF' && hints.length > 0 ? hints[hintIndex % hints.length] : null;
  return (
    <div className="handheld-screen__interface__content__page flex items-center mt-auto">
      {more && (
        <span className="page-bar__more" aria-hidden="true">
          <i className="pixel-arrow pixel-arrow--down" />
        </span>
      )}
      {/* a non-breaking space keeps the bar at full height with no hint */}
      <p ref={hintRef} className={`page-hint${blinking ? ' page-hint--blink' : ''}`}>
        {hint ? `${hint[0]} ${hint[1]}` : '\u00a0'}
      </p>
      {onHome && (
        <button type="button" className="page-bar__home" onClick={onHome}>
          <i className="pixel-arrow pixel-arrow--left" aria-hidden="true" />
          HOME
        </button>
      )}
    </div>
  );
}

PageBar.propTypes = {
  // [button, action] pairs, e.g. [['A', 'SELECT']]
  hints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  blinkHints: PropTypes.bool,
  more: PropTypes.bool,
  onHome: PropTypes.func,
};

PageBar.defaultProps = {
  hints: [],
  blinkHints: false,
  more: false,
  onHome: undefined,
};

export default PageBar;
