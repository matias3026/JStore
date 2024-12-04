// Función para verificar si hay un usuario logueado y actualizar el botón
function verificarSesion() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText'); // Texto del botón

    if (usuario) {
        // Si hay usuario logueado, cambiar el botón a "Cerrar sesión [nombre]"
        loginText.textContent = `Sesión de ${usuario.nombre}`; // Cambiar texto del botón
        loginBtn.innerHTML = `<i class="fas fa-sign-out-alt fa-2x"></i><span>${loginText.textContent}</span>`; // Actualizar todo el botón

        // Asignar la acción de cerrar sesión
        loginBtn.onclick = function() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('usuarioLogueado');
                window.location.href = './inicioSesion.html'; // Redirigir a la página de inicio de sesión
            }
        };
    } else {
        // Si no hay usuario logueado, mostrar "Ingresar"
        loginText.textContent = 'Ingresar';
        loginBtn.innerHTML = '<i class="fas fa-user fa-2x"></i><span>Ingresar</span>';

        // Asignar la acción de iniciar sesión (si no está logueado)
        loginBtn.onclick = function() {
            window.location.href = './inicioSesion.html'; // Redirigir a la página de inicio de sesión
        };
    }
}

// Llamar a la función al cargar la página
window.onload = verificarSesion;
