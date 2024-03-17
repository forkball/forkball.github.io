import React from 'react';
import { Device } from '../../components';
import './LandingPage.scss';

function LandingPage() {
  return (
    <div className="landing flex flex-col justify-center items-center py-0 desktop:py-2">
      <Device classes="z-10" />
    </div>
  );
}

export default LandingPage;
