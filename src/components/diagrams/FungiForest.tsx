// Fungi — the Forest row of 8 cards: the 2 in front of your shoes are free,
// the deep forest costs sticks, and a card decays each turn.
export function FungiForest() {
  const forest = [
    { free: true }, { free: true },
    { cost: 1 }, { cost: 2 }, { cost: 3 }, { cost: 4 }, { cost: 5 }, { cost: 6 },
  ];
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Fungi — forage from a row of 8 forest cards; the nearest 2 are free, deeper ones cost sticks">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">THE FOREST — 8 CARDS</text>

      {/* decay pile */}
      <g transform="translate(12,40)">
        <rect x="3" y="3" width="26" height="62" rx="5" fill="var(--surface-sunk)" stroke="var(--border)" />
        <rect width="26" height="62" rx="5" fill="var(--surface-sunk)" stroke="var(--border)" strokeDasharray="3 3" />
        <text x="14" y="80" fill="var(--ink-soft)" fontSize="7.5" textAnchor="middle">decay</text>
      </g>

      {/* forest row */}
      {forest.map((c, i) => (
        <g key={i} transform={`translate(${48 + i * 39},40)`}>
          <rect width="34" height="62" rx="5" fill="var(--surface)" stroke={c.free ? "var(--accent)" : "var(--border)"} strokeWidth={c.free ? 2 : 1} />
          <circle cx="17" cy="22" r="8" fill={["var(--card-red)", "var(--card-yellow)", "var(--card-green)", "var(--card-blue)"][i % 4]} opacity="0.8" />
          {c.free
            ? <text x="17" y="50" fill="var(--accent)" fontSize="8" fontWeight="700" textAnchor="middle">free</text>
            : <text x="17" y="50" fill="var(--ink-soft)" fontSize="9" fontWeight="700" textAnchor="middle">{c.cost}</text>}
        </g>
      ))}

      {/* shoes marker under the free two */}
      <rect x="48" y="106" width="73" height="9" rx="4" fill="var(--ink)" />
      <text x="84" y="128" fill="var(--ink)" fontSize="9" fontWeight="600" textAnchor="middle">your shoes (free)</text>
      <text x="290" y="128" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">deep forest = sticks</text>

      {/* pan */}
      <g transform="translate(300,150)">
        <ellipse cx="22" cy="14" rx="22" ry="11" fill="var(--surface-sunk)" stroke="var(--ink-soft)" />
        <rect x="42" y="11" width="22" height="6" rx="3" fill="var(--ink-soft)" />
        <text x="22" y="40" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">your pan</text>
      </g>

      <text x="20" y="166" fill="var(--ink)" fontSize="10.5" fontWeight="600">Forage matching mushrooms,</text>
      <text x="20" y="181" fill="var(--ink-soft)" fontSize="10.5">then cook 3+ of a kind in a pan for Flavor points.</text>
      <text x="20" y="200" fill="var(--ink-soft)" fontSize="10.5">A card decays off the near end each turn — grab it before it's gone.</text>
    </svg>
  );
}
