import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const HINT_SWAP_MS = 2000;

// bottom bar of a panel, showing a control hint. With several hints they take
// turns, so they don't read as one sentence. `more` floats a bobbing down
// arrow just above the bar while there's text below.
function PageBar({ hints, blinkHints, more }) {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    if (hints.length < 2) return undefined;
    const timer = setInterval(() => setHintIndex((index) => index + 1), HINT_SWAP_MS);
    return () => clearInterval(timer);
  }, [hints.length]);

  const hint = hints.length > 0 ? hints[hintIndex % hints.length] : null;
  return (
    <div className="handheld-screen__interface__content__page flex items-center mt-auto">
      {more && (
        <span className="page-bar__more" aria-hidden="true">
          <i className="pixel-arrow pixel-arrow--down" />
        </span>
      )}
      {/* a non-breaking space keeps the bar at full height with no hint */}
      <p className={`page-hint${blinkHints ? ' page-hint--blink' : ''}`}>
        {hint ? `${hint[0]} ${hint[1]}` : '\u00a0'}
      </p>
    </div>
  );
}

PageBar.propTypes = {
  // [button, action] pairs, e.g. [['A', 'OPEN'], ['B', 'BACK']]
  hints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  blinkHints: PropTypes.bool,
  more: PropTypes.bool,
};

PageBar.defaultProps = {
  hints: [],
  blinkHints: false,
  more: false,
};

export default PageBar;
