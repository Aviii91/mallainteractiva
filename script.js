const materias = [
  { id: "calculo1a", nombre: "Cálculo 1A", requisitos: [], anio: 1 },
  { id: "calculo1b", nombre: "Cálculo 1B", requisitos: ["calculo1a"], anio: 1 },

  { id: "cont1", nombre: "Contabilidad Gral I", requisitos: [], anio: 1 },
  { id: "cont2", nombre: "Contabilidad Gral II", requisitos: ["cont1"], anio: 2 },
  { id: "cont3", nombre: "Contabilidad Gral III", requisitos: ["cont2"], anio: 2 },

  { id: "der1", nombre: "Derecho y AE I", requisitos: [], anio: 1 },
  { id: "der2", nombre: "Derecho y AE II", requisitos: ["der1"], anio: 2 },

  { id: "trib1", nombre: "Tributaria I", requisitos: [], anio: 3 },
  { id: "trib2", nombre: "Tributaria II", requisitos: ["trib1"], anio: 4 },

  { id: "otras1", nombre: "Otras Materias Año 1", requisitos: [], anio: 1 },
  { id: "otras2", nombre: "Otras Materias Año 2", requisitos: ["otras1"], anio: 2 },
  { id: "otras3", nombre: "Otras Materias Año 3", requisitos: ["otras2"], anio: 3 },
  { id: "otras4", nombre: "Otras Materias Año 4", requisitos: ["otras3"], anio: 4 },
];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.textContent = m.nombre;
    div.dataset.id = m.id;
    contenedor.appendChild(div);
  });
  actualizarEstados();
}

function actualizarEstados() {
  const aprobadas = new Set(
    [...document.querySelectorAll(".materia.aprobada")].map(m => m.dataset.id)
  );

  materias.forEach(m => {
    const div = document.querySelector(`[data-id='${m.id}']`);
    const desbloqueada = m.requisitos.every(r => aprobadas.has(r));

    // desbloqueo por año completo
    if (!desbloqueada && m.requisitos.length === 1 && m.requisitos[0].startsWith("otras")) {
      const prevAnio = m.anio - 1;
      const otrasPrev = materias.filter(mat => mat.anio === prevAnio && mat.id.startsWith("otras"));
      if (otrasPrev.every(mat => aprobadas.has(mat.id))) {
        div.classList.remove("bloqueada");
        return;
      }
    }

    if (desbloqueada) {
      div.classList.remove("bloqueada");
    } else {
      div.classList.add("bloqueada");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  crearMalla();

  document.getElementById("malla").addEventListener("click", e => {
    if (e.target.classList.contains("materia") && !e.target.classList.contains("bloqueada")) {
      e.target.classList.toggle("aprobada");
      actualizarEstados();
    }
  });
});

