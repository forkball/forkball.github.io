import { createContext } from 'react';

// how the page bars show control hints, set in SETTINGS: 'BLINK', 'ON'
// (steady) or 'OFF'
const TipsContext = createContext('BLINK');

export default TipsContext;
