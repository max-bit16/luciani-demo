const ITEMS = [
  "Droit Civil",
  "Droit Pénal",
  "Droit Commercial",
  "Immigration",
  "Luxembourg",
  "Depuis 2007",
  "Barreau de Luxembourg",
  "Dudelange",
];

const REPEAT = 6;

const baseStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  whiteSpace: "nowrap",
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
};

function MarqueeContent() {
  const groups: React.ReactNode[] = [];
  for (let r = 0; r < REPEAT; r++) {
    ITEMS.forEach((item, i) => {
      groups.push(
        <span
          key={`${r}-w-${i}`}
          style={{ ...baseStyle, color: "#777169", paddingRight: "0.9rem" }}
        >
          {item}
        </span>
      );
      groups.push(
        <span
          key={`${r}-s-${i}`}
          style={{ ...baseStyle, color: "#B8924A", paddingRight: "0.9rem" }}
          aria-hidden="true"
        >
          ·
        </span>
      );
    });
  }
  return <>{groups}</>;
}

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: "#f5f2ef",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}


