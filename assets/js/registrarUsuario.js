function validarRegistro() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    // Validar si las contraseñas coinciden
    if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Crear un nuevo usuario
    const nuevoUsuario = {
        id: generarIdUsuario(),
        email: email,
        password: password,  // En un entorno real deberías cifrar la contraseña
        nombre: nombre,
        apellido: apellido,
        role: "usuario", // Establecer el rol por defecto como "usuario"
    };

    // Guardar el nuevo usuario en localStorage (o en un archivo JSON si es el caso)
    const usuarios = JSON.parse(localStorage.getItem('usuariosManuales')) || [];  // Obtener los usuarios ya existentes
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuariosManuales', JSON.stringify(usuarios));

    // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje
    alert("Usuario registrado correctamente.");
    window.location.href = './inicioSesion.html'; // Redirigir a la página de inicio de sesión
}

// Generar un ID único para el nuevo usuario basado en el último ID registrado
function generarIdUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const ultimoUsuario = usuarios[usuarios.length - 1];
    const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1; // Si es el primer usuario, asignar ID 1
    return nuevoId;
}
