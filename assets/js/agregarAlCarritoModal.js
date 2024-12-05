// Función para manejar el evento de agregar al carrito desde el modal
function manejarAgregarAlCarritoModal(event) {
    const boton = event.target;

    
    if (boton.classList.contains('btn-primary')) {
       
        const idProducto = boton.getAttribute('data-id');
        console.log('ID Producto:', idProducto);  

        
        const modalImagen = document.getElementById('modal-imagen');
        const modalNombre = document.getElementById('modal-nombre');
        const modalDescripcion = document.getElementById('modal-descripcion');
        const modalPrecio = document.getElementById('modal-precio');
        const modalStock = document.getElementById('modal-stock');

        const nombreProducto = modalNombre.textContent;
        const descripcionProducto = modalDescripcion.textContent;
        const precioProducto = parseFloat(modalPrecio.textContent.replace('$', '').trim());
        const imagenProducto = modalImagen.src;

        
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuarioLogueado) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        
        const carritos = JSON.parse(localStorage.getItem('carritos')) || {};
        const carritoUsuario = carritos[usuarioLogueado.id] || [];

        
        const productoExistente = carritoUsuario.find(item => item.id == idProducto);
        if (productoExistente) {
            
            productoExistente.cantidad++;
        } else {
           
            carritoUsuario.push({
                id: idProducto,
                nombre: nombreProducto,
                descripcion: descripcionProducto,
                precio: precioProducto,
                imagen: imagenProducto,
                cantidad: 1
            });
        }

        
        carritos[usuarioLogueado.id] = carritoUsuario;
        localStorage.setItem('carritos', JSON.stringify(carritos));

        alert('Producto agregado al carrito.');
    }
}


document.getElementById('add').addEventListener('click', manejarAgregarAlCarritoModal);
