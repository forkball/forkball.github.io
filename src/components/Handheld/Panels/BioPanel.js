import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';
import StuddedDivider from './StuddedDivider';

const BioPanel = forwardRef(({ image, showHint, more }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content flex flex-col h-full w-full overflow-y-auto"
    >
      <span className="scroll-anchor" />
      {/* laid out like a Pokédex entry: sprite, then name, title and stats */}
      <div id="landing-panel" className="dex-entry">
        <div className="dex-entry__portrait">
          <img src={image} alt="me" />
        </div>
        <div className="dex-entry__info">
          {/* keep the surname together when the name wraps */}
          <p id="name">EROS DI&nbsp;PEDE</p>
          <p>SOFTWARE ENGINEER</p>
          <p className="dex-entry__stat">
            <span>CO.</span>
            <span>SHOPIFY</span>
          </p>
          <p className="dex-entry__stat">
            <span>SINCE</span>
            <span>2024</span>
          </p>
        </div>
      </div>
      <StuddedDivider />
      <div className="handheld-screen__interface__content__body flex flex-col">
        <div className="handheld-screen__content__body flex flex-col text-left hyphens">
          <span className="scroll-anchor mb-2" />
          <p>Hey! </p>
          <p>
            I&apos;m Eros, and I like making physical and digital games, and websites like this one!
          </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I earned a Bachelor of Computer Science from Carleton University (Ottawa, Canada) in
            2021.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>I was previously at Else Labs (an IoT startup), doing fullstack development.</p>
          <span className="scroll-anchor mb-4" />
          <p>
            I&apos;ve been at Shopify since 2024, doing fullstack development on payment methods.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I also play guitar, and like comics, music, film, and of course, playing physical and
            digital games.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>Feel free to connect through my social platforms!</p>
        </div>
      </div>
      <PageBar hints={showHint ? [['PRESS', 'START']] : []} blinkHints={showHint} more={more} />
    </div>
  );
});

BioPanel.propTypes = {
  image: PropTypes.string.isRequired,
  showHint: PropTypes.bool,
  more: PropTypes.bool,
};

BioPanel.defaultProps = {
  showHint: false,
  more: false,
};

export default BioPanel;
