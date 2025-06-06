// script.js mejorado

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginContainer = document.getElementById("login-container");
  const app = document.getElementById("app");
  const errorMsg = document.getElementById("login-error");
  const togglePass = document.getElementById("toggle-pass");
  const toast = document.getElementById("toast");

  const USUARIO = "admin";
  const CONTRASENA = "1234";

  togglePass.addEventListener("click", () => {
    const passInput = document.getElementById("contrasena");
    passInput.type = passInput.type === "password" ? "text" : "password";
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contrasena").value;

    if (user === USUARIO && pass === CONTRASENA) {
      loginContainer.classList.add("oculto");
      app.classList.remove("oculto");
      cargarTareas();
    } else {
      errorMsg.classList.remove("oculto");
    }
  });

  const form = document.getElementById("form-tarea");
  const lista = document.getElementById("lista-tareas");

  function mostrarToast(msg) {
    toast.textContent = msg;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2000);
  }

  function guardarTareas() {
    localStorage.setItem("tareas", lista.innerHTML);
  }

  function cargarTareas() {
    lista.innerHTML = localStorage.getItem("tareas") || "";
    document.querySelectorAll("#lista-tareas button").forEach(btn => {
      btn.addEventListener("click", function () {
        btn.parentElement.classList.add("eliminando");
        setTimeout(() => {
          btn.parentElement.remove();
          guardarTareas();
        }, 300);
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const texto = document.getElementById("tarea").value;
    const fecha = document.getElementById("fecha").value;
    const prioridad = document.getElementById("prioridad").value;

    const hoy = new Date();
    const fechaTarea = new Date(fecha);
    const diferenciaDias = Math.ceil((fechaTarea - hoy) / (1000 * 60 * 60 * 24));

    const item = document.createElement("li");
    item.textContent = `${texto} - vence el ${fecha} - prioridad: ${prioridad}`;
    item.classList.add(`prioridad-${prioridad}`);

    if (diferenciaDias <= 2) {
      item.classList.add("urgente");
    }

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function () {
      item.classList.add("eliminando");
      setTimeout(() => {
        item.remove();
        guardarTareas();
      }, 300);
    });

    item.appendChild(btnEliminar);
    lista.appendChild(item);
    form.reset();
    guardarTareas();
    mostrarToast("¡Tarea agregada!");
  });
});
