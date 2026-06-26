// Monopoly Deal — your tableau: hand, Bank, and the property sets that win the game.
export function MonopolyDealLayout() {
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Monopoly Deal — collect three complete property sets of different colours in front of you to win">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">3 FULL SETS, DIFFERENT COLOURS = WIN</text>

      {/* property sets */}
      {[
        { x: 20, c: "var(--card-red)", done: true },
        { x: 130, c: "var(--card-blue)", done: true },
        { x: 240, c: "var(--card-green)", done: false },
      ].map((set, si) => (
        <g key={si} transform={`translate(${set.x},36)`}>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={i * 18} y={0} width="40" height="56" rx="5"
              fill="var(--surface)" stroke="var(--border)" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={`h${i}`} x={i * 18} y={0} width="40" height="12" rx="5" fill={set.c} opacity={set.done || i < 2 ? 1 : 0.3} />
          ))}
          <text x="38" y="74" fill={set.done ? "var(--ink)" : "var(--ink-soft)"} fontSize="9" fontWeight={set.done ? 700 : 400} textAnchor="middle">
            {set.done ? "✓ full set" : "needs 1"}
          </text>
        </g>
      ))}

      {/* bank + hand */}
      <text x="20" y="138" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">BANK (pay rent from here)</text>
      <g transform="translate(20,146)">
        <rect x="6" y="4" width="48" height="34" rx="6" fill="var(--surface-sunk)" stroke="var(--border)" />
        <rect width="48" height="34" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <text x="24" y="23" fill="var(--ink)" fontSize="12" fontWeight="700" textAnchor="middle">$</text>
      </g>
      <text x="200" y="138" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">HAND (play up to 3)</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={200 + i * 24} y={146} width="36" height="38" rx="6" fill="var(--ink)" stroke="var(--border)" />
      ))}

      <text x="20" y="212" fill="var(--ink)" fontSize="10.5" fontWeight="600">Each turn: draw 2, play up to 3.</text>
      <text x="20" y="226" fill="var(--ink-soft)" fontSize="10.5">Bank money, lay properties, or play actions to charge rent and steal.</text>
    </svg>
  );
}
