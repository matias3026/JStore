document.addEventListener("DOMContentLoaded", function() {
    // Obtener el número de operación desde localStorage y mostrarlo
    const numeroOperacion = localStorage.getItem("numeroOperacion");
    document.getElementById("numeroOperacion").textContent = numeroOperacion;

    // Obtener el carrito del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const carrito = JSON.parse(localStorage.getItem("carritos")) || {};
    
    const productosComprados = carrito[usuario.id] || [];

    // Mostrar los productos comprados en la lista
    const listaProductos = document.getElementById("productosComprados");
    productosComprados.forEach(producto => {
        const listaItem = document.createElement("li");
        listaItem.classList.add("list-group-item");
        listaItem.textContent = `${producto.nombre} (Cantidad: ${producto.cantidad})`;
        listaProductos.appendChild(listaItem);
    });
});
