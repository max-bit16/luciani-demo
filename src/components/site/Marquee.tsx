const TEXT =
  "Droit Civil · Droit Pénal · Droit Commercial · Immigration · Luxembourg · Depuis 2007 · Barreau de Luxembourg · Dudelange · ";

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
      <div className="marquee-track py-4">
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#777169",
              whiteSpace: "nowrap",
              paddingRight: "0",
              flex: "0 0 auto",
            }}
          >
            {TEXT.repeat(6)}
          </span>
        ))}
      </div>
    </div>
  );
}
