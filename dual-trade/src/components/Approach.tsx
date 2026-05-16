"use client";

const cards = [
  {
    title: "Combatir la inflacion",
    body: "El dinero parado pierde valor cada año. Entender los mercados es el primer paso para proteger lo que has ganado.",
  },
  {
    title: "Independencia economica",
    body: "No dependas de un salario para siempre. Con metodo y constancia, tu capital puede trabajar por ti.",
  },
  {
    title: "Planifica tu futuro",
    body: "Tomar el control de tus finanzas hoy es la mejor decision que puedes tomar. Empieza pequeno, piensa a largo plazo.",
  },
];

export default function Approach() {
  return (
    <section
      id="enfoque"
      style={{
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>

        {/* Titulo y parrafo — estaticos, sin Framer Motion */}
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#1d1d1f",
          }}
        >
          Nuestra motivacion.
        </h2>

        <div
          style={{
            width: "32px",
            height: "1.5px",
            background: "#b8962e",
            borderRadius: "2px",
            margin: "1.6rem 0 1.8rem",
          }}
        />

        <p
          style={{
            fontSize: "clamp(0.92rem, 1.4vw, 1.1rem)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "#1d1d1f",
            maxWidth: "560px",
            marginBottom: "3.2rem",
          }}
        >
          La mejor forma de combatir la inflacion y conseguir independencia
          economica es aprender a utilizar nuestros ahorros con cabeza.
          El mercado no es un casino — es una herramienta. Y como toda
          herramienta, funciona si sabes usarla.
        </p>

        {/* Grid de tarjetas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {cards.map((c) => (
            <div
              key={c.title}
              style={{
                background: "#ffffff",
                borderRadius: "0px",
                padding: "2.2rem 1.8rem",
                border: "1px solid rgba(0,0,0,0.3)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                  marginBottom: "0.75rem",
                  color: "#1d1d1f",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "#1d1d1f",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
