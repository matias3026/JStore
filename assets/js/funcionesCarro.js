// Función para manejar el evento de agregar al carrito
function manejarAgregarAlCarrito(event) {
    const boton = event.target;


    const modalActivo = document.querySelector('#productoModal.show');
    if (boton.classList.contains('btn-primary') && !modalActivo) {
        
        const idProducto = boton.getAttribute('data-id');
        console.log('ID Producto:', idProducto);  

       
        const card = boton.closest('.card'); // 
        if (!card) {
            console.error('Card no encontrada');
            return;
        }
        const nombreProducto = card.querySelector('.card-title').textContent;
        const descripcionProducto = card.querySelector('.card-text').textContent;
        const precioProducto = parseFloat(card.querySelector('.card-price').textContent.replace('$', '').trim());
        const imagenProducto = card.querySelector('.card-img-top').getAttribute('src');

        // Verificar si hay una sesión iniciada
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuarioLogueado) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            return;
        }

        // Obtener el carrito del usuario logueado o inicializar uno nuevo
        const carritos = JSON.parse(localStorage.getItem('carritos')) || {};
        const carritoUsuario = carritos[usuarioLogueado.id] || [];

        // Buscar si el producto ya está en el carrito
        const productoExistente = carritoUsuario.find(item => item.id == idProducto);
        if (productoExistente) {
            // Si el producto ya existe  aumentar la cantidad
            productoExistente.cantidad++;
        } else {
            // Agregar nuevo producto 
            carritoUsuario.push({
                id: idProducto,
                nombre: nombreProducto,
                descripcion: descripcionProducto,
                precio: precioProducto,
                imagen: imagenProducto,
                cantidad: 1
            });
        }

        // Guardar  carrito
        carritos[usuarioLogueado.id] = carritoUsuario;
        localStorage.setItem('carritos', JSON.stringify(carritos));

        alert('Producto agregado al carrito.');
    }
}


document.addEventListener('click', manejarAgregarAlCarrito);
