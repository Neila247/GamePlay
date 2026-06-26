// Jaipur — the 5-card market between the players, the deck, and goods tokens.
export function JaipurMarket() {
  const market = [
    { label: "camel", fill: "var(--card-yellow)" },
    { label: "camel", fill: "var(--card-yellow)" },
    { label: "camel", fill: "var(--card-yellow)" },
    { label: "good", fill: "var(--card-red)" },
    { label: "good", fill: "var(--card-blue)" },
  ];
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Jaipur — a five-card market between two players, with the deck and goods-token stacks">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">THE MARKET — 5 CARDS</text>

      {/* deck */}
      <g transform="translate(20,40)">
        <rect x="4" y="4" width="44" height="62" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="44" height="62" rx="6" fill="var(--ink)" />
        <text x="22" y="80" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">deck</text>
      </g>

      {/* market row */}
      {market.map((c, i) => (
        <g key={i} transform={`translate(${84 + i * 56},40)`}>
          <rect width="48" height="62" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <rect width="48" height="13" rx="6" fill={c.fill} />
          <rect y="7" width="48" height="6" fill={c.fill} />
          <text x="24" y="40" fill="var(--ink)" fontSize="9" fontWeight="600" textAnchor="middle">{c.label}</text>
        </g>
      ))}

      {/* goods token stacks */}
      <text x="20" y="140" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">GOODS TOKENS (sell for rupees)</text>
      {[
        { x: 20, v: "7 5 5", c: "var(--card-red)" },
        { x: 92, v: "6 6 5", c: "var(--card-blue)" },
        { x: 164, v: "5 3 3", c: "var(--card-green)" },
        { x: 236, v: "5 1 1", c: "var(--card-yellow)" },
      ].map((s) => (
        <g key={s.x} transform={`translate(${s.x},150)`}>
          <rect width="60" height="22" rx="11" fill="var(--surface-sunk)" stroke="var(--border)" />
          <circle cx="14" cy="11" r="6" fill={s.c} />
          <text x="40" y="15" fill="var(--ink)" fontSize="9" textAnchor="middle">{s.v}</text>
        </g>
      ))}

      <text x="20" y="206" fill="var(--ink)" fontSize="10.5" fontWeight="600">Take goods, take all camels, or sell a set —</text>
      <text x="20" y="221" fill="var(--ink-soft)" fontSize="10.5">one action per turn. Highest tokens sell first; 3+ in a sale earns a bonus.</text>
    </svg>
  );
}
