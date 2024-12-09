console.log("estoy en línea");

var $contenedorTarjetas = document.getElementById("productos");
var $checks = document.querySelectorAll('input[type="checkbox"]');
var $radios = document.querySelectorAll('input[type="radio"]');
var $inputBuscar = document.getElementById('buscar');

// Función para actualizar los productos mostrados
function actualizarProductos(productosBase, filtros) {
    $contenedorTarjetas.innerHTML = ''; // Limpiar los productos actuales

    // Filtrar los productos según los filtros del usuaruo 
    let productosFiltrados = productosBase.filter(producto => {
        // Filtro por categorías (checkbox)
        if (filtros.categorias.length > 0 && !filtros.categorias.includes(producto.tipo)) {
            return false;
        }

        // Filtro por búsqueda (input)
        if (filtros.busqueda && !producto.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())) {
            return false;
        }

        return true;
    });

    // Filtro por orden (radio)
    if (filtros.orden === 'precio-asc') {
        productosFiltrados = productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (filtros.orden === 'precio-desc') {
        productosFiltrados = productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    // Mostrar los productos filtrados
    productosFiltrados.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
            <div class="card mb-4" > 
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top"> 
                <div class="card-body"> 
                    <h5 class="card-title">${producto.nombre}</h5>
                    
                    <p class="card-price">$${producto.precio.toFixed(2)}</p>
                    <p class="card-stock">Stock: ${producto.stock}</p>
                    <button class="btn btn-primary" data-id="${producto.id}">Agregar al Carrito</button>
                    <button class="btn btn-success" id="verMas" data-id="${producto.id}">Ver más</button>
                </div>
            </div>
        `;
// <p class="card-text">${producto.descripcion}</p> 

        $contenedorTarjetas.appendChild(card);
    });

    // Agregar eventos a los botones "Ver más"
    const btnVerMas = document.querySelectorAll('#verMas');
    btnVerMas.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const idProducto = e.target.getAttribute('data-id');
            const producto = productosBase.find((prod) => prod.id == idProducto);
            mostrarModal(producto);
        });
    });
}

// Función para mostrar el modal con los detalles del producto
function mostrarModal(producto) {
    const modalImagen = document.getElementById('modal-imagen');
    const modalNombre = document.getElementById('modal-nombre');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalPrecio = document.getElementById('modal-precio');
    const modalStock = document.getElementById('modal-stock');
    const modalBoton = document.getElementById('add');

    console.log(modalBoton);
    modalImagen.src = producto.imagen;
    modalNombre.textContent = producto.nombre;
    modalDescripcion.textContent = producto.descripcion;
    modalPrecio.textContent = `$${producto.precio.toFixed(2)}`;
    modalStock.textContent = `Stock: ${producto.stock}`;
    modalBoton.classList.add("btn-primary");
    modalBoton.classList.add("btn");
    modalBoton.setAttribute('data-id', producto.id);


    // Abre el modal
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
}

document.addEventListener("DOMContentLoaded", async function () {
    // Cargar productos desde el JSON
    try {
        const response = await fetch('assets/json/productos.json');
        const productosBase = await response.json();

        // Filtros iniciales
        const filtros = {
            categorias: [],
            busqueda: '',
            orden: 'precio-asc'
        };

        // Mostrar los productos al cargar la página
        actualizarProductos(productosBase, filtros);

        // Filtrar productos por categorías (checkbox)
        $checks.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                filtros.categorias = Array.from($checks)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);
                actualizarProductos(productosBase, filtros);
            });
        });

        // Filtrar productos por tipo (radio)
        $radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    filtros.orden = radio.value;
                    actualizarProductos(productosBase, filtros);
                }
            });
        });

        // Filtro por búsqueda
        $inputBuscar.addEventListener('input', () => {
            filtros.busqueda = $inputBuscar.value;
            actualizarProductos(productosBase, filtros);
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
});
