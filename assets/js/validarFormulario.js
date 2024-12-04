document.addEventListener('DOMContentLoaded', function () {
    const $mail = document.getElementById('email');
    const $nombre = document.getElementById('nombre');
    const $telefono = document.getElementById('telefono');
    const $motivo = document.getElementById('motivo');
    const $mensaje = document.getElementById('mensaje');
    const $errorForm = document.getElementById('notificacion');
    const $contarCaracteres = document.getElementById('contador-caracteres');
    const $form = document.getElementById('contacto-form');

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function mostrarError(mensaje) {
        $errorForm.textContent = mensaje;
        $errorForm.classList.add('error');
    }

    function limpiarError() {
        $errorForm.textContent = "";
        $errorForm.classList.remove('error');
    }

    function contarCaracteres() {
        const caracteresIngresados = $mensaje.value.length;
        $contarCaracteres.textContent = caracteresIngresados + ' caracteres';

        if (caracteresIngresados < 50) {
            $contarCaracteres.classList.add('mal');
            $contarCaracteres.classList.remove('bien');
        } else {
            $contarCaracteres.classList.remove('mal');
            $contarCaracteres.classList.add('bien');
        }
    }

    $mensaje.addEventListener('input', contarCaracteres);

    function validarForm(event) {
        limpiarError(); // Limpia mensajes previos

        // Validación del nombre
        if ($nombre.value.trim() === "") {
            mostrarError("El campo Nombre es obligatorio.");
            return false;
        }
        if ($nombre.value.trim().length < 3) {
            mostrarError("El Nombre debe tener al menos 3 caracteres.");
            return false;
        }

        // Validación del email
        if ($mail.value.trim() === "") {
            mostrarError("El campo Email es obligatorio.");
            return false;
        }
        if (!validarEmail($mail.value.trim())) {
            mostrarError("El formato del Email es incorrecto.");
            return false;
        }

        // Validación del teléfono
        if ($telefono.value.trim() === "") {
            mostrarError("El campo Teléfono es obligatorio.");
            return false;
        }
        if (isNaN($telefono.value.trim()) || $telefono.value.trim().length < 10) {
            mostrarError("El Teléfono debe tener al menos 10 dígitos y ser numérico.");
            return false;
        }

        // Validación del motivo
        if ($motivo.value === "") {
            mostrarError("Debe seleccionar un motivo de contacto.");
            return false;
        }

        // Validación del mensaje
        if ($mensaje.value.trim() === "") {
            mostrarError("El campo Mensaje es obligatorio.");
            return false;
        }
        if ($mensaje.value.trim().length < 50) {
            mostrarError("El Mensaje debe tener al menos 50 caracteres.");
            return false;
        }

        limpiarError(); // Limpia errores si todo está bien
        alert("¡Formulario enviado con éxito!");
        return true;
    }

    $form.addEventListener('submit', function (event) {
        if (!validarForm()) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });
});
