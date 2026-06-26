// UNO Flip! — the two-sided deck (Light / Dark) and how a Flip card switches everything.
export function UnoFlipSides() {
  return (
    <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="UNO Flip — match the discard by colour, number, or symbol; a Flip card turns the whole game to the harsher Dark side">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">TWO SIDES TO EVERY CARD</text>

      {/* Light side card */}
      <g transform="translate(30,40)">
        <rect width="80" height="108" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
        <ellipse cx="40" cy="54" rx="30" ry="44" fill="var(--card-red)" opacity="0.9" />
        <text x="40" y="62" fill="var(--surface)" fontSize="30" fontWeight="700" textAnchor="middle">7</text>
        <text x="40" y="126" fill="var(--ink-soft)" fontSize="10" fontWeight="700" textAnchor="middle">LIGHT</text>
      </g>

      {/* flip arrows */}
      <g transform="translate(150,90)">
        <path d="M 0 -8 C 24 -22, 40 -22, 56 -8" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <path d="M 56 -8 l -8 -2 l 2 8 Z" fill="var(--accent)" />
        <path d="M 56 8 C 32 22, 16 22, 0 8" stroke="var(--accent)" strokeWidth="2" fill="none" />
        <path d="M 0 8 l 8 2 l -2 -8 Z" fill="var(--accent)" />
        <text x="28" y="-26" fill="var(--accent)" fontSize="10" fontWeight="700" textAnchor="middle">FLIP</text>
      </g>

      {/* Dark side card */}
      <g transform="translate(220,40)">
        <rect width="80" height="108" rx="10" fill="var(--ink)" stroke="var(--accent)" strokeWidth="2" />
        <ellipse cx="40" cy="54" rx="30" ry="44" fill="var(--accent)" />
        <text x="40" y="62" fill="var(--surface)" fontSize="30" fontWeight="700" textAnchor="middle">7</text>
        <text x="40" y="126" fill="var(--ink)" fontSize="10" fontWeight="700" textAnchor="middle">DARK</text>
      </g>

      <text x="20" y="178" fill="var(--ink)" fontSize="10.5" fontWeight="600">Match the discard by colour, number, or symbol.</text>
      <text x="20" y="193" fill="var(--ink-soft)" fontSize="10.5">A Flip card turns the deck, your hand, and the piles to the Dark side —</text>
      <text x="20" y="208" fill="var(--ink-soft)" fontSize="10.5">harsher actions (Draw Five, Skip Everyone) until someone flips back.</text>
    </svg>
  );
}
