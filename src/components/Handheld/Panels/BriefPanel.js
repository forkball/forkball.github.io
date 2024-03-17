import React, { forwardRef } from 'react';

const BriefPanel = forwardRef((_, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content flex flex-col h-full w-full overflow-y-auto"
    >
      <div className="handheld-screen__interface__content__body flex flex-col text-left">
        <span className="scroll-anchor mb-4" />
        <div className="handheld-screen__interface__content__body__section">
          <h2>LANGUAGES/</h2>
          <ol className="list-disc list-inside">
            <li>JAVASCRIPT</li>
            <li>PYTHON</li>
            <li>JAVA</li>
            <li>C++</li>
            <li>C#</li>
            <li>HASKELL</li>
          </ol>
        </div>
        <span className="scroll-anchor mb-4" />
        <div className="handheld-screen__interface__content__body__section">
          <h2>TOOLS/</h2>
          <ol className="list-disc list-inside">
            <li>REACT.JS</li>
            <li>REACT NATIVE</li>
            <li>NODE.JS</li>
            <li>DOCKER</li>
            <li>CLOUD SERVICES</li>
            <li>MONGODB</li>
            <li>POSTGRESQL</li>
          </ol>
        </div>
        <span className="scroll-anchor mb-4" />
        <div className="handheld-screen__interface__content__body__section">
          <h2>HOBBIES/</h2>
          <ol className="list-disc list-inside">
            <li>ROCK CLIMBING</li>
            <li>PHOTOGRAPHY</li>
            <li>VIDEO GAMES</li>
            <li>MUSIC</li>
            <li>COMICS</li>
            <li>FILM</li>
          </ol>
        </div>
      </div>
      <div className="handheld-screen__interface__content__page flex mt-auto">
        <p className="ml-auto">2/2</p>
      </div>
    </div>
  );
});

export default BriefPanel;
