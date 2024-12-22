/* let productos;

fetch("./JSON/productos.json")
    .then((response) => response.json())
    .then((posts) => {
        const section = document.querySelector("section")

        section.innerHTML = "";

        posts.forEach(post => {
            const html = `
            <div class="card">
                <div class="content">
                    <img src="${post.imagen}" alt="${post.producto}" width="200" height="200">
                    <div>
                        <p class="descripcion">${post.producto}</p>
                    </div>
                    <div>
                        <p class="descripcion">$ ${post.precio}</p>
                    </div>
                        
                    <div class="footer" data-id= "${post.id}">
                        <button type="button" class= "seleccionar">
                        Seleccionar
                        </button>
                    </div>
                </div>
            </div>
            `;
        section.innerHTML += html;

            
        });
productos = posts;
// console.log(productos)
    }) 
    .catch((error) => {
        console.log(error);
    });


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("seleccionar")) {
        const id = event.target.closest("div").dataset.id;

        const elemento = productos.find((producto) => producto.id == id);
        console.log(elemento);
    
        const {producto, precio} = elemento;
        
        const prod = {
            id: id,
            producto: producto,
            precio: precio,
            cantidad: 1,

        }
        console.log(prod)
        carrito.push(prod);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}); */

const cargarProductos = async () => {
    try {
        const response = await fetch("./JSON/productos.json");
        const productos = await response.json()
        mostrarProductos(productos);
        return productos;
    } catch(error) {
        console.error(error)
    }
};

let prods =[];
cargarProductos();


const mostrarProductos = (productos) => {
    const listadoProductos = document.querySelector(".cards");
    listadoProductos.innerHTML = "";

    productos.forEach(post => {
        const html = `
        <div class="card">
            <div class="content">
                <img src="${post.imagen}" alt="${post.producto}" width="200" height="200">
                <div>
                    <p class="descripcion">${post.producto}</p>
                </div>
                <div>
                    <p class="descripcion">$ ${post.precio}</p>
                </div>
                    
                <div class="footer" data-id= "${post.id}">
                    <button type="button" class= "agregar">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
        `;
    listadoProductos.innerHTML += html;
    
})};

cargarProductos().then(productos =>{
    const prods = productos;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    document.addEventListener("click",(event) =>{
        if (event.target.closest("button.agregar")) {
            const id = event.target.closest("div.footer").dataset.id;
            const index = carrito.findIndex((item) => item.id == id);
            if (index == -1) {
                const elemento = prods.find((post) => post.id == id);
                console.log(elemento);

                const {producto, precio } = elemento;

                const articulo = {
                    id : id,
                    nombre: producto,
                    precio : precio,
                    cantidad: 1,
                };
                carrito.push(articulo);
            } else {
                const articulo = carrito[index];
                articulo.cantidad++;
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    })
});























