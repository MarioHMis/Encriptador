//-------Selección de Elementos-------//
const btnEncriptar = document.querySelector("#encrypt-btn");
const btnDesencriptar = document.querySelector("#decrypt-btn");
const txtEncriptar = document.querySelector("#input-text");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector("#output-text");
const btnCopiar = document.querySelector(".btn-copiar");
const contenido = document.querySelector(".tarjeta-contenedor");

// Función para mostrar aviso
const mostrarAviso = (mensaje) => {
  aviso.style.background = "#0A3871";
  aviso.style.color = "#FFFF";
  aviso.style.fontWeight = "800";
  aviso.textContent = mensaje;

  setTimeout(() => {
    aviso.removeAttribute("style");
  }, 1500);
};

// Función para encriptar o desencriptar texto
const procesarTexto = (encriptar) => {
  let texto = txtEncriptar.value.trim();
  const textoNormalizado = texto
    .normalize("NFD")
    .replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");

  if (texto === "") {
    mostrarAviso("El campo de texto no debe estar vacio");
    return;
  } else if (texto !== textoNormalizado) {
    mostrarAviso("No debe tener acentos y caracteres especiales");
    return;
  } else if (texto !== texto.toLowerCase()) {
    mostrarAviso("El texto debe ser todo en minúscula");
    return;
  }

  const reemplazos = encriptar
    ? { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" }
    : { enter: "e", imes: "i", ai: "a", ober: "o", ufat: "u" };

  texto = texto.replace(
    new RegExp(Object.keys(reemplazos).join("|"), "g"),
    (match) => reemplazos[match]
  );

  respuesta.textContent = texto;
  btnCopiar.style.visibility = "inherit";
  contenido.remove();
};

//-------Boton de Encriptar-------//
btnEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  procesarTexto(true);
});

//-------Boton de Desencriptar-------//
btnDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  procesarTexto(false);
});

//-------Boton de Copiar-------//
btnCopiar.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await navigator.clipboard.writeText(respuesta.textContent);
    console.log("Texto copiado con éxito!");
  } catch (err) {
    console.error("Error al copiar el texto:", err);
  }
});
