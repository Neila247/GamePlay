// Kluster — the cord loop on the table, stones placed inside, and a kluster to avoid.
export function KlusterCord() {
  return (
    <svg viewBox="0 0 380 236" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="Kluster — place magnetic stones inside the cord loop without letting any snap together">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">INSIDE THE CORD</text>

      {/* cord loop */}
      <path d="M 40 70 C 30 40, 130 30, 200 48 C 280 68, 350 50, 348 110 C 346 170, 250 180, 170 168 C 90 156, 50 150, 40 70 Z"
        fill="var(--surface)" stroke="var(--ink-soft)" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" />

      {/* placed stones (safe, apart) */}
      {[
        { x: 90, y: 90 }, { x: 150, y: 110 }, { x: 230, y: 80 }, { x: 290, y: 120 },
      ].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="11" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1" />
      ))}

      {/* a kluster (two stuck together) — flagged */}
      <circle cx="180" cy="70" r="11" fill="var(--card-red)" stroke="var(--ink)" />
      <circle cx="200" cy="70" r="11" fill="var(--card-red)" stroke="var(--ink)" />
      <text x="190" y="44" fill="var(--card-red)" fontSize="9" fontWeight="700" textAnchor="middle">KLUSTER!</text>
      <path d="M 190 50 L 190 56" stroke="var(--card-red)" strokeWidth="1.5" />

      <text x="20" y="196" fill="var(--ink)" fontSize="10.5" fontWeight="600">Place one stone fully inside the cord each turn.</text>
      <text x="20" y="211" fill="var(--ink-soft)" fontSize="10.5">If any snap together, you take them all back.</text>
      <text x="20" y="226" fill="var(--ink-soft)" fontSize="10.5">First to place every stone wins.</text>
    </svg>
  );
}
