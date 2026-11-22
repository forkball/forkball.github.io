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
    name: 'HIGHLIGHTERS',
    blurb: 'A cosmic match-4 puzzle action game.',
    link: 'https://store.steampowered.com/app/2282080/Highlighters_Cosmic_Puzzle_Action/',
    linkLabel: 'STEAM',
  },
  {
    name: 'ON DECK',
    blurb: 'A smart movie recommendation app.',
    link: 'https://on-deck-ten.vercel.app',
    linkLabel: 'VISIT',
  },
  {
    name: 'DRAFT PARTY',
    blurb: 'Draft a music festival lineup with friends in a live auction.',
    link: 'https://draft-party-topaz.vercel.app',
    linkLabel: 'VISIT',
  },
];
