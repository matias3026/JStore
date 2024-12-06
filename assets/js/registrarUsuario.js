function validarRegistro() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    // Validar que todos los campos estén completos
    if (!email || !password || !password2 || !nombre || !apellido) {
        alert("Todos los campos son obligatorios. Por favor, complételos.");
        return;
    }

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Validar si las contraseñas coinciden
    if (password !== password2) {
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // Crear un nuevo usuario
    const nuevoUsuario = {
        id: generarIdUsuario(),
        email: email,
        password: password,
        nombre: nombre,
        apellido: apellido,
        role: "usuario", // Valor predeterminado
    };

    // Guardar el nuevo usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuariosManuales')) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuariosManuales', JSON.stringify(usuarios));

    alert("Usuario registrado correctamente.");
    window.location.href = './inicioSesion.html';
}

// Generar un ID único para el nuevo usuario basado en el último ID registrado
function generarIdUsuario() {
    const usuarios = JSON.parse(localStorage.getItem('usuariosManuales')) || [];
    const ultimoUsuario = usuarios[usuarios.length - 1];
    const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1; // Si es el primer usuario, asignar ID 1
    return nuevoId;
}
