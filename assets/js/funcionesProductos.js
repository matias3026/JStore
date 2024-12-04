console.log("estoy en linea");



document.addEventListener("DOMContentLoaded", async function () {
    const contenedor = document.getElementById("productos");

    // Simula la llamada a una API usando fetch
    try {
        const response = await fetch('assets/json/productos.json');
        const productosBase = await response.json(); // Convierte la respuesta en JSON

        productosBase.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("col"); 

            card.innerHTML = `
                <div class="card mb-4"> 
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top"> 
                    <div class="card-body"> 
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p> 
                        <p class="card-price">$${producto.precio.toFixed(2)}</p>
                        <p class="card-stock">Stock: ${producto.stock}</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
});
