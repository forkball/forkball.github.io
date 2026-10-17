import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const HINT_SWAP_MS = 2000;

// bottom bar of a panel: a control hint on the left and the page count on the
// right, flanked by left/right arrows when there are pages to flip between.
// With several hints they take turns, so they don't read as one sentence.
// `more` shows a bobbing down arrow above the bar while there's text below.
function PageBar({ page, pageCount, hints, blinkHints, more }) {
  const hasPages = pageCount > 1;
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    if (hints.length < 2) return undefined;
    const timer = setInterval(() => setHintIndex((index) => index + 1), HINT_SWAP_MS);
    return () => clearInterval(timer);
  }, [hints.length]);

  const hint = hints.length > 0 ? hints[hintIndex % hints.length] : null;
  return (
    <div className="handheld-screen__interface__content__page flex items-center mt-auto">
      {more && <i className="pixel-arrow pixel-arrow--down page-bar__more" aria-hidden="true" />}
      {hint && (
        <p className={`page-hint${blinkHints ? ' page-hint--blink' : ''}`}>
          {hint[0]} {hint[1]}
        </p>
      )}
      <p className="page-bar__count flex items-center ml-auto">
        {hasPages && <i className="pixel-arrow pixel-arrow--left" aria-hidden="true" />}
        {page}/{pageCount}
        {hasPages && (
          <i className="pixel-arrow pixel-arrow--right page-bar__next" aria-hidden="true" />
        )}
      </p>
    </div>
  );
}

PageBar.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
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
