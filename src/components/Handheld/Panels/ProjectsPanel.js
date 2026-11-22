import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';
import { PROJECTS } from '../../../constants';
import './Panels.scss';

// things I've made: a name, a line about each, and a link that up and down
// select and A or a tap opens
const ProjectsPanel = forwardRef(({ projectIndex, more, goHome }, ref) => {
  // the list is taller than the screen, so keep the selected link in view
  useEffect(() => {
    const panel = ref && ref.current;
    if (!panel) return;
    const selected = panel.querySelector('.project__link.selected');
    if (selected) selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [projectIndex]);

  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content panel-projects flex flex-col h-full w-full overflow-y-auto"
    >
      <div className="handheld-screen__interface__content__body flex flex-col text-left mt-4">
        <h2>PROJECTS/</h2>
        <ol className="flex flex-col gap-4">
          {PROJECTS.map(({ name, blurb, link, linkLabel }, index) => (
            <li key={name} className="project">
              <p className="project__name">{name}</p>
              {blurb && <p className="project__blurb">{blurb}</p>}
              <a
                className={`project__link${projectIndex === index ? ' selected' : ''}`}
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {linkLabel}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <PageBar
        hints={[
          ['A', 'SELECT'],
          ['B', 'BACK'],
        ]}
        blinkHints
        more={more}
        onHome={goHome}
      />
    </div>
  );
});

ProjectsPanel.propTypes = {
  projectIndex: PropTypes.number,
  more: PropTypes.bool,
  goHome: PropTypes.func,
};

ProjectsPanel.defaultProps = {
  projectIndex: 0,
  more: false,
  goHome: () => {},
};

export default ProjectsPanel;
