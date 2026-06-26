// The Mind — the shared ascending stack, plus the team's lives and stars.
export function TheMindStack() {
  return (
    <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="The Mind — play number cards onto one shared stack in ascending order, using only timing">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">ONE SHARED STACK — ASCENDING</text>

      {/* Ascending stack 17 -> 28 -> 55 */}
      {[
        { x: 30, n: "17", y: 92 },
        { x: 92, n: "28", y: 74 },
        { x: 154, n: "55", y: 56 },
      ].map((c) => (
        <g key={c.n} transform={`translate(${c.x},${c.y})`}>
          <rect width="54" height="74" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="27" y="44" fill="var(--ink)" fontSize="22" fontWeight="700" textAnchor="middle">{c.n}</text>
        </g>
      ))}
      <path d="M 220 90 L 250 90" stroke="var(--ink-soft)" strokeWidth="1.5" fill="none" />
      <path d="M 250 90 l -7 -4 l 0 8 Z" fill="var(--ink-soft)" />
      <text x="270" y="78" fill="var(--ink)" fontSize="11" fontWeight="600">lowest</text>
      <text x="270" y="93" fill="var(--ink)" fontSize="11" fontWeight="600">first,</text>
      <text x="270" y="108" fill="var(--ink-soft)" fontSize="11">then up.</text>

      {/* Lives and stars */}
      <text x="20" y="170" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">LIVES</text>
      {[0, 1, 2].map((i) => (
        <path key={i} transform={`translate(${64 + i * 26},162)`}
          d="M 8 14 C 8 14 0 8 0 4 a 4 4 0 0 1 8 -1 a 4 4 0 0 1 8 1 c 0 4 -8 10 -8 10 Z"
          fill="var(--card-red)" />
      ))}
      <text x="160" y="170" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">STARS</text>
      <g transform="translate(206,160)">
        <path d="M 9 0 L 11.6 6 L 18 6.5 L 13 10.8 L 14.6 17 L 9 13.5 L 3.4 17 L 5 10.8 L 0 6.5 L 6.4 6 Z" fill="var(--accent)" />
      </g>

      <text x="20" y="208" fill="var(--ink)" fontSize="10.5" fontWeight="600">No turns. No talking.</text>
      <text x="20" y="223" fill="var(--ink-soft)" fontSize="10.5">Play your lowest card by feel. Any slip costs the team a life.</text>
    </svg>
  );
}
