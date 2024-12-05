// Función para hacer fetch y obtener los usuarios desde el archivo JSON
async function obtenerUsuarios() {
    try {
        const response = await fetch('assets/json/usuarios.json'); 
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        const usuarios = await response.json();
        
        // Guardar los usuarios en localStorage por si no se encuentra el archivo en el futuro
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Devolver los usuarios cargados desde el JSON
        return usuarios;
    } catch (error) {
        console.error("Error al cargar los usuarios desde el archivo JSON:", error);
        
        // Si no se pudo cargar el archivo JSON, intentar obtener los usuarios desde localStorage
        const usuariosGuardados = localStorage.getItem('usuarios');
        if (usuariosGuardados) {
            return JSON.parse(usuariosGuardados);
        }
        
        return []; 
    }
}

// Función para verificar el inicio de sesión
async function iniciasteSesion() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Obtener los usuarios desde el archivo JSON
    const usuarios = await obtenerUsuarios();

    // Buscar al usuario en los usuarios cargados desde el JSON
    let usuario = usuarios.find(u => u.email === email && u.password === password);

    // Si no se encuentra en el JSON, buscar en los usuarios manuales en localStorage
    if (!usuario) {
        const usuariosManuales = JSON.parse(localStorage.getItem('usuariosManuales')) || [];
        usuario = usuariosManuales.find(u => u.email === email && u.password === password);
    }

    if (usuario) {
        // Si el usuario existe, se guarda la sesión en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        
        // Redirigir al usuario a la página de inicio 
        window.location.href = "inicioSesion.html";  
    } else {
        // Si no se encuentra el usuario, mostrar un mensaje de error
        alert("Correo electrónico o contraseña incorrectos.");
    }
}
