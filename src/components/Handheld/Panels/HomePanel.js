import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';
import { APPS } from '../../../constants';

// 12x12 pixel-art icons, one string per row, '#' for a filled pixel
const ICONS = {
  ABOUT: [
    '...######...',
    '..########..',
    '..#......#..',
    '..#.#..#.#..',
    '..#......#..',
    '..#..##..#..',
    '...#....#...',
    '....####....',
    '..########..',
    '.##########.',
    '############',
    '############',
  ],
  SKILLS: [
    '............',
    '............',
    '.......#....',
    '...#...##...',
    '..#...#..#..',
    '.#....#...#.',
    '#....#.....#',
    '.#...#....#.',
    '..#.#....#..',
    '...##...#...',
    '............',
    '............',
  ],
  // three sliders
  SETTINGS: [
    '...##.......',
    '...##.......',
    '############',
    '...##.......',
    '........##..',
    '........##..',
    '############',
    '........##..',
    '.....##.....',
    '.....##.....',
    '############',
    '.....##.....',
  ],
  SOCIALS: [
    '............',
    '.##########.',
    '#..........#',
    '#.#......#.#',
    '#..#....#..#',
    '#...#..#...#',
    '#....##....#',
    '#..........#',
    '#..........#',
    '.##########.',
    '............',
    '............',
  ],
};

function PixelIcon({ rows }) {
  return (
    <svg
      className="app-tile__icon"
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        row.split('').map((pixel, x) =>
          pixel === '#' ? (
            // eslint-disable-next-line react/no-array-index-key
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  );
}

PixelIcon.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// home screen: a grid of apps, one per section, opened with A or a tap
const HomePanel = forwardRef(({ homeIndex, openApp }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content panel-home flex flex-col h-full w-full overflow-y-auto"
    >
      <ol className="panel-home__grid">
        {APPS.map(({ label, section }, index) => (
          <li key={label}>
            <button
              type="button"
              className={`app-tile${homeIndex === index ? ' app-tile--selected' : ''}`}
              onClick={() => openApp(section)}
            >
              <span className="app-tile__frame">
                <PixelIcon rows={ICONS[label]} />
              </span>
              <span className="app-tile__label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
      <PageBar hints={[['A', 'SELECT']]} blinkHints />
    </div>
  );
});

HomePanel.propTypes = {
  homeIndex: PropTypes.number,
  openApp: PropTypes.func,
};

HomePanel.defaultProps = {
  homeIndex: 0,
  openApp: () => {},
};

export default HomePanel;
