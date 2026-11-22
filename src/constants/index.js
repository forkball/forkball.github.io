export const MAXIMUM_SCREEN_HEIGHT = 480;

// screen sections; HOME is the app grid the device starts on
export const SECTIONS = { HOME: -1, ABOUT: 0, SKILLS: 1, SOCIALS: 2, SETTINGS: 3, PROJECTS: 4 };

// apps on the home screen, in grid order
export const APPS = [
  { label: 'ABOUT', section: SECTIONS.ABOUT },
  { label: 'SKILLS', section: SECTIONS.SKILLS },
  { label: 'PROJECTS', section: SECTIONS.PROJECTS },
  { label: 'SOCIALS', section: SECTIONS.SOCIALS },
  { label: 'SETTINGS', section: SECTIONS.SETTINGS },
];

// apps per row on the home screen
export const HOME_COLUMNS = 2;

// entries on the projects page, newest first; `link` is where A or a tap
// goes, `linkLabel` the text shown for it
export const PROJECTS = [
  {
    name: 'ON DECK',
    blurb: 'A smart movie recommendation app.',
    link: 'https://on-deck-ten.vercel.app',
    linkLabel: 'VISIT',
  },
  {
    name: 'DRAFT PARTY',
    link: 'https://draft-party-topaz.vercel.app',
    linkLabel: 'VISIT',
  },
  {
    name: 'DARK ISLE',
    link: 'https://dark-isle.vercel.app',
    linkLabel: 'VISIT',
  },
  {
    name: 'MALONE THE CHEMIST',
    link: 'https://malone-the-chemist.vercel.app',
    linkLabel: 'VISIT',
  },
  {
    name: 'FORKBALL.CA',
    blurb: 'This site! A handheld you can browse with the D-pad.',
    link: 'https://github.com/forkball/forkball.github.io',
    linkLabel: 'SOURCE',
  },
  {
    name: 'FACT BOY',
    blurb: 'Your friendly neighbourhood Fact Boy, with facts on any topic you could imagine.',
    link: 'https://github.com/forkball/Fact-Boy',
    linkLabel: 'SOURCE',
  },
  {
    name: 'TOWER DEFENSE',
    blurb: "A medieval tower defense where you conquer your opponent's castle.",
    link: 'https://github.com/forkball/COMP2501-FinalProject',
    linkLabel: 'SOURCE',
  },
];
