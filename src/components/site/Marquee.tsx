const TEXT =
  "Droit Civil · Droit Pénal · Droit Commercial · Immigration · Luxembourg · Depuis 2007 · Barreau de Luxembourg · Dudelange · ";

const FULL = TEXT.repeat(6);

const spanStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "#777169",
  whiteSpace: "nowrap",
  paddingRight: "3rem",
  flex: "0 0 auto",
};

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
        <span style={spanStyle}>{FULL}</span>
        <span style={spanStyle}>{FULL}</span>
      </div>
    </div>
  );
}


