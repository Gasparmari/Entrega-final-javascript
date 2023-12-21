class Producto {

    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

}

function almacenarProductosEnLs(producto, cantidad) {


    const productoAAgregar = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(cantidad),
    }


    if(carrito === null) {
        carrito = [productoAAgregar]


    } else {

        const indiceSiExisteProducto = carrito.findIndex((el) => {
            return el.nombre === productoAAgregar.nombre
        })

        if(indiceSiExisteProducto === -1) {
            carrito.push(productoAAgregar)
        } else {
            carrito[indiceSiExisteProducto].cantidad += parseInt(cantidad)
        }

    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log(productoAAgregar)
}

function renderizarProductos(productos) {

    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML= "";
    
    for(const producto of productos) {

        const divPadre = document.createElement("div");
        divPadre.className = "col-12 col-sm-4"

        const divCard =document.createElement("div");
        divCard.className = "card mb-3"

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body"

        const h5 = document.createElement("h5");
        h5.className = "card-title"
        h5.innerText = producto.nombre

        const p = document.createElement("p");
        p.className = "card-text"
        p.innerHTML = `<strong>Precio:</strong> ${producto.precio} - <strong>Stock:</strong> ${producto.stock}`

        const divAgregarAlCarrito = document.createElement("div")
        divAgregarAlCarrito.className = "d-flex align-items-center"


        const button = document.createElement("button")
        button.className = "btn btn-primary col-3" ;
        button.innerText = "Comprar"

        const inputCantidad = document.createElement("input")
        inputCantidad.type = "number"
        inputCantidad.className = "form-control ms-3"

        button.addEventListener("click", () => {

            const cantidad = inputCantidad.value;

            if(cantidad > producto.stock) {
                alert("NO HAY ESE STOCK DISPONIBLE")
            } else {
                
                Toastify({
                    text: "Libro agregado al carrito",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "right", 
                    stopOnFocus: true, 
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} 
                }).showToast();

                almacenarProductosEnLs(producto,cantidad)
            }

        })
        
        divAgregarAlCarrito.append(button,inputCantidad)
        divCardBody.append(h5, p, divAgregarAlCarrito);
        divCard.append(divCardBody);
        divPadre.append(divCard);
        contenedor.append(divPadre);


    }
}

function buscadorProductos() {
    const busca = document.getElementById("buscar")
    
    busca.addEventListener("keyup", () => {

        const value = busca.value

        const productosFiltrados = listadoDeProductos.filter( (producto) => {
            return producto.nombre.toLowerCase().includes(value.toLowerCase());
        })

        renderizarProductos(productosFiltrados)
        
    })

}

function obtenerProductosEnLs() {

    carrito = JSON.parse(localStorage.getItem("carrito"))


}

async function obtenerProductosJSON() {

        const response = await fetch('/productos.json');
        const productos = await response.json();

        listadoDeProductos.length = 0

        // Agregar cada producto directamente a listadoDeProductos
        for (const producto of productos) {
            listadoDeProductos.push(new Producto(producto.nombre, producto.precio, producto.stock));
        }

        renderizarProductos(listadoDeProductos);
        buscadorProductos();
    } 




const listadoDeProductos = [];

let carrito = []

obtenerProductosJSON()