// Cabo — your 2×2 square of face-down cards, plus the stockpile and discard.
export function CaboLayout() {
  return (
    <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Cabo — a 2 by 2 square of face-down cards in front of you, with a stockpile and discard pile">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">YOUR SQUARE — 4 CARDS, FACE DOWN</text>

      {/* 2x2 grid; two nearest peeked */}
      {[
        { x: 30, y: 40, peek: false },
        { x: 92, y: 40, peek: false },
        { x: 30, y: 110, peek: true },
        { x: 92, y: 110, peek: true },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          <rect width="52" height="60" rx="6" fill={c.peek ? "var(--surface)" : "var(--ink)"} stroke={c.peek ? "var(--accent)" : "var(--border)"} strokeWidth={c.peek ? 2 : 1} />
          {c.peek
            ? <text x="26" y="36" fill="var(--ink)" fontSize="16" fontWeight="700" textAnchor="middle">?</text>
            : <path d="M 14 14 l 24 32 M 14 46 l 24 -32" stroke="var(--ink-soft)" strokeWidth="1" opacity="0.5" />}
        </g>
      ))}
      <text x="78" y="190" fill="var(--accent)" fontSize="9" fontWeight="600" textAnchor="middle">peek these two at the start</text>

      {/* stockpile + discard */}
      <text x="210" y="56" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">DRAW</text>
      <g transform="translate(210,62)">
        <rect x="4" y="4" width="48" height="64" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="48" height="64" rx="6" fill="var(--ink)" />
      </g>
      <text x="290" y="56" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">DISCARD</text>
      <g transform="translate(290,62)">
        <rect width="48" height="64" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <text x="24" y="38" fill="var(--ink)" fontSize="16" fontWeight="700" textAnchor="middle">7</text>
      </g>

      <text x="210" y="154" fill="var(--ink)" fontSize="10.5" fontWeight="600">Lowest total wins.</text>
      <text x="210" y="170" fill="var(--ink-soft)" fontSize="10">Swap high cards for low,</text>
      <text x="210" y="183" fill="var(--ink-soft)" fontSize="10">or pair to remove them.</text>
      <text x="210" y="196" fill="var(--ink-soft)" fontSize="10">Then call "Cabo".</text>
    </svg>
  );
}
