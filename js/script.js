 
    



 



  window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo-container');
    if (window.scrollY > 50) {
      logo.classList.add('visible');
    } else {
      logo.classList.remove('visible');
    }
  });



  // Al hacer clic en una categoría
  document.querySelectorAll(".baby-category").forEach(categoria => {
    categoria.addEventListener("click", () => {
      // Eliminar clase activa de todas las categorías
      document.querySelectorAll(".baby-category").forEach(cat => {
        cat.classList.remove("active");
      });

      // Agregar clase activa a la clicada
      categoria.classList.add("active");

      // Obtener su categoría
      const categoriaSeleccionada = categoria.getAttribute("data-categoria");

      // Mostrar solo los productos de esa categoría
      document.querySelectorAll(".product-card").forEach(producto => {
        const categoriaProducto = producto.getAttribute("data-categoria");
        if (categoriaProducto === categoriaSeleccionada) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });
    });
  });







 let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito")) || 0;
document.getElementById("contador-carrito").textContent = contadorCarrito;

// Función para mostrar mensajes bonitos
function mostrarMensaje(texto, colorFondo = "#4caf50") {
  const mensaje = document.createElement("div");
  mensaje.textContent = texto;
  mensaje.style.position = "fixed";
  mensaje.style.bottom = "20px";
  mensaje.style.left = "50%";
  mensaje.style.transform = "translateX(-50%)";
  mensaje.style.backgroundColor = colorFondo;
  mensaje.style.color = "#fff";
  mensaje.style.padding = "12px 20px";
  mensaje.style.borderRadius = "8px";
  mensaje.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  mensaje.style.zIndex = "9999";
  document.body.appendChild(mensaje);
  setTimeout(() => mensaje.remove(), 2000);
}

// Función para saber si el usuario está logueado
function estaLogueado() {
  return localStorage.getItem("usuarioLogueado") === "true";
}


localStorage.removeItem("contadorCarrito");
document.getElementById("contador-carrito").textContent = "0";


  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    return JSON.parse(jsonPayload);
  }








  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  }

  function autenticar(nombre) {
    document.getElementById("btn-login-header").style.display = "none";
    document.getElementById("btn-logout-header").style.display = "inline-block";

    const zonaVip = document.getElementById("zona-exclusiva");
    if (zonaVip) zonaVip.style.display = "block";

    alert(`🎉 Bienvenido, ${nombre}`);
  }

  function cerrarSesion() {
    localStorage.clear();
    document.getElementById("btn-login-header").style.display = "inline-block";
    document.getElementById("btn-logout-header").style.display = "none";
    const zonaVip = document.getElementById("zona-exclusiva");
    if (zonaVip) zonaVip.style.display = "none";
  }

 

  function mostrarNombreUsuario(nombre) {
  const loginBtn = document.getElementById("btn-login-header");
  const registerBtn = document.getElementById("btn-register-header");
  const nombreSpan = document.getElementById("nombre-usuario-header");
  const logoutBtn = document.getElementById("btn-logout-header");

  if (loginBtn) loginBtn.style.display = "none";
  if (registerBtn) registerBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";

  if (nombreSpan) {
    nombreSpan.textContent = `👶 Hola, ${nombre}`;
    nombreSpan.style.display = "inline-block";
  }
}

function mostrarNombreUsuario(nombre) {
  document.getElementById("btn-login-header").style.display = "none";
  document.getElementById("btn-register-header").style.display = "none";
  document.getElementById("nombre-usuario-header").textContent = `👶 Hola, ${nombre}`;
  document.getElementById("nombre-usuario-header").style.display = "inline-block";
  document.getElementById("btn-logout-header").style.display = "inline-block";
}

function cerrarSesion() {
  localStorage.clear();
  document.getElementById("btn-login-header").style.display = "inline-block";
  document.getElementById("btn-register-header").style.display = "inline-block";
  document.getElementById("nombre-usuario-header").style.display = "none";
  document.getElementById("btn-logout-header").style.display = "none";
  location.reload();
}


// Decodificar el JWT de Google
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
  return JSON.parse(jsonPayload);
}


const buscador = document.getElementById("buscador");
const sugerencias = document.getElementById("sugerencias");
const btnBuscar = document.getElementById("btnBuscar");

// Buscar al escribir
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const productos = Array.from(document.querySelectorAll(".product-card"));
  sugerencias.innerHTML = "";
  
  if (texto === "") {
    sugerencias.style.display = "none";
    return;
  }

  const coincidencias = productos.filter(p =>
    p.querySelector("h3").textContent.toLowerCase().includes(texto)
  );

  if (coincidencias.length > 0) {
    sugerencias.style.display = "block";
    coincidencias.forEach(p => {
      const nombre = p.querySelector("h3").textContent;
      const id = p.getAttribute("id");
      const li = document.createElement("li");
      li.textContent = nombre;
      li.onclick = () => {
        buscarYResaltar(id, nombre);
      };
      sugerencias.appendChild(li);
    });
  } else {
    sugerencias.style.display = "block";
    sugerencias.innerHTML = "<li>No hay coincidencias</li>";
  }
});

// Buscar al dar clic en botón
btnBuscar.addEventListener("click", () => {
  const texto = buscador.value.toLowerCase();
  const producto = Array.from(document.querySelectorAll(".product-card"))
    .find(p => p.querySelector("h3").textContent.toLowerCase().includes(texto));
  
  if (producto) {
    const id = producto.getAttribute("id");
    const nombre = producto.querySelector("h3").textContent;
    buscarYResaltar(id, nombre);
  } else {
    mostrarMensaje("❌ Producto no encontrado", "#e53935");
  }
});

// Ir al producto
function buscarYResaltar(id, nombre) {
  sugerencias.style.display = "none";
  buscador.value = nombre;
  const destino = document.getElementById(id);
  if (destino) {
    destino.scrollIntoView({ behavior: "smooth", block: "center" });
    destino.style.boxShadow = "0 0 20px 4px #fbc02d";
    setTimeout(() => destino.style.boxShadow = "none", 2000);
    mostrarMensaje(`🔍 "${nombre}" disponible`, "#4caf50");
  }
}

// Popup bonito
function mostrarMensaje(texto, color = "#4caf50") {
  const m = document.createElement("div");
  m.textContent = texto;
  m.style.position = "fixed";
  m.style.bottom = "20px";
  m.style.left = "50%";
  m.style.transform = "translateX(-50%)";
  m.style.backgroundColor = color;
  m.style.color = "white";
  m.style.padding = "10px 20px";
  m.style.borderRadius = "10px";
  m.style.zIndex = 9999;
  document.body.appendChild(m);
  setTimeout(() => m.remove(), 2000);
}




  contadorCarrito++;
  document.getElementById("contador-carrito").textContent = contadorCarrito;
  mostrarMensaje("✅ Producto recomendado enviado al carrito");



  const input = document.getElementById('buscador');
 
  const botonBuscar = document.getElementById('botonBuscar');

  const productos = [
    { nombre: "pañales winny pants", id: "prod1" },
    { nombre: "toallas nosotras buenas noches", id: "prod2" },
    { nombre: "juguete sonajero bright starts", id: "prod3" }
  ];

  input.addEventListener('input', () => {
    const valor = input.value.toLowerCase().trim();
    sugerencias.innerHTML = '';
    if (valor === '') {
      sugerencias.style.display = 'none';
      return;
    }

    const matches = productos.filter(p => p.nombre.includes(valor));

    if (matches.length > 0) {
      matches.forEach(p => {
        const div = document.createElement('div');
        div.textContent = p.nombre;
        div.addEventListener('click', () => {
          input.value = p.nombre;
          sugerencias.style.display = 'none';
          document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' });
        });
        sugerencias.appendChild(div);
      });
      sugerencias.style.display = 'block';
    } else {
      sugerencias.style.display = 'none';
    }
  });

  botonBuscar.addEventListener('click', () => {
    const valor = input.value.toLowerCase().trim();
    const match = productos.find(p => p.nombre.includes(valor));
    if (match) {
      document.getElementById(match.id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Producto no encontrado');
    }
    sugerencias.style.display = 'none';
  });

  document.addEventListener('click', function (e) {
    if (!document.querySelector('.search-container').contains(e.target)) {
      sugerencias.style.display = 'none';
    }
  });

  function previewFoto(event) {
  const input = event.target;
  const img = document.getElementById('foto-perfil');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

let fotoSeleccionada = null;
    let comprasRealizadas = parseInt(localStorage.getItem('compras')) || 0;

    function habilitarEdicion() {
      const input = document.getElementById("nombreUsuario");
      input.disabled = false;
      input.focus();
    }

    function previewFoto() {
      const input = document.getElementById("inputFoto");
      const imagen = document.getElementById("fotoPerfil");

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagen.src = e.target.result;
          fotoSeleccionada = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function guardarDatos() {
      if (fotoSeleccionada) {
        localStorage.setItem('fotoPerfilGuardada', fotoSeleccionada);
      }

      const descripcion = document.getElementById("descripcionUsuario").value;
      localStorage.setItem('descripcionUsuario', descripcion);
      alert("Datos guardados correctamente ✅");
    }

    function actualizarProgreso() {
      const progreso = document.getElementById('progresoCompras');
      const texto = document.getElementById('textoProgreso');
      progreso.value = comprasRealizadas;
      texto.textContent = `${comprasRealizadas}/20 compras realizadas`;

      if (comprasRealizadas >= 10) {
        document.querySelector('#bono1 button').disabled = false;
      }
      if (comprasRealizadas >= 20) {
        document.querySelector('#bono2 button').disabled = false;
      }
    }

    function sumarCompra() {
      if (comprasRealizadas < 20) {
        comprasRealizadas++;
        localStorage.setItem('compras', comprasRealizadas);
        actualizarProgreso();
      } else {
        alert("¡Ya alcanzaste el máximo de recompensas!");
      }
    }

    function redimirBono(bonoID) {
      if (bonoID === 1 && comprasRealizadas >= 10) {
        alert("🎉 Has redimido el Bono del 5% de descuento.");
        document.querySelector('#bono1 button').disabled = true;
      }
      if (bonoID === 2 && comprasRealizadas >= 20) {
        alert("🎉 Has redimido el Bono del 30% en compras superiores a $300.000 + envío gratis.");
        document.querySelector('#bono2 button').disabled = true;
      }
    }
  

function abrirMenu() {
      document.getElementById("menuCategorias").classList.add("open");
    }

    function cerrarMenu() {
      document.getElementById("menuCategorias").classList.remove("open");
    }

    function abrirMenu() {
    const menu = document.getElementById("menuCategorias");
    menu.classList.toggle("open");
  }

  function cerrarMenu() {
    const menu = document.getElementById("menuCategorias");
    menu.classList.remove("open");
  }

  

 
  const inventario = {
    quibdo: [
      { nombre: "Pañales ChiquiMax", precio: "$30.000", imagen: "pañal1.jpg" }
    ],
    bucaramanga: [
      { nombre: "Juguete Sensorial", precio: "$45.000", imagen: "juguete1.jpg" }
    ],
    medellin: [
      { nombre: "Biberón Anticólicos", precio: "$20.000", imagen: "biberon1.jpg" }
    ],
    cali: [
      { nombre: "Toallitas Húmedas", precio: "$10.000", imagen: "toallas1.jpg" }
    ]
  };

  function toggleMenu() {
    const lista = document.getElementById("listaCiudades");
    lista.style.display = lista.style.display === "block" ? "none" : "block";
  }

  function seleccionarCiudad(ciudad, nombreCiudad) {
    document.getElementById("ubicacion-seleccionada-header").innerText = nombreCiudad;
    document.getElementById("listaCiudades").style.display = "none";
    mostrarCatalogoPorCiudad(ciudad);
  }

  function mostrarCatalogoPorCiudad(ciudad) {
    const contenedor = document.getElementById("catalogo-local");
    const productos = inventario[ciudad];
    if (!contenedor) return;

    if (!productos || productos.length === 0) {
      contenedor.innerHTML = "<p>No hay productos disponibles en esta ciudad.</p>";
      return;
    }

    contenedor.innerHTML = productos.map(p => `
      <div class="card-producto">
        <img src="img/${p.imagen}" alt="${p.nombre}">
        <h4>${p.nombre}</h4>
        <p>${p.precio}</p>
      </div>
    `).join('');
  }

  // Cerrar menú si haces clic fuera
  document.addEventListener("click", function (e) {
    const selector = document.getElementById("selectorCiudad");
    const lista = document.getElementById("listaCiudades");
    if (!selector.contains(e.target) && !lista.contains(e.target)) {
      lista.style.display = "none";
    }
  });

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();

  const user = {
    id: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail(),
    imageUrl: profile.getImageUrl()
  };

  // Guardar en localStorage (persistente) o sessionStorage (se borra al cerrar pestaña)
  localStorage.setItem('user', JSON.stringify(user));

  // Redirige a otra parte si quieres
  window.location.href = 'perfil.html';
}




// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica de tu menú de ciudades (déjala tal cual si ya la tienes) ---
    const selectorCiudad = document.getElementById('selectorCiudad');
    const listaCiudades = document.getElementById('listaCiudades');
    const ubicacionSeleccionadaHeader = document.getElementById('ubicacion-seleccionada-header');

    if (selectorCiudad && listaCiudades && ubicacionSeleccionadaHeader) {
        selectorCiudad.addEventListener('click', function(event) {
            listaCiudades.classList.toggle('show');
            event.stopPropagation(); // Evita que el clic se propague al documento
        });

        document.addEventListener('click', function(event) {
            if (!selectorCiudad.contains(event.target) && !listaCiudades.contains(event.target)) {
                listaCiudades.classList.remove('show');
            }
        });

        // Asegúrate de que esta función exista en tu JS o se llame de otra forma
        window.seleccionarCiudad = function(ciudadId, ciudadNombre) {
            ubicacionSeleccionadaHeader.textContent = ciudadNombre;
            listaCiudades.classList.remove('show');
            console.log("Ciudad seleccionada:", ciudadNombre);
        };
    }

    window.mostrarFormulario = function(formId) {
        document.getElementById('form-login').style.display = 'none';
        document.getElementById('form-register').style.display = 'none';
        document.getElementById(`form-${formId}`).style.display = 'block';
    };

    window.cerrarSesion = function() {
        // Implementa tu lógica de cerrar sesión aquí
        alert('Sesión cerrada (funcionalidad simulada)');
        // Por ejemplo, podrías redirigir al usuario, limpiar localStorage, etc.
        // window.location.href = 'pagina_inicio.html';
    };


    // --- Lógica de la funcionalidad de Editar/Guardar Perfil (¡AQUÍ ESTÁN LOS CAMBIOS!) ---
    const editButton = document.querySelector('.btn-editar-perfil');
    const saveButton = document.querySelector('.btn-guardar');
    const errorMessage = document.querySelector('.mensaje-error'); // Seleccionamos el span del mensaje de error
    const formInputs = document.querySelectorAll('.datos-personales-form input:not([type="radio"]), .datos-personales-form select');
    const radioInputs = document.querySelectorAll('.datos-personales-form input[type="radio"]');

    if (editButton && saveButton) { // Asegurarse de que los elementos existan antes de añadir listeners
        editButton.addEventListener('click', function() {
            formInputs.forEach(input => {
                input.removeAttribute('readonly');
                if (input.tagName === 'SELECT') {
                    input.removeAttribute('disabled');
                }
            });
            radioInputs.forEach(radio => {
                radio.removeAttribute('disabled');
            });

            editButton.style.display = 'none'; // Oculta el botón de editar
            saveButton.style.display = 'block'; // Muestra el botón de guardar
            errorMessage.style.display = 'none'; // Asegúrate de ocultar cualquier error previo
        });

        saveButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe realmente por ahora

            // --- Validación básica de campos ---
            let allFieldsFilled = true;
            formInputs.forEach(input => {
                // Validación para campos de texto/email/select que no sean solo la cédula si es opcional
                if (input.value.trim() === '' && input.id !== 'cedula') {
                    allFieldsFilled = false;
                }
            });

            // Validación para los campos de fecha de nacimiento si son obligatorios
            const diaNac = document.getElementById('dia-nacimiento').value;
            const mesNac = document.getElementById('mes-nacimiento').value;
            const añoNac = document.getElementById('año-nacimiento').value;
            if (diaNac === '' || mesNac === '' || añoNac === '') {
                allFieldsFilled = false;
            }

            // Validación de que al menos un radio de género esté seleccionado
            const anyRadioSelected = Array.from(radioInputs).some(radio => radio.checked);
            if (!anyRadioSelected) {
                allFieldsFilled = false;
            }

            if (!allFieldsFilled) {
                errorMessage.style.display = 'block'; // Muestra el mensaje de error
                return; // Detiene la función si hay campos vacíos
            } else {
                errorMessage.style.display = 'none'; // Oculta el mensaje si todo está bien
            }
            // --- Fin de validación básica ---


            // Si la validación es exitosa, los campos vuelven a ser solo lectura
            formInputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
                if (input.tagName === 'SELECT') {
                    input.setAttribute('disabled', 'disabled');
                }
            });
            radioInputs.forEach(radio => {
                radio.setAttribute('disabled', 'disabled');
            });

            saveButton.style.display = 'none'; // Oculta el botón de guardar
            editButton.style.display = 'block'; // Muestra el botón de editar
            alert('¡Cambios guardados! (Simulado)'); // Mensaje de confirmación
        });
    }


    // --- Opcional: Llenar opciones para fecha de nacimiento ---
    const diaSelect = document.getElementById('dia-nacimiento');
    const mesSelect = document.getElementById('mes-nacimiento');
    const añoSelect = document.getElementById('año-nacimiento');

    if (diaSelect && mesSelect && añoSelect) { // Asegurarse de que los elementos existan
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            diaSelect.appendChild(option);
        }

        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        meses.forEach((mes, index) => {
            const option = document.createElement('option');
            option.value = index + 1; // Meses son 1-indexados
            option.textContent = mes;
            mesSelect.appendChild(option);
        });

        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            añoSelect.appendChild(option);
        }
    }
});


  function seleccionarCiudad(id, nombre) {
    // Cambia el nombre en el header
    document.getElementById('ubicacion-seleccionada-header').innerText = nombre;

    // Oculta el menú
    document.getElementById('listaCiudades').style.display = 'none';

    // Muestra el loader
    const loader = document.getElementById('loader-overlay');
    loader.classList.add('active');

    // Simula que está cargando (puedes reemplazar esto con tu lógica real)
    setTimeout(() => {
      loader.classList.remove('active');
      console.log(`Ciudad cambiada a: ${nombre}`);
      // Aquí podrías recargar productos, ubicaciones, etc.
    }, 2000);
  }

  function toggleMenu() {
    const lista = document.getElementById('listaCiudades');
    lista.style.display = lista.style.display === 'block' ? 'none' : 'block';
  }





  //JS para abrir/cerrar menú

    function abrirMenu() {
      document.getElementById("menuCategorias").classList.add("open");
    }
    function cerrarMenu() {
      document.getElementById("menuCategorias").classList.remove("open");
    }
 



function abrirModal() {
  document.getElementById('modalTarjeta').style.display = 'flex';
}

function cerrarDesdeFondo(e) {
  if (e.target.id === 'modalTarjeta') {
    document.getElementById('modalTarjeta').style.display = 'none';
  }
}

function formatearNumeroTarjeta(input) {
  input.value = input.value.replace(/\D/g, '') // solo números
    .replace(/(.{4})/g, '$1 ')                // agrupa de 4 en 4
    .trim();                                  // quita espacio final
}

function formatearExpiracion(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 2) {
    val = val.substring(0, 2) + '/' + val.substring(2, 4);
  }
  input.value = val.substring(0, 5); // máximo MM/AA
}

function soloLetras(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
}

function soloNumeros(input) {
  input.value = input.value.replace(/\D/g, '');
}



function abrirModal() {
  const modal = document.getElementById('modalTarjeta');
  const loader = document.getElementById('loader-tarjeta');
  const form = document.getElementById('form-tarjeta');

  modal.style.display = 'flex';
  loader.style.display = 'flex';
  form.style.display = 'none';

  setTimeout(() => {
    loader.style.display = 'none';
    form.style.display = 'block';
  }, 2500); // 2.5 segundos de carga
}



function formatearNumeroTarjeta(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.replace(/(.{4})/g, '$1 ').trim();
  input.value = valor;

  mostrarLogoTarjeta(valor.replace(/\s/g, ''));
}



function formatearNumeroTarjeta(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.replace(/(.{4})/g, '$1 ').trim();
  input.value = valor;
  mostrarLogoTarjeta(valor.replace(/\s/g, ''));
}

function mostrarLogoTarjeta(numero) {
  const logo = document.getElementById('logo-tarjeta');

  if (numero.startsWith('4')) {
    logo.src = 'Imagenes/tarjetas/Visa.png';
  } else if (/^5[1-5]/.test(numero)) {
    logo.src = 'Imagenes/tarjetas/Mastercard.png';
  } else if (/^3[47]/.test(numero)) {
    logo.src = 'Imagenes/tarjetas/Amex.png';
  } else if (/^6(?:011|5|4[4-9])/.test(numero)) {
    logo.src = 'Imagenes/tarjetas/Discover.png';
  } else {
    logo.src = 'Imagenes/tarjetas/Defaut.png'; // Logo por defecto
  }
}

function abrirModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function cerrarDesdeFondo(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
}
function abrirModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
}

function cerrarDesdeFondo(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
}

function cerrarDesdeFondo(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
}

function abrirModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function cerrarModal(id) {
  document.getElementById(id).style.display = 'none';
}

// 👉 Se ejecuta al dar clic en "Agregar tarjeta de crédito"
function iniciarProcesoAgregar() {
  document.getElementById('seccion-bienvenida').style.display = 'none';
  document.getElementById('loader-tarjeta').style.display = 'flex';
  document.getElementById('form-tarjeta').style.display = 'none';

  // Simula carga del loader
  setTimeout(() => {
    document.getElementById('loader-tarjeta').style.display = 'none';
    document.getElementById('form-tarjeta').style.display = 'block';
  }, 2500);
}

// Simula guardar
function guardarTarjeta() {
  alert("✅ Tarjeta guardada exitosamente");
  cerrarModal('modal-agregar-tarjeta');

  // Puedes aquí reiniciar los campos si quieres
}
function abrirModalConBienvenida() {
  const modal = document.getElementById('modal-agregar-tarjeta');

  // Mostrar la modal
  modal.style.display = 'flex';

  // Mostrar solo la bienvenida, ocultar loader y form por si acaso
  document.getElementById('seccion-bienvenida').style.display = 'block';
  document.getElementById('loader-tarjeta').style.display = 'none';
  document.getElementById('form-tarjeta').style.display = 'none';
}


















function iniciarProcesoAgregar() {
  // Oculta la bienvenida
  document.getElementById('seccion-bienvenida').style.display = 'none';
  // Muestra el loader
  document.getElementById('loader-tarjeta').style.display = 'flex';

  // Después de 2 segundos muestra el formulario
  setTimeout(() => {
    document.getElementById('loader-tarjeta').style.display = 'none';
    document.getElementById('form-tarjeta').style.display = 'block';
  }, 2000);
}




function guardarTarjeta() {
  const numero = document.getElementById('numero').value;
  const nombre = document.getElementById('titular').value.toUpperCase();
  const ultimos4 = numero.slice(-4);

  const contenedor = document.querySelector('.modal-contenido');
  contenedor.innerHTML = `
    <h2>Configura tus tarjetas de crédito</h2>
    <div class="tarjeta-guardada">
      <div class="mock-tarjeta">
        <p class="numero-tarjeta">**** **** **** ${ultimos4}</p>
        <p class="nombre-tarjeta">${nombre}</p>
      </div>
      <button class="btn-guardar" onclick="reiniciarModal()">Agregar otra tarjeta</button>
    </div>
  `;
}
function reiniciarModal() {
  location.reload(); // Reinicia la página completa
}

function seleccionarDireccion(elemento) {
  const tarjetas = document.querySelectorAll(".direccion-tarjeta");
  tarjetas.forEach(t => t.classList.remove("seleccionada"));
  elemento.classList.add("seleccionada");
}

function abrirFormularioDireccion() {
  // Aquí puedes abrir una modal o redirigir a una sección/formulario
  alert("Aquí iría el formulario para agregar una nueva dirección 🚀");
}


function abrirModalDireccion() {
  document.getElementById("modal-direccion").style.display = "flex";
}

function cerrarModalDireccion(event) {
  if (!event || event.target === document.getElementById("modal-direccion")) {
    document.getElementById("modal-direccion").style.display = "none";
  }
}

function guardarDireccion(event) {
  event.preventDefault();
  const form = document.getElementById("form-direccion");

  if (!form.checkValidity()) {
    form.reportValidity(); // muestra los errores del HTML5
    return;
  }

  const nuevaDireccion = {
    nombre: form.nombreLugar.value.trim(),
    direccion: form.direccion.value.trim(),
    ciudad: form.ciudad.value.trim(),
    departamento: form.departamento.value.trim(),
    codigoPostal: form.codigoPostal.value.trim(),
    telefono: form.telefono.value.trim(),
  };

  console.log("📦 Dirección guardada:", nuevaDireccion);

  alert("✅ Dirección agregada correctamente");
  form.reset();
  cerrarModalDireccion();
}


function agregarCupon() {
  const codigo = document.getElementById("codigo-cupon-input").value.trim();
  if (codigo === "") {
    alert("Por favor ingresa un código de cupón válido.");
    return;
  }

  // Aquí podrías validar el cupón con el backend
  alert("Cupón agregado: " + codigo);

  // Limpia el campo
  document.getElementById("codigo-cupon-input").value = "";
}
function aplicarCupon(codigo) {
  const mensaje = document.getElementById("mensaje-cupon");
  mensaje.innerHTML = `🎉 Cupón <strong>${codigo}</strong> aplicado. Se verá reflejado en el carrito o producto.`;
  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 4000);
}

function eliminarProducto(id) {
  const elemento = document.querySelector(`.producto-carrito[data-id="${id}"]`);
  if (elemento) {
    elemento.classList.add('eliminando');
    setTimeout(() => {
      carrito = carrito.filter(p => p.id !== id);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    }, 300); // tiempo igual al CSS
  } else {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }
}


// Suponiendo que tu modal tiene el id "modal-auth"
document.getElementById("modal-auth").style.display = "none";

