import { useState, useEffect } from "react";

/* ============================================================
   🍪 SISTEMA DE COOKIES — WAIQUE
   ============================================================ */

const CLAVE_STORAGE = "waique_cookies_pref";
const CLAVE_VERSION = "waique_cookies_v1";

/* ---------- CSS ---------- */
const cssCookies = `
/* ---------- BANNER ---------- */
.ck-banner{
  position:fixed;left:0;right:0;bottom:0;z-index:9998;
  padding:0 20px 20px;
  animation:ck-subir .6s cubic-bezier(.16,1,.3,1);
}
@keyframes ck-subir{
  from{transform:translateY(120%);opacity:0}
  to{transform:translateY(0);opacity:1}
}
.ck-banner.oculto{display:none}

.ck-card{
  max-width:1180px;margin:0 auto;
  background:linear-gradient(160deg, rgba(26,20,16,.98), rgba(14,10,7,.98));
  border:1px solid rgba(201,138,63,.35);
  border-radius:4px;
  padding:26px 30px;
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  box-shadow:0 30px 80px rgba(0,0,0,.75);
  position:relative;
  display:grid;
  grid-template-columns:auto 1fr auto;
  gap:24px;
  align-items:center;
}
.ck-card::before,
.ck-card::after{
  content:"";position:absolute;width:22px;height:22px;
  border:1px solid #c98a3f;
}
.ck-card::before{top:-1px;left:-1px;border-right:none;border-bottom:none}
.ck-card::after{bottom:-1px;right:-1px;border-left:none;border-top:none}

.ck-icono{
  width:56px;height:56px;border-radius:50%;
  border:1px solid rgba(201,138,63,.4);
  display:grid;place-items:center;
  font-size:26px;
  background:linear-gradient(135deg,rgba(214,48,58,.15),rgba(46,95,204,.15));
  flex-shrink:0;
  animation:ck-latir 3s ease-in-out infinite;
}
@keyframes ck-latir{
  0%,100%{transform:scale(1)}
  50%{transform:scale(1.06)}
}

.ck-txt h3{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:1.15rem;font-weight:600;
  color:#f4ead8;margin-bottom:8px;
  letter-spacing:.01em;
}
.ck-txt p{
  font-size:.85rem;line-height:1.65;
  color:#a89680;font-weight:300;
  max-width:720px;
}
.ck-txt p a{
  color:#e0b877;text-decoration:underline;
  text-underline-offset:3px;
  cursor:pointer;transition:color .3s;
}
.ck-txt p a:hover{color:#c98a3f}

.ck-botones{
  display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;
}
.ck-btn{
  padding:11px 22px;border-radius:100px;
  font-family:inherit;font-size:.76rem;font-weight:500;
  letter-spacing:.14em;text-transform:uppercase;
  cursor:pointer;border:none;
  transition:all .3s;
  white-space:nowrap;
}
.ck-btn-aceptar{
  background:linear-gradient(100deg,#D6303A,#E87A24,#E5B72E,#2F8F4E,#2E5FCC);
  background-size:300% auto;
  color:#fff;font-weight:600;
  animation:ck-arcoiris 8s linear infinite;
}
.ck-btn-aceptar:hover{
  transform:translateY(-2px);
  box-shadow:0 10px 26px rgba(232,122,36,.4);
  filter:brightness(1.1);
}
.ck-btn-rechazar{
  background:transparent;
  color:#d8c9b0;
  border:1px solid rgba(201,138,63,.3);
}
.ck-btn-rechazar:hover{
  border-color:#c98a3f;color:#c98a3f;
}
.ck-btn-config{
  background:transparent;
  color:#c98a3f;
  border:1px solid rgba(201,138,63,.5);
}
.ck-btn-config:hover{
  background:rgba(201,138,63,.1);
}
@keyframes ck-arcoiris{
  to{background-position:300% center}
}

/* ---------- PANEL DE CONFIGURACIÓN ---------- */
.ck-panel-overlay{
  position:fixed;inset:0;z-index:9999;
  background:rgba(0,0,0,.75);
  backdrop-filter:blur(6px);
  display:grid;place-items:center;
  padding:20px;
  animation:ck-fade .3s ease;
}
@keyframes ck-fade{from{opacity:0}to{opacity:1}}

.ck-panel{
  background:linear-gradient(160deg, rgba(26,20,16,.98), rgba(14,10,7,.98));
  border:1px solid rgba(201,138,63,.35);
  border-radius:4px;
  width:min(680px,100%);
  max-height:90vh;
  overflow-y:auto;
  padding:36px 34px;
  position:relative;
  animation:ck-aparecer .4s cubic-bezier(.34,1.56,.64,1);
}
@keyframes ck-aparecer{
  from{opacity:0;transform:scale(.94) translateY(20px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}
.ck-panel::before,
.ck-panel::after{
  content:"";position:absolute;width:28px;height:28px;
  border:1px solid #c98a3f;
}
.ck-panel::before{top:-1px;left:-1px;border-right:none;border-bottom:none}
.ck-panel::after{bottom:-1px;right:-1px;border-left:none;border-top:none}

.ck-panel::-webkit-scrollbar{width:5px}
.ck-panel::-webkit-scrollbar-thumb{background:rgba(201,138,63,.3);border-radius:10px}

.ck-panel h2{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:1.8rem;font-weight:500;
  color:#f4ead8;margin-bottom:12px;
  letter-spacing:-.01em;
}
.ck-panel .ck-sub{
  color:#a89680;font-size:.88rem;line-height:1.7;
  margin-bottom:28px;font-weight:300;
}

.ck-opcion{
  border:1px solid rgba(244,234,216,.1);
  border-radius:2px;
  padding:18px 20px;
  margin-bottom:14px;
  display:flex;align-items:flex-start;gap:16px;
  transition:border-color .3s, background .3s;
}
.ck-opcion:hover{
  border-color:rgba(201,138,63,.3);
  background:rgba(201,138,63,.03);
}
.ck-opcion-txt{flex:1}
.ck-opcion-txt h4{
  font-family:'Outfit',sans-serif;
  font-size:.95rem;font-weight:600;
  color:#f4ead8;margin-bottom:6px;
  letter-spacing:.02em;
}
.ck-opcion-txt p{
  font-size:.82rem;color:#a89680;
  line-height:1.6;font-weight:300;
}

/* toggle switch */
.ck-switch{
  position:relative;
  width:48px;height:26px;
  flex-shrink:0;margin-top:2px;
}
.ck-switch input{
  opacity:0;width:0;height:0;
  position:absolute;
}
.ck-slider{
  position:absolute;inset:0;
  background:rgba(244,234,216,.1);
  border:1px solid rgba(244,234,216,.15);
  border-radius:100px;
  cursor:pointer;
  transition:all .3s;
}
.ck-slider::before{
  content:"";position:absolute;
  width:18px;height:18px;border-radius:50%;
  background:#a89680;
  top:3px;left:3px;
  transition:all .3s cubic-bezier(.34,1.56,.64,1);
}
.ck-switch input:checked + .ck-slider{
  background:linear-gradient(90deg,#2F8F4E,#4a8a5c);
  border-color:#2F8F4E;
}
.ck-switch input:checked + .ck-slider::before{
  transform:translateX(22px);
  background:#f4ead8;
}
.ck-switch input:disabled + .ck-slider{
  opacity:.5;cursor:not-allowed;
}

.ck-panel-botones{
  display:flex;gap:12px;flex-wrap:wrap;
  margin-top:26px;
  padding-top:24px;
  border-top:1px solid rgba(244,234,216,.08);
}

/* ---------- POLÍTICA MODAL ---------- */
.ck-politica{
  background:linear-gradient(160deg, rgba(26,20,16,.98), rgba(14,10,7,.98));
  border:1px solid rgba(201,138,63,.35);
  border-radius:4px;
  width:min(820px,100%);
  max-height:90vh;
  overflow-y:auto;
  padding:48px 46px;
  position:relative;
  animation:ck-aparecer .4s cubic-bezier(.34,1.56,.64,1);
}
.ck-politica::-webkit-scrollbar{width:5px}
.ck-politica::-webkit-scrollbar-thumb{background:rgba(201,138,63,.3);border-radius:10px}

.ck-politica h2{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:2rem;font-weight:500;
  color:#f4ead8;margin-bottom:10px;
  letter-spacing:-.01em;
}
.ck-politica .ck-fecha{
  font-size:.76rem;color:#c98a3f;
  letter-spacing:.2em;text-transform:uppercase;
  margin-bottom:30px;
}
.ck-politica h3{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-size:1.25rem;font-weight:600;
  color:#e0b877;margin:28px 0 12px;
  letter-spacing:.01em;
}
.ck-politica h3:first-of-type{margin-top:0}
.ck-politica p{
  font-size:.92rem;color:#d8c9b0;
  line-height:1.85;margin-bottom:14px;
  font-weight:300;
}
.ck-politica ul{
  margin:0 0 16px 20px;
  padding:0;
}
.ck-politica li{
  font-size:.9rem;color:#d8c9b0;
  line-height:1.8;margin-bottom:8px;
  font-weight:300;
}
.ck-politica li strong{color:#e0b877;font-weight:500}
.ck-politica a{
  color:#c98a3f;text-decoration:underline;
  text-underline-offset:3px;
}
.ck-politica a:hover{color:#e0b877}

.ck-cerrar{
  position:absolute;top:20px;right:20px;
  background:rgba(244,234,216,.08);
  border:1px solid rgba(244,234,216,.15);
  color:#f4ead8;
  width:36px;height:36px;border-radius:50%;
  cursor:pointer;font-size:15px;
  display:grid;place-items:center;
  transition:all .3s;
}
.ck-cerrar:hover{
  background:rgba(214,48,58,.2);
  border-color:#D6303A;
  transform:rotate(90deg);
}

/* botón flotante "cookies" para reabrir */
.ck-reabrir{
  position:fixed;left:26px;bottom:26px;z-index:9997;
  width:44px;height:44px;border-radius:50%;
  background:rgba(14,10,7,.9);
  border:1px solid rgba(201,138,63,.4);
  color:#c98a3f;
  cursor:pointer;font-size:18px;
  display:grid;place-items:center;
  backdrop-filter:blur(10px);
  transition:all .3s;
  opacity:.7;
}
.ck-reabrir:hover{
  opacity:1;transform:scale(1.1);
  border-color:#c98a3f;
}

/* ---------- RESPONSIVE ---------- */
@media(max-width:860px){
  .ck-card{
    grid-template-columns:1fr;
    text-align:center;
    padding:24px 22px;
    gap:18px;
  }
  .ck-icono{margin:0 auto}
  .ck-botones{justify-content:center;width:100%}
  .ck-btn{flex:1;min-width:120px}
  .ck-panel,.ck-politica{padding:32px 24px}
  .ck-panel h2,.ck-politica h2{font-size:1.5rem}
}
@media(max-width:460px){
  .ck-banner{padding:0 12px 12px}
  .ck-btn{font-size:.7rem;padding:10px 16px}
  .ck-reabrir{left:16px;bottom:16px;width:40px;height:40px;font-size:16px}
}
`;

/* ============================================================
   COMPONENTE BANNER + PANEL + POLÍTICA
   ============================================================ */
export default function Cookies() {
  const [mostrarBanner, setMostrarBanner] = useState(false);
  const [mostrarPanel, setMostrarPanel] = useState(false);
  const [mostrarPolitica, setMostrarPolitica] = useState(false);
  const [mostrarReabrir, setMostrarReabrir] = useState(false);

  const [prefs, setPrefs] = useState({
    necesarias: true, // siempre activas
    analiticas: true,
    publicidad: true,
  });

  /* Cargar preferencias guardadas */
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      const version = localStorage.getItem(CLAVE_VERSION);

      if (guardado && version === CLAVE_VERSION) {
        setPrefs(JSON.parse(guardado));
        setMostrarReabrir(true);
      } else {
        // Si no hay nada guardado o cambió la versión → mostrar banner
        setTimeout(() => setMostrarBanner(true), 1200);
      }
    } catch {
      setTimeout(() => setMostrarBanner(true), 1200);
    }
  }, []);

  /* Guardar preferencias */
  const guardar = (nuevasPrefs) => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevasPrefs));
      localStorage.setItem(CLAVE_VERSION, CLAVE_VERSION);
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
    setPrefs(nuevasPrefs);
    setMostrarBanner(false);
    setMostrarPanel(false);
    setMostrarReabrir(true);

    // Aquí puedes disparar los scripts según lo aceptado:
    // if (nuevasPrefs.analiticas) cargarGoogleAnalytics();
    // if (nuevasPrefs.publicidad) cargarPixelFacebook();
  };

  const aceptarTodo = () => {
    guardar({ necesarias: true, analiticas: true, publicidad: true });
  };

  const rechazarTodo = () => {
    guardar({ necesarias: true, analiticas: false, publicidad: false });
  };

  const guardarPersonalizado = () => {
    guardar(prefs);
  };

  const abrirPanel = () => {
    setMostrarPanel(true);
    setMostrarBanner(false);
  };

  return (
    <>
      <style>{cssCookies}</style>

      {/* ============ BANNER PRINCIPAL ============ */}
      <div className={`ck-banner ${mostrarBanner ? "" : "oculto"}`}>
        <div className="ck-card">
          <div className="ck-icono">🍪</div>

          <div className="ck-txt">
            <h3>Manejo de cookies</h3>
            <p>
              Al continuar navegando por el sitio web, aceptas el uso de
              cookies propias y de terceros con el fin de identificar tus
              patrones de navegación, realizar personalizaciones de contenido
              y mostrarte publicidad de acuerdo a tus preferencias. Para
              conocer más, accede a nuestra{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setMostrarPolitica(true);
                }}
              >
                política de cookies
              </a>
              .
            </p>
          </div>

          <div className="ck-botones">
            <button className="ck-btn ck-btn-config" onClick={abrirPanel}>
              Configurar
            </button>
            <button className="ck-btn ck-btn-rechazar" onClick={rechazarTodo}>
              Rechazar
            </button>
            <button className="ck-btn ck-btn-aceptar" onClick={aceptarTodo}>
              Aceptar todas
            </button>
          </div>
        </div>
      </div>

      {/* ============ BOTÓN FLOTANTE PARA REABRIR ============ */}
      {mostrarReabrir && !mostrarBanner && (
        <button
          className="ck-reabrir"
          onClick={() => setMostrarPanel(true)}
          title="Configurar cookies"
          aria-label="Configurar cookies"
        >
          🍪
        </button>
      )}

      {/* ============ PANEL DE CONFIGURACIÓN ============ */}
      {mostrarPanel && (
        <div
          className="ck-panel-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMostrarPanel(false);
          }}
        >
          <div className="ck-panel">
            <button
              className="ck-cerrar"
              onClick={() => setMostrarPanel(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h2>Configuración de cookies</h2>
            <p className="ck-sub">
              Elige qué tipo de cookies aceptas. Las cookies necesarias siempre
              estarán activas porque son indispensables para que el sitio
              funcione correctamente.
            </p>

            {/* NECESARIAS */}
            <div className="ck-opcion">
              <div className="ck-opcion-txt">
                <h4>Cookies necesarias</h4>
                <p>
                  Permiten el funcionamiento básico del sitio: navegación,
                  seguridad, acceso a secciones y formularios. No pueden
                  desactivarse.
                </p>
              </div>
              <div className="ck-switch">
                <input type="checkbox" checked disabled />
                <span className="ck-slider" />
              </div>
            </div>

            {/* ANALÍTICAS */}
            <div className="ck-opcion">
              <div className="ck-opcion-txt">
                <h4>Cookies analíticas</h4>
                <p>
                  Nos ayudan a entender cómo navegas por el sitio (páginas más
                  visitadas, tiempo de permanencia) para mejorar la
                  experiencia.
                </p>
              </div>
              <div className="ck-switch">
                <input
                  type="checkbox"
                  checked={prefs.analiticas}
                  onChange={(e) =>
                    setPrefs({ ...prefs, analiticas: e.target.checked })
                  }
                />
                <span className="ck-slider" />
              </div>
            </div>

            {/* PUBLICIDAD */}
            <div className="ck-opcion">
              <div className="ck-opcion-txt">
                <h4>Cookies de publicidad</h4>
                <p>
                  Se usan para mostrarte anuncios acordes a tus intereses y
                  medir la efectividad de nuestras campañas.
                </p>
              </div>
              <div className="ck-switch">
                <input
                  type="checkbox"
                  checked={prefs.publicidad}
                  onChange={(e) =>
                    setPrefs({ ...prefs, publicidad: e.target.checked })
                  }
                />
                <span className="ck-slider" />
              </div>
            </div>

            <div className="ck-panel-botones">
              <button
                className="ck-btn ck-btn-aceptar"
                onClick={guardarPersonalizado}
              >
                Guardar preferencias
              </button>
              <button className="ck-btn ck-btn-rechazar" onClick={aceptarTodo}>
                Aceptar todas
              </button>
              <button className="ck-btn ck-btn-config" onClick={rechazarTodo}>
                Rechazar todas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ POLÍTICA DE COOKIES ============ */}
      {mostrarPolitica && (
        <div
          className="ck-panel-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMostrarPolitica(false);
          }}
        >
          <div className="ck-politica">
            <button
              className="ck-cerrar"
              onClick={() => setMostrarPolitica(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h2>Política de Cookies</h2>
            <p className="ck-fecha">Última actualización: 2025</p>

            <h3>1. ¿Qué son las cookies?</h3>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo (ordenador, tablet o móvil) cuando visitas un sitio
              web. Sirven para recordar tus preferencias, analizar cómo usas el
              sitio y personalizar tu experiencia de navegación.
            </p>

            <h3>2. ¿Quién es el responsable?</h3>
            <p>
              El responsable del tratamiento de los datos obtenidos a través de
              las cookies es <strong>WAIQUE · Casa de Medicina Ancestral</strong>,
              con correo de contacto{" "}
              <a href="mailto:hola@waique.com">hola@waique.com</a>.
            </p>

            <h3>3. ¿Qué tipos de cookies utilizamos?</h3>
            <ul>
              <li>
                <strong>Cookies necesarias:</strong> imprescindibles para el
                funcionamiento del sitio. Permiten la navegación, el acceso a
                secciones seguras y el envío de formularios. No pueden
                desactivarse.
              </li>
              <li>
                <strong>Cookies analíticas:</strong> nos permiten medir y
                analizar cómo los visitantes usan el sitio (páginas más
                visitadas, tiempo de permanencia, tasa de rebote). Toda la
                información se recoge de forma agregada y anónima.
              </li>
              <li>
                <strong>Cookies de publicidad:</strong> se utilizan para
                mostrarte anuncios relevantes según tus intereses y medir la
                efectividad de las campañas. Pueden ser propias o de terceros.
              </li>
              <li>
                <strong>Cookies de personalización:</strong> permiten recordar
                tus preferencias (idioma, región, tema visual) para ofrecerte
                una experiencia más adaptada.
              </li>
            </ul>

            <h3>4. Cookies de terceros</h3>
            <p>
              Algunos servicios integrados en el sitio (como WhatsApp, Google
              Analytics, Meta Pixel o reproductores de video) pueden instalar
              sus propias cookies. Te recomendamos revisar sus políticas de
              privacidad para conocer cómo tratan tu información.
            </p>

            <h3>5. ¿Cómo puedes gestionar las cookies?</h3>
            <p>
              Puedes aceptar, rechazar o configurar las cookies desde el banner
              que aparece al entrar al sitio o desde el botón flotante 🍪
              ubicado en la esquina inferior izquierda. También puedes
              bloquearlas o eliminarlas directamente desde la configuración de
              tu navegador:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Configuración → Privacidad y seguridad
                → Cookies y otros datos de sitios.
              </li>
              <li>
                <strong>Firefox:</strong> Preferencias → Privacidad y seguridad
                → Cookies y datos del sitio.
              </li>
              <li>
                <strong>Safari:</strong> Preferencias → Privacidad → Gestionar
                datos de sitios web.
              </li>
              <li>
                <strong>Edge:</strong> Configuración → Cookies y permisos del
                sitio.
              </li>
            </ul>

            <h3>6. Conservación de los datos</h3>
            <p>
              Las cookies tienen una duración limitada en el tiempo. Las
              preferencias que elijas se guardarán en tu navegador hasta que
              borres los datos del sitio o cambies tu configuración.
            </p>

            <h3>7. Actualizaciones de esta política</h3>
            <p>
              WAIQUE podrá actualizar esta Política de Cookies para adaptarla a
              cambios normativos o técnicos. Te recomendamos revisarla
              periódicamente.
            </p>

            <h3>8. Contacto</h3>
            <p>
              Si tienes dudas sobre el uso de cookies, escríbenos a{" "}
              <a href="mailto:hola@waique.com">hola@waique.com</a> o por
              WhatsApp al <strong>+57 311 234 1373</strong>.
            </p>

            <div className="ck-panel-botones">
              <button
                className="ck-btn ck-btn-aceptar"
                onClick={() => {
                  setMostrarPolitica(false);
                  if (!mostrarBanner && mostrarReabrir) return;
                  aceptarTodo();
                }}
              >
                Aceptar y cerrar
              </button>
              <button
                className="ck-btn ck-btn-config"
                onClick={() => setMostrarPolitica(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
