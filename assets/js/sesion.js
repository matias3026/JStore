// Función para hacer fetch y obtener los usuarios desde el archivo JSON
async function obtenerUsuarios() {
    try {
        const response = await fetch('assets/json/usuarios.json'); // Asegúrate de que el archivo .json esté accesible
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        return [];
    }
}

// Función para verificar el inicio de sesión
async function iniciasteSesion() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Obtener los usuarios desde el archivo JSON
    const usuarios = await obtenerUsuarios();

    // Buscar al usuario que coincida con el email y la contraseña
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        // Si el usuario existe, se guarda la sesión en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        
        // Redirigir al usuario a la página de inicio o a la página que desees
        window.location.href = "inicioSesion.html";  // Cambia esta URL según lo necesites
    } else {
        // Si no se encuentra el usuario, mostrar un mensaje de error
        alert("Correo electrónico o contraseña incorrectos.");
    }
}
