// Mostrar los detalles en el modal al hacer clic en "Ver más"
document.body.addEventListener('click', function (event) {
    if (event.target && event.target.id === "verMas") {
        console.log("Botón 'Ver más' clickeado");
        const idProducto = event.target.getAttribute("data-id");
        const producto = productosBase.find(p => p.id === idProducto);

        if (producto) {
            // Actualizar el contenido del modal con los datos del producto
            document.getElementById("modal-imagen").src = producto.imagen;
            document.getElementById("modal-nombre").textContent = producto.nombre;
            document.getElementById("modal-descripcion").textContent = producto.descripcion;
            document.getElementById("modal-precio").textContent = `$${producto.precio.toFixed(2)}`;
            document.getElementById("modal-stock").textContent = `Stock: ${producto.stock}`;

            // Mostrar el modal
            var myModal = new bootstrap.Modal(document.getElementById('productoModal'));
            myModal.show();
        }
    }
});