// Skull — your mat, the face-down stack you build, and the bid you must make good on.
export function SkullMat() {
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Skull — each player holds 3 roses and 1 skull, stacks cards face down, then bids to flip only roses">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">YOUR HAND: 3 ROSES + 1 SKULL</text>

      {/* hand: 3 roses + 1 skull */}
      {[
        { x: 20, c: "var(--card-red)", t: "rose" },
        { x: 70, c: "var(--card-red)", t: "rose" },
        { x: 120, c: "var(--card-red)", t: "rose" },
        { x: 170, c: "var(--ink)", t: "SKULL" },
      ].map((card, i) => (
        <g key={i} transform={`translate(${card.x},34)`}>
          <rect width="44" height="60" rx="6" fill="var(--surface)" stroke={i === 3 ? "var(--ink)" : "var(--border)"} strokeWidth={i === 3 ? 2 : 1} />
          {i === 3
            ? <circle cx="22" cy="26" r="11" fill="none" stroke="var(--ink)" strokeWidth="2" />
            : <circle cx="22" cy="26" r="9" fill={card.c} opacity="0.85" />}
          <text x="22" y="52" fill="var(--ink-soft)" fontSize="8" textAnchor="middle">{card.t}</text>
        </g>
      ))}

      {/* the mat stack (face down) */}
      <text x="250" y="34" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">YOUR MAT</text>
      <g transform="translate(258,42)">
        <rect x="0" y="16" width="60" height="34" rx="6" fill="var(--ink)" />
        <rect x="0" y="8" width="60" height="34" rx="6" fill="var(--accent)" />
        <rect x="0" y="0" width="60" height="34" rx="6" fill="var(--ink)" stroke="var(--border)" />
        <text x="30" y="21" fill="var(--accent-ink)" fontSize="9" textAnchor="middle">face down</text>
      </g>

      {/* bid bar */}
      <rect x="20" y="118" width="340" height="42" rx="8" fill="var(--surface-sunk)" stroke="var(--border)" />
      <text x="34" y="135" fill="var(--ink)" fontSize="11" fontWeight="700">"I'll flip 4 cards"</text>
      <text x="34" y="151" fill="var(--ink-soft)" fontSize="10">Bid the most, then flip that many — your own mat first.</text>

      <text x="20" y="192" fill="var(--ink)" fontSize="10.5" fontWeight="600">Flip only roses → win the bet.</text>
      <text x="20" y="207" fill="var(--ink-soft)" fontSize="10.5">Reveal a skull → you fail and lose a card. Win two bets to win.</text>
    </svg>
  );
}
