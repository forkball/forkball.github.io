import { createContext } from 'react';

// display settings the panels read, set in SETTINGS: how control hints show
// ('BLINK', 'ON' (steady) or 'OFF') and whether the tappable HOME button shows
const SettingsContext = createContext({ tipMode: 'BLINK', showHomeButton: true });

export default SettingsContext;
