
    document.addEventListener("DOMContentLoaded", function () {
        const botonComprar = document.getElementById("comprar");
        const inputCantidad = document.querySelector("input[type='number']");
        const tituloProducto = document.getElementById("titulopro").textContent;
        const precioProducto = document.getElementById("precio").textContent.replace("Precio: ", "").trim();
        const imagenProducto = document.getElementById("producto").src;
    
        botonComprar.addEventListener("click", function () {
            const cantidad = parseInt(inputCantidad.value);

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            let productoExistente = carrito.find(producto => producto.titulo === tituloProducto);
    
            if (productoExistente) {

                productoExistente.cantidad += cantidad;
            } else {

                const producto = {
                    titulo: tituloProducto,
                    precio: precioProducto,
                    imagen: imagenProducto,
                    cantidad: cantidad
                };
                carrito.push(producto);
            }
    
            localStorage.setItem("carrito", JSON.stringify(carrito));
    
            alert("Producto añadido al carrito");
        });
    });


    document.addEventListener("DOMContentLoaded", function () {
        const listaCarrito = document.getElementById("lista-carrito");
        const botonVaciar = document.getElementById("vaciar-carrito");
    
        function cargarCarrito() {
            listaCarrito.innerHTML = "";
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
            if (carrito.length === 0) {
                listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
                return;
            }
    
            carrito.forEach((producto, index) => {
                let item = document.createElement("div");
                item.classList.add("card", "mb-3");
                item.innerHTML = `
                    <div class="card-body d-flex align-items-center">
                        <img src="${producto.imagen}" width="50" height="50" class="me-3">
                        <div>
                            <h5 class="card-title">${producto.titulo}</h5>
                            <p class="card-text">Precio: ${producto.precio} | Cantidad: ${producto.cantidad}</p>
                        </div>
                        <button class="comprar2 btn btn-primary btn-sm ms-auto eliminar-item" data-index="${index}">Eliminar</button>
                    </div>
                `;
                listaCarrito.appendChild(item);
            });
    
            document.querySelectorAll(".eliminar-item").forEach(boton => {
                boton.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    eliminarProducto(index);
                });
            });
        }
    
        function eliminarProducto(index) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarCarrito();
        }
    
        botonVaciar.addEventListener("click", function () {
            localStorage.removeItem("carrito");
            cargarCarrito();
        });
    
        cargarCarrito();
    });