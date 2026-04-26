export function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-start flex-wrap gap-8">
        <div>
          <p
            className="font-display"
            style={{ fontSize: "20px", color: "#ffffff", fontWeight: 300 }}
          >
            Étude Luciani
          </p>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Cabinet d'avocats · Dudelange, Luxembourg
            <br />
            Barreau de Luxembourg · Inscrit depuis le 24/05/2007
          </p>
        </div>

        <div className="text-right">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            © 2026 Étude Luciani. Tous droits réservés.
            <br />
            40, rue du Commerce · L-3450 Dudelange
          </p>
        </div>
      </div>
    </footer>
  );
}