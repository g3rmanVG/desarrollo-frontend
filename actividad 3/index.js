function validarFormulario() {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const objetivo = document.getElementById("objetivo");
  const suscripciones = document.getElementById("suscripciones");

  const labelNombre = document.getElementById("labelNombre");
  const labelEmail = document.getElementById("labelEmail");
  const labelTelefono = document.getElementById("labelTelefono");
  const labelObjetivo = document.getElementById("labelObjetivo");
  const labelSuscripciones = document.getElementById("labelSuscripciones");
  const labelServicios = document.getElementById("labelServicios");

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  let alMenosUnoMarcado = false;
  checkboxes.forEach(c => {
    if (c.checked) alMenosUnoMarcado = true;
  });

  labelServicios.style.color = alMenosUnoMarcado ? "green" : "red";

  function validarCampo(campo, etiqueta) {
    if (campo.value.trim() === "") {
      campo.style.border = "2px solid red";
      etiqueta.style.color = "red";
      return false;
    } else {
      campo.style.border = "2px solid green";
      etiqueta.style.color = "green";
      return true;
    }
  }

  function validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.style.border = "2px solid red";
      labelEmail.style.color = "red";
      return false;
    } else {
      email.style.border = "2px solid green";
      labelEmail.style.color = "green";
      return true;
    }
  }

  function validarTelefono() {
    const telRegex = /^\d{10}$/;
    if (!telRegex.test(telefono.value.trim())) {
      telefono.style.border = "2px solid red";
      labelTelefono.style.color = "red";
      return false;
    } else {
      telefono.style.border = "2px solid green";
      labelTelefono.style.color = "green";
      return true;
    }
  }

  let nombreValido = validarCampo(nombre, labelNombre);
  let emailValido = validarEmail();
  let telefonoValido = validarTelefono();
  let objetivoValido = validarCampo(objetivo, labelObjetivo);

  let suscripcionValida = true;
  if (suscripciones.value === "") {
    suscripciones.style.border = "2px solid red";
    labelSuscripciones.style.color = "red";
    suscripcionValida = false;
  } else {
    suscripciones.style.border = "2px solid green";
    labelSuscripciones.style.color = "green";
  }

  const formularioValido =
    nombreValido &&
    emailValido &&
    telefonoValido &&
    objetivoValido &&
    suscripcionValida &&
    alMenosUnoMarcado;

  if (formularioValido) {
    const contenedor = document.getElementById("listaClientes");

    const clienteDiv = document.createElement("div");

    const serviciosSeleccionados = [];
    checkboxes.forEach(c => {
      if (c.checked) {
        serviciosSeleccionados.push(c.parentElement.textContent.trim());
      }
    });

    const datosCliente = document.createElement("div");
    datosCliente.className = "datos-cliente";
    datosCliente.innerHTML = `
    <div><strong>Nombre:</strong> ${nombre.value}</div>
    <div><strong>Email:</strong> ${email.value}</div>
    <div><strong>Teléfono:</strong> ${telefono.value}</div>
    <div><strong>Objetivo:</strong> ${objetivo.value}</div>
    <div><strong>Suscripción:</strong> ${suscripciones.value}</div>
    <div><strong>Servicios:</strong> ${serviciosSeleccionados.join(", ")}</div>
    `;

    clienteDiv.appendChild(datosCliente);
    
    // Crear el botón para eliminar 
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "❌ Eliminar";
    botonBorrar.className = "boton-eliminar"

    // Agregamos el evento al botón para que se elimine
    botonBorrar.addEventListener("click", () => {
        const confirmar = confirm("¿Seguro que quieres eliminar este cliente?");
        if (confirmar) {
            clienteDiv.remove();
        }
    });
    // agregamos el botón a su respectivo contenedor cliente
    clienteDiv.appendChild(botonBorrar);

    contenedor.appendChild(clienteDiv);

    document.getElementById("formulario").reset();

    [nombre, email, telefono, objetivo, suscripciones].forEach(campo => {
      campo.style.border = "";
    });

    [labelNombre, labelEmail, labelTelefono, labelObjetivo, labelSuscripciones, labelServicios].forEach(etiqueta => {
      etiqueta.style.color = "";
    });
  }
}

// Función para limpiar la lista completa
function borrarLista() {
  const confirmar = confirm("¿Estás seguro de borrar toda la lista de clientes?");
  if (confirmar) {
    const contenedor = document.getElementById("listaClientes");
    contenedor.innerHTML = "";
  }
}

