// The app's signature mark: four colour-coded tabs — the Dutch Blitz card
// spectrum (red / blue / yellow / green) promoted to a brand motif. Reads like
// the colour-coded section tabs down the edge of a printed manual. Kept small
// and quiet; it is the one recurring element the app is remembered by.
//
// Colours come from the --card-* tokens, never raw values.

type Props = {
  /** "bar" = four short tabs (headers). "rule" = four segments spanning full width. */
  variant?: "bar" | "rule";
  className?: string;
};

const COLOURS = ["bg-card-red", "bg-card-blue", "bg-card-yellow", "bg-card-green"];

export function Spine({ variant = "bar", className }: Props) {
  if (variant === "rule") {
    return (
      <span className={`flex gap-1 ${className ?? ""}`} aria-hidden="true">
        {COLOURS.map((c) => (
          <span key={c} className={`block h-1 flex-1 rounded-pill ${c}`} />
        ))}
      </span>
    );
  }

  return (
    <span className={`inline-flex gap-1 ${className ?? ""}`} aria-hidden="true">
      {COLOURS.map((c) => (
        <span key={c} className={`block h-1 w-6 rounded-pill ${c}`} />
      ))}
    </span>
  );
}
