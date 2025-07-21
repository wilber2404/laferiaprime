<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  // 🔥 Configuración e inicialización de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC-qyHMoC0u4MkYUpoSSKgkweD5sKQAu2s",
    authDomain: "laferiadelbebe-4a86f.firebaseapp.com",
    projectId: "laferiadelbebe-4a86f",
    storageBucket: "laferiadelbebe-4a86f.appspot.com",
    messagingSenderId: "843102118440",
    appId: "1:843102118440:web:99077f787f00588034cb1d",
    measurementId: "G-JEQN10JJ6W"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  // 🔐 Estado de autenticación y actualización del header
  window.initAuthHeader = () => {
    const container = document.getElementById("usuario-header");
    if (!container) return;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let nombre = user.displayName || user.email;
        if (user.displayName) {
          const partes = user.displayName.trim().split(" ");
          nombre = partes.slice(0, 2).join(" ");
        }

        container.innerHTML = `
          <span style="margin-right: 10px; font-weight: bold;">👤 ${nombre}</span>
          <a href="#" onclick="cerrarSesion()" style="color: red;">Cerrar sesión</a>
        `;
      } else {
        container.innerHTML = `
          <a href="#" onclick="abrirModal()">Iniciar sesión</a>
          <a href="#" onclick="abrirModal('register')">Registrarse</a>
        `;
      }
    });
  };

  // 🚀 Login con Google y guardar datos
  window.loginConGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          const [nombre, apellido] = user.displayName?.split(" ") ?? ["", ""];
          await setDoc(userRef, {
            nombre,
            apellido,
            correo: user.email,
            fechaNacimiento: ""
          });
        }

        cerrarModal();
      })
      .catch((error) => {
        console.error("Error al iniciar con Google:", error);
      });
  };

  // 👤 Cargar perfil en la página del usuario
  window.initPerfilUsuario = () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/index.html";
        return;
      }

      const partes = user.displayName?.split(" ") || [];
      const nombre = partes[0] || "";
      const apellido = partes[1] || "";
      const correo = user.email;
      let fechaNacimiento = "";

      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          fechaNacimiento = data.fechaNacimiento || "";
        }
      } catch (error) {
        console.warn("Error cargando perfil:", error);
      }

      // Rellenar formulario o datos visibles
      const inputNombre = document.getElementById("nombre");
      const inputApellido = document.getElementById("apellido");
      const inputCorreo = document.getElementById("correo");
      const inputFecha = document.getElementById("fecha-nacimiento");
      const nombreMostrado = document.getElementById("nombreMostrado");
      const correoMostrado = document.querySelector(".nombre-usuario p");

      if (inputNombre) inputNombre.value = nombre;
      if (inputApellido) inputApellido.value = apellido;
      if (inputCorreo) inputCorreo.value = correo;
      if (inputFecha) inputFecha.value = fechaNacimiento;
      if (nombreMostrado) nombreMostrado.textContent = `${nombre} ${apellido}`;
      if (correoMostrado) correoMostrado.textContent = correo;
    });
  };

  // 🔓 Cerrar sesión
  window.cerrarSesion = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // 🧩 Modal: abrir/cerrar
  window.abrirModal = () => {
    document.getElementById("modal-auth").style.display = "flex";
  };

  window.cerrarModal = () => {
    document.getElementById("modal-auth").style.display = "none";
  };

  window.cerrarModalDesdeFondo = (e) => {
    if (e.target.id === "modal-auth") cerrarModal();
  };

  // 🎨 Botón visual de Google
  window.onload = () => {
    const googleBtn = document.createElement("button");
    googleBtn.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" style="width: 20px; margin-right: 8px; vertical-align: middle;"> Continuar con Google`;
    googleBtn.className = "boton-login-verde";
    googleBtn.onclick = loginConGoogle;
    document.getElementById("googleButton").appendChild(googleBtn);

    // 🔁 Inicializar header si ya está cargado
    window.initAuthHeader();
  };
</script>
