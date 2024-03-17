import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const BioPanel = forwardRef(({ image }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content flex flex-col h-full w-full overflow-y-auto"
    >
      <div
        id="landing-panel"
        className="handheld-screen__interface__content__heading flex flex-row"
      >
        <div className="flex flex-col mb-4">
          <span className="scroll-anchor mb-4" />
          <h2>NAME/</h2>
          <p id="name">EROS DI PEDE</p>
          <span className="scroll-anchor mb-4" />
          <h2>ROLES/</h2>
          <p>FULLSTACK AND GAME DEVELOPER</p>
        </div>
        <img src={image} alt="me" />
      </div>
      <div className="handheld-screen__interface__content__body flex flex-col">
        <div className="handheld-screen__content__body flex flex-col text-left hyphens">
          <span className="scroll-anchor mb-2" />
          <p>Hey! </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I&apos;m Eros, and I like making physical and digital games, and websites like this one!
          </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I earned a Bachelor of Computer Science from Carleton University (Ottawa, Canada) in
            2021.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I&apos;m currently employed at a Else Labs (an IoT startup) doing fullstack software
            development.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>
            I also like comics, music, film, rock climbing, karate, and of course, playing physical
            and digital games.
          </p>
          <span className="scroll-anchor mb-4" />
          <p>Feel free to connect through my social platforms!</p>
        </div>
      </div>
      <div className="handheld-screen__interface__content__page flex mt-auto">
        <p className="ml-auto">1/2</p>
      </div>
    </div>
  );
});

BioPanel.propTypes = {
  image: PropTypes.string.isRequired,
};

export default BioPanel;
