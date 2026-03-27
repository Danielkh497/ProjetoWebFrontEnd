const horarios = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00"
];

// null = livre | string = nome
let estado = {};
horarios.forEach(h => estado[h] = null);

const campo1 = document.getElementById("campo1");
const campo2 = document.getElementById("campo2");
const campo3 = document.getElementById("campo3");

// 🔹 ESQUERDA → horários
function renderHorarios() {
  campo1.innerHTML = "";

  horarios.forEach(hora => {
    const div = document.createElement("div");
    div.classList.add("horario");

    if (estado[hora]) {
      div.classList.add("ocupado");
      div.textContent = `${hora} - Ocupado`;
    } else {
      div.classList.add("livre");
      div.textContent = `${hora} - Livre`;

      div.onclick = () => abrirConfirmacao(hora);
    }

    campo1.appendChild(div);
  });
}

// 🔹 DIREITA → reservas
function renderReservas() {
  campo3.innerHTML = "";

  horarios.forEach(hora => {
    if (estado[hora]) {
      const div = document.createElement("div");
      div.classList.add("reserva-item");
      div.textContent = `${hora} - ${estado[hora]}`;
      campo3.appendChild(div);
    }
  });
}

// 🔹 MEIO → confirmação
function abrirConfirmacao(hora) {
  campo2.innerHTML = `
    <div class="confirm-box">
      <p>Reservar <strong>${hora}</strong></p>
      <input type="text" id="nome" placeholder="Seu nome" />
      <br>
      <button class="confirmar">Confirmar</button>
      <button class="cancelar">Cancelar</button>
    </div>
  `;

  document.querySelector(".confirmar").onclick = () => {
    const nome = document.getElementById("nome").value;

    if (!nome) {
      alert("Digite um nome!");
      return;
    }

    estado[hora] = nome;

    campo2.innerHTML = "<p class='info'>Reservado!</p>";

    renderHorarios();
    renderReservas();
  };

  document.querySelector(".cancelar").onclick = () => {
    campo2.innerHTML = "";
  };
}

// iniciar
renderHorarios();
renderReservas();