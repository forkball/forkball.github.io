import React from 'react';

const STUD_POSITIONS = [6, 18, 30, 42, 58, 70, 82, 94];

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
