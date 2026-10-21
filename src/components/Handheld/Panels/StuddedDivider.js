import React from 'react';

const NUMBER_OF_STUDS = 8;
// evenly spaced, each centred in its own equal slice of the rule
const STUD_POSITIONS = Array.from(
  { length: NUMBER_OF_STUDS },
  (_, index) => ((index + 0.5) * 100) / NUMBER_OF_STUDS,
);

// Pokédex-style divider: a thick rule with square studs along it
function StuddedDivider() {
  return (
    <div className="studded-divider" aria-hidden="true">
      {STUD_POSITIONS.map((percent) => (
        <i key={percent} style={{ left: `${percent}%` }} />
      ))}
    </div>
  );
}

export default StuddedDivider;
