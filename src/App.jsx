import { useState, useEffect } from "react";
import Cookies from "./Cookies";

/* ============================================================
   CONFIGURACIÓN
   ============================================================ */
const NUMERO_WHATSAPP = "573112341373";
const MENSAJE_DEFECTO =
  "¡Hola WAIQUE! 🌿 Quisiera información sobre las ceremonias y la Casa de Medicina Ancestral.";

const abrirWhatsApp = (texto = MENSAJE_DEFECTO) => {
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

/* ============================================================
   CSS
   ============================================================ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root{
  --tierra:#3a2a1e;
  --ocre:#c98a3f;
  --ocre-suave:#e0b877;
  --verde-selva:#2f5d3a;
  --verde-hoja:#4a8a5c;
  --humo:#1a1410;
  --bg:#0e0a07;
  --bg-2:#15100b;
  --crema:#f4ead8;
  --crema-suave:#d8c9b0;
  --muted:#a89680;
  --borde:rgba(201,138,63,.22);
  --borde-suave:rgba(244,234,216,.08);

  /* Colores chamánicos del logo bordado */
  --c-azul:#2E5FCC;
  --c-naranja:#E87A24;
  --c-amarillo:#E5B72E;
  --c-verde:#2F8F4E;
  --c-rojo:#D6303A;
  --c-marron:#8B5A2B;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  background:var(--bg);
  color:var(--crema);
  font-family:'Outfit',system-ui,-apple-system,sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
  line-height:1.6;
}
::selection{background:var(--ocre);color:var(--humo)}

h1,h2,h3,h4,.serif{
  font-family:'Cormorant Garamond',Georgia,serif;
  font-weight:500;
  letter-spacing:-.01em;
}

/* ============================================================
   🌈 FONDO CHAMÁNICO — colores girando
   ============================================================ */
.fondo-chaman{
  position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;
}
.fondo-chaman::before{
  content:"";position:absolute;inset:-50%;
  background:
    radial-gradient(circle at 20% 30%, rgba(214,48,58,.28), transparent 40%),
    radial-gradient(circle at 80% 25%, rgba(46,95,204,.26), transparent 42%),
    radial-gradient(circle at 25% 80%, rgba(229,183,46,.22), transparent 42%),
    radial-gradient(circle at 78% 75%, rgba(47,143,78,.28), transparent 42%),
    radial-gradient(circle at 50% 50%, rgba(232,122,36,.18), transparent 50%);
  animation:girar-fondo 40s linear infinite;
  filter:blur(40px);
}
.fondo-chaman::after{
  content:"";position:absolute;inset:-30%;
  background:
    radial-gradient(circle at 70% 20%, rgba(214,48,58,.22), transparent 40%),
    radial-gradient(circle at 15% 60%, rgba(46,95,204,.22), transparent 42%),
    radial-gradient(circle at 85% 85%, rgba(229,183,46,.20), transparent 42%),
    radial-gradient(circle at 40% 30%, rgba(47,143,78,.22), transparent 42%);
  animation:girar-fondo 60s linear infinite reverse;
  filter:blur(60px);
}
@keyframes girar-fondo{
  to{transform:rotate(360deg)}
}

.grano{
  position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.45;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
}

/* Orbes chamánicos flotantes */
.orbe{
  position:fixed;border-radius:50%;pointer-events:none;z-index:1;
  filter:blur(70px);animation:respirar 10s ease-in-out infinite;
}
.orbe.o1{width:420px;height:420px;top:-140px;left:-120px;background:radial-gradient(circle, rgba(214,48,58,.4), transparent 70%)}
.orbe.o2{width:380px;height:380px;top:30%;right:-140px;background:radial-gradient(circle, rgba(46,95,204,.4), transparent 70%);animation-delay:2s}
.orbe.o3{width:360px;height:360px;bottom:-140px;left:30%;background:radial-gradient(circle, rgba(229,183,46,.35), transparent 70%);animation-delay:4s}
.orbe.o4{width:340px;height:340px;top:55%;left:-120px;background:radial-gradient(circle, rgba(47,143,78,.4), transparent 70%);animation-delay:6s}
@keyframes respirar{
  0%,100%{transform:scale(1);opacity:.35}
  50%{transform:scale(1.2);opacity:.6}
}

.contenedor{width:min(1180px,90%);margin:0 auto;position:relative;z-index:2}

/* ============================================================
   🌈 TEXTO CON GRADIENTE CHAMÁNICO
   ============================================================ */
.arcoiris-texto{
  background:linear-gradient(
    100deg,
    #D6303A 0%,
    #E87A24 18%,
    #E5B72E 35%,
    #2F8F4E 55%,
    #2E5FCC 78%,
    #D6303A 100%
  );
  background-size:300% auto;
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  animation:arcoiris-mover 6s linear infinite;
  display:inline;
  font-weight:600;
}
@keyframes arcoiris-mover{
  to{background-position:300% center}
}

h1.titulo .arcoiris-texto,
.encabezado h2 .arcoiris-texto{
  font-style:italic;
  font-weight:500;
}

/* ---------- NAV ---------- */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:18px 0;transition:all .4s ease;
}
.nav.solido{
  padding:10px 0;
  background:rgba(14,10,7,.86);
  backdrop-filter:blur(20px);
  -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid var(--borde-suave);
}
.nav-inner{display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--crema)}
.logo-img{
  width:150px;height:88px;
  object-fit:contain;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1);
  filter:drop-shadow(0 4px 12px rgba(201,138,63,.3));
}
.logo:hover .logo-img{transform:rotate(-6deg) scale(1.08)}
.logo-txt strong{
  display:block;font-family:'Cormorant Garamond',serif;
  font-size:1.3rem;font-weight:600;letter-spacing:.28em;line-height:1;
}
.logo-txt span{
  font-size:.58rem;color:var(--muted);letter-spacing:.28em;
  text-transform:uppercase;margin-top:5px;display:block;
}

.nav-links{display:flex;gap:38px;align-items:center}
.nav-links a{
  color:var(--crema-suave);text-decoration:none;font-size:.8rem;
  font-weight:400;letter-spacing:.16em;text-transform:uppercase;
  position:relative;transition:color .3s;
}
.nav-links a::after{
  content:"";position:absolute;left:0;bottom:-6px;height:1px;width:0;
  background:linear-gradient(90deg,var(--c-rojo),var(--c-amarillo),var(--c-verde),var(--c-azul));
  transition:width .35s ease;
}
.nav-links a:hover{color:var(--ocre)}
.nav-links a:hover::after{width:100%}

.btn-nav{
  display:flex;align-items:center;gap:8px;
  background:transparent;color:var(--ocre);
  border:1px solid var(--ocre);
  padding:11px 24px;border-radius:100px;
  font-weight:500;font-size:.76rem;letter-spacing:.14em;
  text-transform:uppercase;font-family:inherit;cursor:pointer;
  transition:all .3s;
}
.btn-nav:hover{background:var(--ocre);color:var(--humo)}

.burger{display:none;background:none;border:none;cursor:pointer;padding:8px}
.burger span{display:block;width:24px;height:1.5px;background:var(--crema);margin:6px 0;transition:.3s}

/* ---------- HERO ---------- */
.hero{
  min-height:100vh;display:flex;align-items:center;
  padding:180px 0 100px;position:relative;
}
.hero-grid{
  display:grid;grid-template-columns:1.15fr .85fr;gap:80px;align-items:center;
}
.pill{
  display:inline-flex;align-items:center;gap:10px;
  border:1px solid var(--borde);
  padding:8px 20px;border-radius:100px;
  font-size:.7rem;color:var(--ocre-suave);
  letter-spacing:.22em;text-transform:uppercase;
  margin-bottom:28px;
  background:rgba(14,10,7,.5);
  backdrop-filter:blur(10px);
}
.punto{
  width:6px;height:6px;border-radius:50%;background:var(--c-verde);
  box-shadow:0 0 0 0 rgba(47,143,78,.6);
  animation:latido 2.6s infinite;
}
@keyframes latido{
  0%{box-shadow:0 0 0 0 rgba(47,143,78,.6)}
  70%{box-shadow:0 0 0 10px rgba(47,143,78,0)}
  100%{box-shadow:0 0 0 0 rgba(47,143,78,0)}
}

.hero-logo-texto{
  width:min(440px,85%);
  height:auto;
  margin-bottom:34px;
  display:block;
  filter:drop-shadow(0 8px 24px rgba(0,0,0,.6));
  animation:aparecer-logo 1.2s cubic-bezier(.16,1,.3,1);
}
@keyframes aparecer-logo{
  from{opacity:0;transform:translateY(20px) scale(.95)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

h1.titulo{
  font-size:clamp(2.2rem,4.6vw,3.6rem);
  font-weight:500;line-height:1.1;
  margin-bottom:28px;
  color:var(--crema);
}
.titulo-linea{
  display:block;width:80px;height:2px;
  background:linear-gradient(90deg,var(--c-rojo),var(--c-naranja),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:200% auto;
  animation:arcoiris-mover 4s linear infinite;
  margin-bottom:28px;
  border-radius:2px;
}

.hero p.sub{
  color:var(--crema-suave);font-size:1rem;line-height:1.85;
  max-width:560px;margin-bottom:40px;font-weight:300;
}
.hero p.sub strong{
  color:transparent;
  background:linear-gradient(90deg,var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 5s linear infinite;
  font-weight:500;
}

.hero-botones{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:52px}

.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:15px 34px;border-radius:100px;
  font-family:inherit;font-size:.8rem;font-weight:500;
  letter-spacing:.16em;text-transform:uppercase;
  cursor:pointer;text-decoration:none;border:none;
  transition:all .35s ease;
}
.btn-primario{
  background:linear-gradient(100deg,var(--c-rojo),var(--c-naranja),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:300% auto;
  color:#fff;
  animation:arcoiris-mover 8s linear infinite;
  font-weight:600;
}
.btn-primario:hover{
  transform:translateY(-2px);
  box-shadow:0 12px 30px rgba(232,122,36,.4);
  filter:brightness(1.1);
}
.btn-secundario{
  background:rgba(14,10,7,.6);color:var(--crema);
  border:1px solid var(--borde);
  backdrop-filter:blur(10px);
}
.btn-secundario:hover{
  border-color:var(--ocre);color:var(--ocre);
  transform:translateY(-2px);
}

.stats{display:flex;gap:50px;flex-wrap:wrap}
.stat strong{
  display:block;font-family:'Cormorant Garamond',serif;
  font-size:1.9rem;font-weight:500;
  color:transparent;
  background:linear-gradient(90deg,var(--c-amarillo),var(--c-verde));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 6s linear infinite;
  line-height:1;margin-bottom:8px;
}
.stat span{
  font-size:.66rem;color:var(--muted);
  text-transform:uppercase;letter-spacing:.22em;
}

/* tarjeta hero */
.hero-card{
  position:relative;padding:44px 38px;
  background:linear-gradient(160deg, rgba(58,42,30,.55), rgba(26,20,16,.85));
  border:1px solid var(--borde);
  border-radius:4px;
  backdrop-filter:blur(16px);
  box-shadow:0 20px 60px rgba(0,0,0,.5);
}
.hero-card::before,
.hero-card::after{
  content:"";position:absolute;width:26px;height:26px;
  border:1px solid var(--ocre);
}
.hero-card::before{top:-1px;left:-1px;border-right:none;border-bottom:none}
.hero-card::after{bottom:-1px;right:-1px;border-left:none;border-top:none}

.hero-card .simbolo{
  width:64px;height:64px;margin:0 auto 24px;
  display:grid;place-items:center;
  border:1px solid var(--borde);
  border-radius:50%;font-size:26px;
  background:linear-gradient(135deg, rgba(214,48,58,.2), rgba(46,95,204,.2));
  color:var(--ocre);
}
.hero-card h3{
  text-align:center;font-size:1.5rem;margin-bottom:10px;
  font-weight:500;color:var(--crema);
}
.hero-card .mini{
  text-align:center;color:var(--muted);font-size:.78rem;
  letter-spacing:.16em;text-transform:uppercase;margin-bottom:30px;
}
.hero-card .divisor{
  height:1px;
  background:linear-gradient(90deg,transparent,var(--c-amarillo),transparent);
  margin:22px 0;
}
.ritual-item{
  display:flex;align-items:center;gap:16px;
  padding:12px 0;font-size:.9rem;color:var(--crema-suave);
}
.ritual-item .ico{
  width:34px;height:34px;border-radius:50%;
  border:1px solid var(--borde);
  display:grid;place-items:center;flex-shrink:0;
  color:var(--ocre);font-size:15px;
}
.ritual-item span:last-child{font-weight:300}

/* ---------- SECCIONES ---------- */
section{padding:120px 0;position:relative;z-index:2}
.encabezado{text-align:center;max-width:720px;margin:0 auto 80px}
.etiqueta{
  display:inline-block;font-size:.66rem;font-weight:500;
  letter-spacing:.34em;text-transform:uppercase;
  color:var(--ocre);margin-bottom:20px;
  position:relative;padding:0 30px;
}
.etiqueta::before,
.etiqueta::after{
  content:"";position:absolute;top:50%;width:20px;height:1px;
  background:var(--ocre);opacity:.6;
}
.etiqueta::before{left:0}
.etiqueta::after{right:0}

.encabezado h2{
  font-size:clamp(2rem,4vw,3rem);
  font-weight:500;line-height:1.15;margin-bottom:22px;
  color:var(--crema);
}
.encabezado p{
  color:var(--crema-suave);font-size:1rem;line-height:1.85;font-weight:300;
}

/* pilares */
.pilares{
  display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  border:1px solid var(--borde-suave);
  border-radius:2px;overflow:hidden;
  background:rgba(14,10,7,.5);
  backdrop-filter:blur(12px);
}
.pilar{
  padding:48px 36px;position:relative;
  border-right:1px solid var(--borde-suave);
  transition:background .4s;
}
.pilar:last-child{border-right:none}
.pilar:hover{background:rgba(201,138,63,.04)}
.pilar .num{
  font-family:'Cormorant Garamond',serif;font-size:.85rem;
  letter-spacing:.3em;margin-bottom:22px;font-style:italic;
  color:transparent;
  background:linear-gradient(90deg,var(--c-rojo),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 6s linear infinite;
}
.pilar h3{
  font-size:1.5rem;font-weight:500;margin-bottom:16px;
  color:var(--crema);line-height:1.25;
}
.pilar p{
  color:var(--crema-suave);font-size:.92rem;line-height:1.8;
  font-weight:300;
}

/* ============================================================
   🌿 GALERÍA YAGÉ
   ============================================================ */
.galeria-yage{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
}
.foto-yage{
  position:relative;
  aspect-ratio:3/4;
  border-radius:4px;
  overflow:hidden;
  border:1px solid var(--borde-suave);
  cursor:pointer;
  transition:transform .5s cubic-bezier(.34,1.56,.64,1), border-color .4s;
}
.foto-yage:hover{
  transform:translateY(-8px);
  border-color:var(--borde);
}
.foto-yage img{
  width:100%;height:100%;
  object-fit:cover;
  transition:transform 1s ease, filter .5s;
  filter:saturate(.9) brightness(.85);
}
.foto-yage:hover img{
  transform:scale(1.1);
  filter:saturate(1.1) brightness(1);
}
.foto-yage::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(
    to top,
    rgba(14,10,7,.9) 0%,
    rgba(14,10,7,.3) 40%,
    transparent 70%
  );
  pointer-events:none;
}
.foto-yage .info{
  position:absolute;left:0;right:0;bottom:0;
  padding:22px 20px;
  z-index:2;
}
.foto-yage .info h4{
  font-family:'Cormorant Garamond',serif;
  font-size:1.25rem;font-weight:500;
  color:var(--crema);
  margin-bottom:4px;
  letter-spacing:.02em;
}
.foto-yage .info p{
  font-size:.72rem;
  letter-spacing:.18em;text-transform:uppercase;
  color:transparent;
  background:linear-gradient(90deg,var(--c-amarillo),var(--c-verde));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 6s linear infinite;
  font-weight:500;
}
.foto-yage .marco{
  position:absolute;top:14px;right:14px;
  width:28px;height:28px;
  border:1px solid rgba(244,234,216,.4);
  border-radius:50%;
  display:grid;place-items:center;
  font-size:11px;color:var(--crema);
  background:rgba(14,10,7,.4);
  backdrop-filter:blur(8px);
  z-index:3;
  opacity:0;transition:opacity .4s;
}
.foto-yage:hover .marco{opacity:1}

/* caminos */
.caminos{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
  gap:20px;
}
.camino{
  padding:40px 28px;
  background:linear-gradient(160deg, rgba(58,42,30,.5), rgba(26,20,16,.7));
  border:1px solid var(--borde-suave);
  border-radius:2px;
  text-align:center;
  transition:all .4s ease;
  position:relative;overflow:hidden;
  backdrop-filter:blur(10px);
}
.camino::before{
  content:"";position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:40px;height:2px;
  background:linear-gradient(90deg,var(--c-rojo),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:200% auto;
  animation:arcoiris-mover 4s linear infinite;
  transition:width .4s;
  border-radius:2px;
}
.camino:hover{border-color:var(--borde);transform:translateY(-6px)}
.camino:hover::before{width:100%}
.camino .ico{
  width:64px;height:64px;margin:0 auto 24px;
  display:grid;place-items:center;
  border:1px solid var(--borde);border-radius:50%;
  color:var(--ocre-suave);font-size:26px;
}
.camino h3{
  font-size:1.3rem;font-weight:500;margin-bottom:12px;
  color:var(--crema);
}
.camino p{
  font-size:.85rem;color:var(--muted);line-height:1.7;
  font-weight:300;
}

/* cita */
.cita{
  text-align:center;padding:80px 40px;
  border-top:1px solid var(--borde-suave);
  border-bottom:1px solid var(--borde-suave);
  background:rgba(14,10,7,.4);
  backdrop-filter:blur(10px);
}
.cita .marca{
  font-family:'Cormorant Garamond',serif;
  font-size:5rem;line-height:1;margin-bottom:10px;
  color:transparent;
  background:linear-gradient(90deg,var(--c-rojo),var(--c-naranja),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 6s linear infinite;
  opacity:.7;
}
.cita blockquote{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.4rem,2.6vw,2rem);
  font-style:italic;line-height:1.5;
  color:var(--crema-suave);
  max-width:820px;margin:0 auto 28px;
  font-weight:400;
}
.cita cite{
  font-style:normal;font-size:.72rem;
  letter-spacing:.3em;text-transform:uppercase;
  color:var(--ocre);
}

/* formulario */
.form-card{
  background:linear-gradient(160deg, rgba(58,42,30,.5), rgba(26,20,16,.75));
  border:1px solid var(--borde-suave);
  border-radius:2px;
  padding:52px 46px;
  max-width:680px;margin:0 auto;
  position:relative;
  backdrop-filter:blur(14px);
}
.form-card::before,
.form-card::after{
  content:"";position:absolute;width:32px;height:32px;
  border:1px solid var(--ocre);
}
.form-card::before{top:-1px;left:-1px;border-right:none;border-bottom:none}
.form-card::after{bottom:-1px;right:-1px;border-left:none;border-top:none}

.campo{margin-bottom:24px;text-align:left}
.campo label{
  display:block;font-size:.68rem;font-weight:500;
  color:var(--ocre-suave);margin-bottom:10px;
  letter-spacing:.22em;text-transform:uppercase;
}
.campo input,.campo select,.campo textarea{
  width:100%;padding:14px 18px;
  background:rgba(244,234,216,.03);
  border:1px solid var(--borde-suave);
  border-radius:2px;
  color:var(--crema);font-family:inherit;font-size:.95rem;
  font-weight:300;outline:none;
  transition:border-color .3s, background .3s;
}
.campo textarea{resize:vertical;min-height:110px}
.campo input:focus,.campo select:focus,.campo textarea:focus{
  border-color:var(--c-verde);background:rgba(47,143,78,.06);
}
.campo select option{background:var(--bg-2);color:var(--crema)}
.btn-full{width:100%;margin-top:10px}

/* footer */
footer{
  padding:80px 0 40px;
  border-top:1px solid var(--borde-suave);
  position:relative;z-index:2;
  background:rgba(0,0,0,.35);
  backdrop-filter:blur(12px);
}
.footer-grid{
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;
  gap:50px;margin-bottom:60px;
}
.footer-logo-texto{
  width:220px;height:auto;margin-bottom:22px;
  filter:drop-shadow(0 4px 16px rgba(0,0,0,.5));
}
.footer-logo-circular{
  width:90px;height:90px;object-fit:contain;
  margin-bottom:18px;
  filter:drop-shadow(0 6px 18px rgba(58,107,74,.4));
}
.footer-col h4{
  font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--ocre);margin-bottom:22px;font-weight:500;
  font-family:'Outfit',sans-serif;
}
.footer-col a,.footer-col p{
  display:block;color:var(--muted);text-decoration:none;
  font-size:.88rem;margin-bottom:12px;
  font-weight:300;transition:color .3s;
}
.footer-col a:hover{color:var(--ocre-suave)}
.footer-bottom{
  display:flex;justify-content:space-between;gap:16px;
  flex-wrap:wrap;padding-top:32px;
  border-top:1px solid var(--borde-suave);
  color:var(--muted);font-size:.76rem;
  letter-spacing:.08em;
}

/* whatsapp */
.wa-wrap{
  position:fixed;right:26px;bottom:26px;z-index:9999;
  display:flex;flex-direction:column;align-items:flex-end;gap:14px;
}
.wa-panel{
  width:min(370px,calc(100vw - 40px));
  background:rgba(21,16,11,.96);
  border:1px solid var(--borde);
  border-radius:4px;overflow:hidden;
  backdrop-filter:blur(20px);
  box-shadow:0 30px 80px rgba(0,0,0,.7);
  transform-origin:bottom right;
  animation:aparecer .35s cubic-bezier(.34,1.56,.64,1);
}
@keyframes aparecer{
  from{opacity:0;transform:translateY(20px) scale(.94)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
.wa-head{
  background:linear-gradient(135deg, var(--verde-selva), var(--verde-hoja));
  padding:18px 22px;
  display:flex;align-items:center;gap:14px;
}
.wa-avatar{
  width:46px;height:46px;border-radius:50%;
  overflow:hidden;flex-shrink:0;
  border:1px solid rgba(244,234,216,.4);
  background:rgba(244,234,216,.1);
  display:grid;place-items:center;
}
.wa-avatar img{width:100%;height:100%;object-fit:cover}
.wa-head-txt strong{
  display:block;font-family:'Cormorant Garamond',serif;
  font-size:1.1rem;font-weight:600;
  color:var(--crema);letter-spacing:.05em;
}
.wa-head-txt span{
  font-size:.7rem;color:rgba(244,234,216,.8);
  display:flex;align-items:center;gap:6px;margin-top:2px;
}
.wa-head-txt span i{
  width:6px;height:6px;border-radius:50%;
  background:#a8e6b8;display:inline-block;
  animation:latido 2s infinite;
}
.wa-cerrar{
  margin-left:auto;background:rgba(244,234,216,.12);
  border:none;color:var(--crema);
  width:30px;height:30px;border-radius:50%;
  cursor:pointer;font-size:13px;
  display:grid;place-items:center;
  transition:all .3s;
}
.wa-cerrar:hover{background:rgba(244,234,216,.25);transform:rotate(90deg)}

.wa-body{
  padding:22px;max-height:300px;overflow-y:auto;
  background:rgba(14,10,7,.6);
}
.wa-body::-webkit-scrollbar{width:4px}
.wa-body::-webkit-scrollbar-thumb{background:var(--borde);border-radius:10px}

.burbuja{
  background:rgba(244,234,216,.05);
  border:1px solid var(--borde-suave);
  border-radius:2px 14px 14px 14px;
  padding:14px 16px;font-size:.9rem;
  line-height:1.6;color:var(--crema-suave);
  margin-bottom:18px;font-weight:300;
}
.burbuja b{
  color:transparent;
  background:linear-gradient(90deg,var(--c-amarillo),var(--c-verde));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;
  animation:arcoiris-mover 5s linear infinite;
  font-weight:600;
}

.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{
  background:transparent;
  border:1px solid var(--borde);
  color:var(--ocre-suave);
  padding:9px 16px;border-radius:100px;
  font-size:.74rem;font-family:inherit;
  letter-spacing:.06em;cursor:pointer;
  transition:all .3s;font-weight:400;
}
.chip:hover{
  background:linear-gradient(100deg,var(--c-rojo),var(--c-naranja),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:300% auto;
  animation:arcoiris-mover 5s linear infinite;
  color:#fff;border-color:transparent;
}

.wa-foot{
  padding:14px;display:flex;gap:10px;
  border-top:1px solid var(--borde-suave);
  background:rgba(21,16,11,.9);
}
.wa-foot input{
  flex:1;padding:12px 18px;border-radius:100px;
  background:rgba(244,234,216,.05);
  border:1px solid var(--borde-suave);
  color:var(--crema);font-family:inherit;
  font-size:.88rem;outline:none;
  font-weight:300;transition:border-color .3s;
}
.wa-foot input:focus{border-color:var(--c-verde)}
.wa-enviar{
  width:44px;height:44px;border-radius:50%;
  border:1px solid var(--ocre);
  background:transparent;color:var(--ocre);
  cursor:pointer;font-size:16px;
  display:grid;place-items:center;flex-shrink:0;
  transition:all .3s;
}
.wa-enviar:hover{
  background:linear-gradient(100deg,var(--c-rojo),var(--c-naranja),var(--c-amarillo),var(--c-verde),var(--c-azul));
  background-size:300% auto;
  animation:arcoiris-mover 5s linear infinite;
  color:#fff;border-color:transparent;
  transform:scale(1.05);
}

.wa-btn{
  width:60px;height:60px;border-radius:50%;
  border:1px solid var(--ocre);
  background:rgba(14,10,7,.95);
  cursor:pointer;display:grid;place-items:center;
  position:relative;
  backdrop-filter:blur(10px);
  box-shadow:0 10px 30px rgba(0,0,0,.5);
  transition:transform .35s cubic-bezier(.34,1.56,.64,1);
}
.wa-btn:hover{transform:scale(1.08)}
.wa-btn svg{width:28px;height:28px;fill:var(--ocre);transition:transform .4s}
.wa-btn.abierto svg{transform:rotate(90deg) scale(.9)}

.wa-btn::before{
  content:"";position:absolute;inset:0;border-radius:50%;
  border:1px solid var(--c-verde);
  animation:onda 3s infinite;
}
@keyframes onda{
  0%{transform:scale(1);opacity:.7}
  100%{transform:scale(1.7);opacity:0}
}
.wa-btn.abierto::before{display:none}

.wa-badge{
  position:absolute;top:-2px;right:-2px;
  width:20px;height:20px;border-radius:50%;
  background:var(--c-rojo);color:#fff;
  font-size:.66rem;font-weight:700;
  display:grid;place-items:center;
  border:2px solid var(--bg);
}
.wa-tooltip{
  position:absolute;right:74px;top:50%;transform:translateY(-50%);
  background:rgba(21,16,11,.98);
  border:1px solid var(--borde);
  padding:10px 18px;border-radius:2px;
  font-size:.8rem;white-space:nowrap;
  color:var(--crema-suave);letter-spacing:.05em;
  animation:aparecer .3s ease;
  pointer-events:none;font-weight:300;
}

[data-reveal]{
  opacity:0;transform:translateY(36px);
  transition:opacity 1s cubic-bezier(.16,1,.3,1),
             transform 1s cubic-bezier(.16,1,.3,1);
}
[data-reveal].visible{opacity:1;transform:none}

@media(max-width:980px){
  .hero-grid{grid-template-columns:1fr;gap:60px}
  .pilares{grid-template-columns:1fr}
  .pilar{border-right:none;border-bottom:1px solid var(--borde-suave)}
  .pilar:last-child{border-bottom:none}
  .footer-grid{grid-template-columns:1fr 1fr;gap:40px}
  .galeria-yage{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:760px){
  .nav-links{
    position:fixed;top:0;right:0;height:100vh;
    width:min(300px,82vw);
    background:rgba(14,10,7,.98);
    backdrop-filter:blur(20px);
    flex-direction:column;justify-content:center;
    gap:34px;transform:translateX(100%);
    transition:transform .45s cubic-bezier(.16,1,.3,1);
    border-left:1px solid var(--borde-suave);
  }
  .nav-links.abierto{transform:translateX(0)}
  .nav-links a{font-size:1rem}
  .burger{display:block;z-index:101}
  .btn-nav{display:none}
  .stats{gap:32px}
  .form-card{padding:32px 24px}
  .footer-grid{grid-template-columns:1fr;gap:32px}
  .wa-wrap{right:16px;bottom:16px}
  .wa-tooltip{display:none}
  section{padding:80px 0}
  .hero-logo-texto{width:min(320px,90%)}
}
@media(max-width:460px){
  .hero{padding:150px 0 70px}
  .cita{padding:60px 20px}
  .form-card{padding:28px 20px}
  .logo-img{width:48px;height:48px}
  .footer-logo-texto{width:180px}
  .galeria-yage{grid-template-columns:1fr;gap:14px}
  .foto-yage{aspect-ratio:4/3}
}
/* ============================================================
   🎬 VIDEOS EN PILARES
   ============================================================ */
.pilar .video-pilar{
  position:relative;
  width:100%;
  aspect-ratio:4/3;
  margin-bottom:26px;
  border-radius:3px;
  overflow:hidden;
  border:1px solid var(--borde-suave);
  background:rgba(0,0,0,.4);
  transition:border-color .4s, transform .4s;
}
.pilar:hover .video-pilar{
  border-color:var(--borde);
}
.pilar .video-pilar::before{
  content:"";
  position:absolute;inset:0;
  background:linear-gradient(
    to top,
    rgba(14,10,7,.55) 0%,
    transparent 45%
  );
  pointer-events:none;
  z-index:2;
}
.pilar .video-pilar video{
  width:100%;height:100%;
  object-fit:cover;
  display:block;
  filter:saturate(.92) brightness(.92);
  transition:transform .8s ease, filter .5s;
}
.pilar:hover .video-pilar video{
  transform:scale(1.06);
  filter:saturate(1.05) brightness(1);
}
.pilar .video-pilar .marca-video{
  position:absolute;top:12px;right:12px;
  z-index:3;
  width:26px;height:26px;
  border-radius:50%;
  border:1px solid rgba(244,234,216,.4);
  background:rgba(14,10,7,.45);
  backdrop-filter:blur(8px);
  display:grid;place-items:center;
  font-size:10px;
  color:var(--ocre-suave);
  letter-spacing:.05em;
}
@media(max-width:760px){
  .pilar .video-pilar{aspect-ratio:16/9}
}`;

/* ============================================================
   HOOK REVEAL
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   ICONO WHATSAPP
   ============================================================ */
function IconoWA({ chico }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={chico ? { width: 16, height: 16, fill: "currentColor" } : undefined}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Inicio", "#inicio"],
    ["Quiénes Somos", "#quienes"],
    ["Yagé", "#yage"],
    ["Caminos", "#caminos"],
    ["Reservas", "#reservas"],
  ];

  return (
    <nav className={`nav ${solido ? "solido" : ""}`}>
      <div className="contenedor nav-inner">
        <a href="#inicio" className="logo">
          <img
            src="/logo.png"
            alt="WAIQUE"
            className="logo-img"
          />
        
        </a>

        <div className={`nav-links ${abierto ? "abierto" : ""}`}>
          {links.map(([txt, href]) => (
            <a key={href} href={href} onClick={() => setAbierto(false)}>
              {txt}
            </a>
          ))}
        </div>

        <button className="btn-nav" onClick={() => abrirWhatsApp()}>
          <IconoWA chico /> Contacto
        </button>

        <button
          className="burger"
          onClick={() => setAbierto(!abierto)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="contenedor hero-grid">
        <div>
          <div className="pill">
            <span className="punto" /> Casa de Medicina Ancestral · Maloka
          </div>

          <h1 className="titulo">
            Custodios de la{" "}
            <span className="arcoiris-texto">sabiduría</span> que la selva nos
            heredó
          </h1>

          <span className="titulo-linea" />

          <p className="sub">
            Somos una <strong>Maloka y Casa de Medicina Ancestral</strong>{" "}
            dedicada al resguardo de la sabiduría indígena. Nuestro altar
            custodia el compartir del remedio sagrado del{" "}
            <strong>Yagé / Ayahuasca</strong>, concebido no solo como una
            planta, sino como el espíritu de la selva viviente que limpia el
            cuerpo, expande la conciencia y sana los lazos invisibles de
            nuestra historia.
          </p>

          <div className="hero-botones">
            <button
              className="btn btn-primario"
              onClick={() =>
                abrirWhatsApp(
                  "¡Hola WAIQUE! 🌿 Quisiera conocer más sobre las ceremonias y agendar mi visita."
                )
              }
            >
              <IconoWA chico /> Contactar por WhatsApp
            </button>
            <a href="#yage" className="btn btn-secundario">
              Ver la medicina
            </a>
          </div>

          <div className="stats">
            <div className="stat">
              <strong>Ancestral</strong>
              <span>Sabiduría viva</span>
            </div>
            <div className="stat">
              <strong>Sagrado</strong>
              <span>Espacio ceremonial</span>
            </div>
            <div className="stat">
              <strong>Seguro</strong>
              <span>Acompañamiento</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="simbolo">✦</div>
          <h3>Caminos de sanación</h3>
          <p className="mini">Tradición · Medicina · Espíritu</p>

          <div className="divisor" />

          <div className="ritual-item">
            <span className="ico">🌿</span>
            <span>Remedio sagrado del Yagé</span>
          </div>
          <div className="ritual-item">
            <span className="ico">🔥</span>
            <span>Tabaco sagrado para centrar</span>
          </div>
          <div className="ritual-item">
            <span className="ico">🌬️</span>
            <span>Mambé y ambil para endulzar</span>
          </div>
          <div className="ritual-item">
            <span className="ico">🍃</span>
            <span>Soplado de plantas y protección</span>
          </div>
          <div className="ritual-item">
            <span className="ico">🎵</span>
            <span>Ícaros que ordenan el espíritu</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   QUIÉNES SOMOS
   ============================================================ */
function QuienesSomos() {
  return (
    <section id="quienes">
      <div className="contenedor">
        <div className="encabezado" data-reveal>
          <span className="etiqueta">Quiénes Somos</span>
          <h2>
            Un altar que <span className="arcoiris-texto">custodia</span> la
            memoria viva
          </h2>
          <p>
            WAIQUE es un espacio consagrado al resguardo de la sabiduría
            indígena. Aquí la medicina no es solo planta: es presencia, es
            espíritu, es camino.
          </p>
        </div>

        <div className="pilares" data-reveal>
          <div className="pilar">
            <div className="video-pilar">
              <video
                src="/video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="marca-video">✦</span>
            </div>
            <div className="num">I</div>
            <h3>Guardianes del saber</h3>
            <p>
              Guiados por el fuego sagrado y los guardianes del conocimiento
              milenario, abrimos las puertas de nuestro espacio para caminar
              juntos hacia el despertar de la conciencia.
            </p>
          </div>

          <div className="pilar">
            <div className="video-pilar">
              <video
                src="/video2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="marca-video">✦</span>
            </div>
            <div className="num">II</div>
            <h3>La selva viviente</h3>
            <p>
              Concebimos el remedio del Yagé no solo como una planta, sino como
              el espíritu de la selva que limpia el cuerpo, expande la
              conciencia y sana los lazos invisibles de nuestra historia.
            </p>
          </div>

          <div className="pilar">
            <div className="video-pilar">
              <video
                src="/video3.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="marca-video">✦</span>
            </div>
            <div className="num">III</div>
            <h3>El tejido de la cura</h3>
            <p>
              Comprendemos la cura como un tejido integral donde el cuerpo
              físico, la mente y el alma se reconcilian con el orden natural
              del universo. Nacemos bajo el cobijo de la abundancia de la
              tierra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   🌿 GALERÍA YAGÉ / AYAHUASCA
   ============================================================ */
const FOTOS_YAGE = [
  {
    src: "/img/yage-1.jpg",
    titulo: "La Liana Sagrada",
    subtitulo: "Banisteriopsis caapi",
  },
  {
    src: "/img/yage-2.jpg",
    titulo: "Hojas de Chacruna",
    subtitulo: "Psychotria viridis",
  },
  {
    src: "/img/yage-4.jpg",
    titulo: "La Preparación",
    subtitulo: "Cocción ceremonial",
  },
  {
    src: "/img/yage-3.jpeg",
    titulo: "La Maloka",
    subtitulo: "Espacio sagrado",
  },
];

function GaleriaYage() {
  return (
    <section id="yage">
      <div className="contenedor">
        <div className="encabezado" data-reveal>
          <span className="etiqueta">La Medicina</span>
          <h2>
            El <span className="arcoiris-texto">Yagé</span> y su espíritu
            viviente
          </h2>
          <p>
            La sagrada medicina del Yagé (Ayahuasca) es un tejido entre la
            liana y la hoja: dos plantas que juntas abren las puertas del
            alma. Aquí te compartimos algunos rostros de esta sabiduría.
          </p>
        </div>

        <div className="galeria-yage">
          {FOTOS_YAGE.map((f, i) => (
            <div
              key={f.titulo}
              className="foto-yage"
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() =>
                abrirWhatsApp(
                  `¡Hola WAIQUE! 🌿 Me interesa saber más sobre "${f.titulo}" (${f.subtitulo}).`
                )
              }
            >
              <img src={f.src} alt={f.titulo} loading="lazy" />
              <div className="marco">✦</div>
              <div className="info">
                <h4>{f.titulo}</h4>
                <p>{f.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CAMINOS
   ============================================================ */
const CAMINOS = [
  {
    ico: "🌿",
    titulo: "Yagé / Ayahuasca",
    texto:
      "El remedio sagrado de la selva. Medicina de limpieza profunda, expansión de conciencia y sanación del alma.",
  },
  {
    ico: "🔥",
    titulo: "Tabaco Sagrado",
    texto:
      "El poder del tabaco para centrar el pensamiento y sostener la presencia durante el camino.",
  },
  {
    ico: "🌬️",
    titulo: "Mambé y Ambil",
    texto:
      "El misticismo del mambé y el ambil para endulzar la palabra y abrir el corazón a la escucha.",
  },
  {
    ico: "🍃",
    titulo: "Soplado de Plantas",
    texto:
      "Protección del campo energético a través del soplado de plantas, limpieza y resguardo del espíritu.",
  },
  {
    ico: "🎵",
    titulo: "Ícaros",
    texto:
      "Cantos medicinales que ordenan el espíritu y tejen armonía en cada ceremonia.",
  },
];

function Caminos() {
  return (
    <section id="caminos">
      <div className="contenedor">
        <div className="encabezado" data-reveal>
          <span className="etiqueta">Qué Hacemos</span>
          <h2>
            Cinco caminos, <span className="arcoiris-texto">una sola sanación</span>
          </h2>
          <p>
            Esta sagrada medicina se entrelaza de manera armónica con toda la
            sabiduría médica ancestral.
          </p>
        </div>

        <div className="caminos">
          {CAMINOS.map((c, i) => (
            <article
              key={c.titulo}
              className="camino"
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="ico">{c.ico}</div>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CITA
   ============================================================ */
function Cita() {
  return (
    <section id="ceremonias" style={{ padding: 0 }}>
      <div className="contenedor">
        <div className="cita" data-reveal>
          <div className="marca">"</div>
          <blockquote>
            El universo teje su orden en cada ser. Caminamos juntos hacia la
            luz del despertar.
          </blockquote>
          <cite>— WAIQUE · Maloka Ancestral</cite>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   RESERVAS
   ============================================================ */
function Reservas() {
  const [nombre, setNombre] = useState("");
  const [ceremonia, setCeremonia] = useState("Ceremonia de Yagé / Ayahuasca");
  const [personas, setPersonas] = useState("1");
  const [fecha, setFecha] = useState("");
  const [nota, setNota] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    const texto =
      `¡Hola WAIQUE! 🌿\n\n` +
      `👤 Nombre: ${nombre || "No especificado"}\n` +
      `✦ Ceremonia: ${ceremonia}\n` +
      `👥 Personas: ${personas}\n` +
      `📅 Fecha: ${fecha || "Por definir"}\n` +
      `📝 Nota: ${nota || "Sin novedades"}\n\n` +
      `¿Me confirman disponibilidad y orientación?`;
    abrirWhatsApp(texto);
  };

  return (
    <section id="reservas">
      <div className="contenedor">
        <div className="encabezado" data-reveal>
          <span className="etiqueta">Ceremonias</span>
          <h2>
            Agenda tu <span className="arcoiris-texto">encuentro</span> con la
            medicina
          </h2>
          <p>
            Cuéntanos tu intención y te acompañamos paso a paso. Toda reserva
            incluye orientación previa.
          </p>
        </div>

        <form className="form-card" data-reveal onSubmit={enviar}>
          <div className="campo">
            <label>Tu nombre</label>
            <input
              type="text"
              placeholder="Ej: María González"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Tipo de ceremonia</label>
            <select
              value={ceremonia}
              onChange={(e) => setCeremonia(e.target.value)}
            >
              <option>Ceremonia de Yagé / Ayahuasca</option>
              <option>Soplado de plantas (limpieza)</option>
              <option>Ceremonia de tabaco sagrado</option>
              <option>Encuentro con ícaros</option>
              <option>Retiro de fin de semana</option>
              <option>Acompañamiento personal</option>
              <option>Otra consulta</option>
            </select>
          </div>

          <div className="campo">
            <label>Número de personas</label>
            <select
              value={personas}
              onChange={(e) => setPersonas(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>+5 (grupo)</option>
            </select>
          </div>

          <div className="campo">
            <label>Fecha deseada</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Cuéntanos tu intención</label>
            <textarea
              placeholder="¿Qué te trae a la maloka? ¿Has participado antes en ceremonias?"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primario btn-full">
            <IconoWA chico /> Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function CTA() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="contenedor">
        <div
          className="cita"
          data-reveal
          style={{ border: "1px solid var(--borde)", padding: "80px 40px" }}
        >
          <div className="marca" style={{ marginBottom: 4 }}>
            ✦
          </div>
          <blockquote style={{ marginBottom: 34 }}>
            Los guardianes del saber te esperan. Da el primer paso hacia el
            despertar de la conciencia.
          </blockquote>
          <button className="btn btn-primario" onClick={() => abrirWhatsApp()}>
            <IconoWA chico /> Hablar con WAIQUE
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer>
      <div className="contenedor">
        <div className="footer-grid">
          <div className="footer-col">
          
            <img
              src="/texto-waique.jpeg"
              alt="WAIQUE - Casa de Medicina Ancestral"
              className="footer-logo-texto"
            />
            <p style={{ lineHeight: 1.8, maxWidth: 320 }}>
              Maloka y Casa de Medicina Ancestral dedicada al resguardo de la
              sabiduría indígena.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navegación</h4>
            <a href="#inicio">Inicio</a>
            <a href="#quienes">Quiénes Somos</a>
            <a href="#yage">Yagé</a>
            <a href="#caminos">Caminos</a>
            <a href="#reservas">Reservas</a>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                abrirWhatsApp();
              }}
            >
              WhatsApp
            </a>
            <a href="tel:+573112341373">+57 311 234 1373</a>
            <a href="mailto:waiqueespiritual@gmail.com">waiqueespiritual@gmail.com</a>
          </div>

          <div className="footer-col">
  <h4>Síguenos</h4>
  <a
    href="https://www.instagram.com/waiqueespiritual"
    target="_blank"
    rel="noopener noreferrer"
  >
    📷 Instagram
  </a>
  <a
    href="https://www.facebook.com/waiqueespiritual"
    target="_blank"
    rel="noopener noreferrer"
  >
    👍 Facebook
  </a>
  <a
    href="https://www.tiktok.com/@waiqueespiritual"
    target="_blank"
    rel="noopener noreferrer"
  >
    🎵 TikTok
  </a>
</div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} WAIQUE · Maloka Ancestral. Todos los
            derechos reservados.
          </span>
          <span>Caminamos juntos hacia la luz del despertar ✦</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   WHATSAPP FLOTANTE
   ============================================================ */
const ATAJOS = [
  {
    txt: "🌿 Ceremonia de Yagé",
    msg: "¡Hola WAIQUE! 🌿 Quisiera información sobre la ceremonia de Yagé / Ayahuasca.",
  },
  {
    txt: "✦ Ceremonias y fechas",
    msg: "¡Hola! Quisiera conocer las próximas fechas de ceremonias ✦",
  },
  {
    txt: "🍃 Soplado de plantas",
    msg: "¡Hola! Me interesa el soplado de plantas para limpieza energética 🍃",
  },
  {
    txt: "📍 Ubicación",
    msg: "¡Hola! ¿Dónde se encuentra la maloka y cómo llegar? 📍",
  },
  {
    txt: "💬 Orientación previa",
    msg: "¡Hola! Me gustaría recibir orientación antes de agendar una ceremonia 💬",
  },
];

function WhatsAppFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tooltip, setTooltip] = useState(false);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    if (visto) return;
    const t = setTimeout(() => setTooltip(true), 3500);
    const t2 = setTimeout(() => setTooltip(false), 9500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [visto]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => {
    setAbierto((v) => !v);
    setTooltip(false);
    setVisto(true);
  };

  const enviar = () => {
    if (!mensaje.trim()) return;
    abrirWhatsApp(mensaje);
    setMensaje("");
  };

  return (
    <div className="wa-wrap">
      {abierto && (
        <div className="wa-panel" role="dialog" aria-label="Chat de WhatsApp">
          <div className="wa-head">
            <div className="wa-avatar">
              <img src="/logo.png" alt="WAIQUE" />
            </div>
            <div className="wa-head-txt">
              <strong>WAIQUE</strong>
              <span>
                <i /> En línea · Maloka Ancestral
              </span>
            </div>
            <button
              className="wa-cerrar"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="wa-body">
            <div className="burbuja">
              Paz y bien, hermano/a. 🌿 Te damos la bienvenida a <b>WAIQUE</b>,
              Maloka y Casa de Medicina Ancestral. ¿En qué podemos orientarte?
            </div>

            <div className="chips">
              {ATAJOS.map((a) => (
                <button
                  key={a.txt}
                  className="chip"
                  onClick={() => {
                    abrirWhatsApp(a.msg);
                    setVisto(true);
                  }}
                >
                  {a.txt}
                </button>
              ))}
            </div>
          </div>

          <div className="wa-foot">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviar()}
            />
            <button className="wa-enviar" onClick={enviar} aria-label="Enviar">
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        className={`wa-btn ${abierto ? "abierto" : ""}`}
        onClick={toggle}
        aria-label="Abrir chat"
      >
        {abierto ? (
          <span style={{ fontSize: 20, color: "var(--ocre)" }}>✕</span>
        ) : (
          <IconoWA />
        )}
        {!visto && !abierto && <span className="wa-badge">1</span>}
        {tooltip && !abierto && (
          <span className="wa-tooltip">¿Te orientamos? Escríbenos ✦</span>
        )}
      </button>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  useReveal();

  return (
    <>
      <style>{css}</style>

      {/* 🌈 Fondo chamánico con colores girando */}
      <div className="fondo-chaman" />
      <div className="grano" />

      {/* Orbes de colores flotantes */}
      <div className="orbe o1" />
      <div className="orbe o2" />
      <div className="orbe o3" />
      <div className="orbe o4" />

      <Navbar />
      <Hero />
      <QuienesSomos />
      <GaleriaYage />
      <Caminos />
      <Cita />
      <Reservas />
      <CTA />
      <Footer />
      <WhatsAppFlotante />

      {/* 🍪 Sistema de cookies */}
      <Cookies />
    </>
  );
}
