// High Society — a status card up for auction, with money bid face-up beneath it.
export function HighSocietyAuction() {
  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" width="100%"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      style={{ display: "block" }} role="img"
      aria-label="High Society — auction a revealed status card by playing money cards; spend least and you are cast out">
      <text x="20" y="22" fill="var(--ink)" fontSize="12" fontWeight="700" letterSpacing="1.2">UP FOR AUCTION</text>

      {/* status deck + revealed card */}
      <g transform="translate(20,36)">
        <rect x="4" y="4" width="60" height="80" rx="6" fill="var(--surface)" stroke="var(--border)" />
        <rect width="60" height="80" rx="6" fill="var(--ink)" />
        <text x="30" y="98" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">status deck</text>
      </g>
      <g transform="translate(110,36)">
        <rect width="64" height="80" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
        <text x="32" y="36" fill="var(--ink)" fontSize="26" fontWeight="700" textAnchor="middle">8</text>
        <text x="32" y="58" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">luxury</text>
        <text x="32" y="98" fill="var(--ink-soft)" fontSize="9" textAnchor="middle">revealed</text>
      </g>

      {/* highest bidder wins arrow */}
      <text x="210" y="60" fill="var(--ink)" fontSize="11" fontWeight="600">Highest</text>
      <text x="210" y="75" fill="var(--ink)" fontSize="11" fontWeight="600">bidder</text>
      <text x="210" y="90" fill="var(--ink-soft)" fontSize="11">wins it.</text>

      {/* money bid */}
      <text x="20" y="146" fill="var(--ink-soft)" fontSize="10" fontWeight="700" letterSpacing="0.8">YOUR BID (money, face up)</text>
      {["10", "8", "4"].map((m, i) => (
        <g key={i} transform={`translate(${20 + i * 50},156)`}>
          <rect width="42" height="34" rx="6" fill="var(--surface-sunk)" stroke="var(--border)" />
          <text x="21" y="23" fill="var(--ink)" fontSize="13" fontWeight="700" textAnchor="middle">{m}</text>
        </g>
      ))}
      <text x="184" y="178" fill="var(--ink)" fontSize="12" fontWeight="700">= 22</text>

      <text x="20" y="216" fill="var(--ink-soft)" fontSize="10.5">Spent money is gone — and the poorest player is cast out.</text>
    </svg>
  );
}
