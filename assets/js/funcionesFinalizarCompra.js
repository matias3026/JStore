// Cargar el carrito desde localStorage
function cargarCarrito(usuarioId) {
    const carrito = JSON.parse(localStorage.getItem("carritos")) || {};

    if (!carrito[usuarioId] || carrito[usuarioId].length === 0) {
        const tablaCarrito = document.getElementById("tablaCarrito");
        tablaCarrito.innerHTML = `<tr><td colspan="7" class="text-center">Tu carrito está vacío. ¡Ve a la tienda para agregar productos!</td></tr>`;
        document.getElementById("totalGeneral").textContent = "$0.00";
        document.getElementById("btnFinalizarCompra").disabled = true;
        return;
    }

    let total = 0;
    const tablaCarrito = document.getElementById("tablaCarrito");
    tablaCarrito.innerHTML = ""; // Limpiar la tabla antes de cargar los nuevos productos

    carrito[usuarioId].forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="width: 50px; height: auto;"></td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${parseInt(producto.id)}, -1)">-</button>
                <span>${producto.cantidad}</span>
                <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${parseInt(producto.id)}, 1)">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${parseInt(producto.id)})">Eliminar</button></td>
        `;
        tablaCarrito.appendChild(fila);
    });

    document.getElementById("totalGeneral").textContent = `$${total.toFixed(2)}`;
    document.getElementById("btnFinalizarCompra").disabled = false;
}

// Modificar la cantidad de un producto en el carrito
function modificarCantidad(productoId, cambio) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const carrito = JSON.parse(localStorage.getItem("carritos")) || {};
    if (!carrito[usuario.id]) {
        carrito[usuario.id] = [];
    }

    const producto = carrito[usuario.id].find(p => parseInt(p.id) === productoId);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(productoId);
        } else {
            localStorage.setItem("carritos", JSON.stringify(carrito));
            cargarCarrito(usuario.id); // Recargar carrito con las cantidades actualizadas
        }
    }
}

// Eliminar un producto del carrito
function eliminarProducto(productoId) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const carrito = JSON.parse(localStorage.getItem("carritos")) || {};

    if (carrito[usuario.id]) {
        carrito[usuario.id] = carrito[usuario.id].filter(producto => parseInt(producto.id) !== productoId);
        localStorage.setItem("carritos", JSON.stringify(carrito)); // Guardar carrito actualizado
        cargarCarrito(usuario.id); // Recargar el carrito después de eliminar el producto
    }
}

// Verificar si hay una sesión iniciada
function verificarSesion() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) {
        document.getElementById("mensajeSesion").classList.remove("d-none");
        setTimeout(() => {
            window.location.href = "./tienda.html"; // Redirige a la tienda
        }, 3000);
        return;
    }
    cargarCarrito(usuario.id);
}

// Finalizar la compra y redirigir a la página de confirmación
// Finalizar la compra y redirigir a la página de confirmación
function finalizarCompra() {
    const confirmar = confirm("¿Estás seguro que quieres finalizar tu compra?");
    
    if (confirmar) {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const carrito = JSON.parse(localStorage.getItem("carritos")) || {};

        // Generar número de operación aleatorio
        const numeroOperacion = Math.floor(Math.random() * 1000000);

        // Eliminar el carrito del usuario después de la compra
        if (carrito[usuario.id]) {
            delete carrito[usuario.id]; // Eliminar el carrito del usuario
            localStorage.setItem("carritos", JSON.stringify(carrito)); // Guardar el carrito actualizado
        }

        // Guardar número de operación en localStorage
        localStorage.setItem("numeroOperacion", numeroOperacion);

        // Redirigir a la página de confirmación
        window.location.href = "compra_confirmada.html"; // Redirigir a la página de confirmación
    }
}

// Asignar el evento al botón desde el JS
document.addEventListener("DOMContentLoaded", function() {
    // Verificar la sesión y cargar el carrito
    verificarSesion();

    // Asignar el evento de finalizar compra al botón
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener("click", finalizarCompra);
    }
});



// Llamar a la función verificarSesion al cargar la página
document.addEventListener("DOMContentLoaded", verificarSesion);
