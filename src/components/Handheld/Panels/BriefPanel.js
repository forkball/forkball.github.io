import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';

const BriefPanel = forwardRef(({ more, goHome }, ref) => {
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
            <li>RUBY</li>
            <li>TYPESCRIPT</li>
            <li>SQL</li>
            <li>JAVASCRIPT</li>
            <li>PYTHON</li>
            <li>JAVA</li>
            <li>C++</li>
          </ol>
        </div>
        <span className="scroll-anchor mb-4" />
        <div className="handheld-screen__interface__content__body__section">
          <h2>TOOLS/</h2>
          <ol className="list-disc list-inside">
            <li>RUBY ON RAILS</li>
            <li>GRAPHQL</li>
            <li>GRAFANA</li>
            <li>SUPABASE</li>
            <li>REACT.JS</li>
            <li>REACT NATIVE</li>
            <li>NODE.JS</li>
            <li>DOCKER</li>
            <li>CLOUD SERVICES</li>
            <li>POSTGRESQL</li>
          </ol>
        </div>
        <span className="scroll-anchor mb-4" />
        <div className="handheld-screen__interface__content__body__section">
          <h2>HOBBIES/</h2>
          <ol className="list-disc list-inside">
            <li>GUITAR</li>
            <li>PHOTOGRAPHY</li>
            <li>VIDEO GAMES</li>
            <li>MUSIC</li>
            <li>COMICS</li>
            <li>FILM</li>
          </ol>
        </div>
      </div>
      <PageBar hints={[['B', 'BACK']]} blinkHints more={more} onHome={goHome} />
    </div>
  );
});

BriefPanel.propTypes = {
  more: PropTypes.bool,
  goHome: PropTypes.func,
};

BriefPanel.defaultProps = {
  more: false,
  goHome: () => {},
};

export default BriefPanel;
