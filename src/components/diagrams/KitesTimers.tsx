// Kites — the six sand timers you race against, and how a card flips one.
// Colours come from the --card-* / timer tokens; never raw values.
export function KitesTimers() {
  const timers = [
    { x: 24, label: "RED", secs: "30s", fill: "var(--card-red)" },
    { x: 80, label: "ORG", secs: "45s", fill: "var(--card-orange)" },
    { x: 136, label: "YEL", secs: "60s", fill: "var(--card-yellow)" },
    { x: 192, label: "BLU", secs: "75s", fill: "var(--card-blue)" },
    { x: 248, label: "PUR", secs: "90s", fill: "var(--card-purple)" },
    { x: 304, label: "WHT", secs: "60s", fill: "var(--ink-soft)" },
  ];
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Kites — six sand timers; play a card to flip the matching timer before it empties">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">THE SIX TIMERS</text>
      {timers.map((t) => (
        <g key={t.label} transform={`translate(${t.x},34)`}>
          {/* hourglass */}
          <path d="M 4 4 L 44 4 L 28 30 L 44 56 L 4 56 L 20 30 Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          {/* sand (top bulb) */}
          <path d="M 9 9 L 39 9 L 26 27 L 22 27 Z" fill={t.fill} opacity="0.9" />
          <text x="24" y="78" fill="var(--ink)" fontSize="10" fontWeight="700" textAnchor="middle">{t.secs}</text>
          <text x="24" y="91" fill="var(--ink-soft)" fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="0.5">{t.label}</text>
        </g>
      ))}
      <text x="304" y="34" fill="var(--accent)" fontSize="8" fontWeight="700" textAnchor="middle">WILD</text>

      {/* A kite card flipping a timer */}
      <g transform="translate(20,120)">
        <rect width="60" height="80" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="60" height="16" rx="6" fill="var(--card-blue)" />
        <rect y="8" width="60" height="8" fill="var(--card-blue)" />
        <path d="M 30 30 l 14 14 l -14 14 l -14 -14 Z" fill="var(--card-blue)" opacity="0.85" />
        <text x="30" y="74" fill="var(--ink-soft)" fontSize="8" textAnchor="middle">kite card</text>
      </g>
      <path d="M 92 160 L 188 160" stroke="var(--ink-soft)" strokeWidth="1.5" fill="none" />
      <path d="M 188 160 l -7 -4 l 0 8 Z" fill="var(--ink-soft)" />
      <text x="140" y="152" fill="var(--ink)" fontSize="10" fontWeight="600" textAnchor="middle">flip its timer</text>

      <text x="200" y="150" fill="var(--ink)" fontSize="10.5" fontWeight="600">Play a card →</text>
      <text x="200" y="165" fill="var(--ink-soft)" fontSize="10.5">flip the matching colour timer</text>
      <text x="200" y="180" fill="var(--ink-soft)" fontSize="10.5">(or the white wild timer).</text>
      <text x="200" y="198" fill="var(--ink)" fontSize="10.5" fontWeight="600">Never let one run out.</text>
    </svg>
  );
}
