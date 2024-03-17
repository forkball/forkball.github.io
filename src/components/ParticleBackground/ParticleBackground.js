import React, { useCallback } from 'react';
import Particles from 'react-particles';
import PropTypes from 'prop-types';
import { loadFull } from 'tsparticles';

function ParticleBackground({ classes }) {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="particle-background"
      className={classes}
      init={particlesInit}
      options={{
        background: {
          color: {
            value: '#FDFFFC',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#5EB715',
          },
          links: {
            color: '#5EB715',
            distance: 200,
            enable: true,
            opacity: 0.7,
            width: 2,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'square',
          },
          size: {
            value: { min: 5, max: 10 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

ParticleBackground.propTypes = {
  classes: PropTypes.string,
};

ParticleBackground.defaultProps = {
  classes: '',
};

export default ParticleBackground;
