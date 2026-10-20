import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PageBar from './PageBar';
import './Panels.scss';

// the address is only put together when tapped, so the full address never
// appears in the page or the bundle for scrapers to pick up
const openEmail = (event) => {
  event.preventDefault();
  window.location.href = `mailto:${['erosdipede', 'gmail.com'].join('@')}`;
};

const SocialPanel = forwardRef(({ socialPanelIndex }, ref) => {
  return (
    <div
      ref={ref}
      className="handheld-screen__interface__content panel-social flex flex-col h-full w-full overflow-y-auto"
    >
      <div className="handheld-screen__interface__content__body flex flex-col text-left flex-1 mt-4">
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <h2>GITHUB/</h2>
            <a
              className={`${socialPanelIndex === 0 && 'selected'} `}
              href="https://github.com/forkball"
              target="_blank"
              rel="noreferrer"
            >
              FORKBALL
            </a>
          </div>
          <div>
            <h2>LINKEDIN/</h2>
            <a
              className={`${socialPanelIndex === 1 && 'selected'} `}
              href="https://www.linkedin.com/in/erosdipede/"
              target="_blank"
              rel="noreferrer"
            >
              EROS DI PEDE
            </a>
          </div>
          <div>
            <h2 className="break-all">BLUESKY/</h2>
            <a
              className={`${socialPanelIndex === 2 && 'selected'} `}
              href="https://bsky.app/profile/forkball.ca"
              target="_blank"
              rel="noreferrer"
            >
              FORKBALL
            </a>
          </div>
          <div>
            <h2>TWITTER/</h2>
            <a
              className={`${socialPanelIndex === 3 && 'selected'} `}
              href="https://twitter.com/forkball_vg"
              target="_blank"
              rel="noreferrer"
            >
              FORKBALL_VG
            </a>
          </div>
          <div>
            <h2>EMAIL/</h2>
            <a
              id="cheeky-email"
              className={`${socialPanelIndex === 4 && 'selected'} `}
              href="mailto:"
              onClick={openEmail}
            >
              EROSDIPEDE [AT] GMAIL [DOT] COM
            </a>
          </div>
        </div>
      </div>
      <PageBar hints={[['A', 'OPEN']]} blinkHints />
    </div>
  );
});

SocialPanel.propTypes = {
  socialPanelIndex: PropTypes.number,
};

SocialPanel.defaultProps = {
  socialPanelIndex: 0,
};

export default SocialPanel;
