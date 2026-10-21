export const MAXIMUM_SCREEN_HEIGHT = 480;

// screen sections; HOME is the app grid the device starts on
export const SECTIONS = { HOME: -1, ABOUT: 0, SKILLS: 1, SOCIALS: 2, SETTINGS: 3 };

// apps on the home screen, in grid order
export const APPS = [
  { label: 'ABOUT', section: SECTIONS.ABOUT },
  { label: 'SKILLS', section: SECTIONS.SKILLS },
  { label: 'SOCIALS', section: SECTIONS.SOCIALS },
  { label: 'SETTINGS', section: SECTIONS.SETTINGS },
];

// apps per row on the home screen
export const HOME_COLUMNS = 2;
