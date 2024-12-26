
let listadoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(listadoProductos);

function contarProductos () {
    let contador = 0;
    const contadorElemento = document.querySelector("span.contador");
    // Verifica si el elemento existe antes de intentar actualizarlo 
    if (!contadorElemento) { 
        console.error("Elemento con clase '.contador' no encontrado en el DOM."); 
        return; }
    if (listadoProductos.length === 0) {
        contadorElemento.innerHTML = contador;    
    } else {
        listadoProductos.forEach(producto =>{
            contador++;
            contadorElemento.innerHTML = contador;
    });
    
    };
};

const section = document.querySelector(".listado-productos");

function listarCarrito() {
    section.innerHTML = "";

    listadoProductos.forEach((item) => {
        const html = `
                
                <tr data-id="${item.id}" class="tabla">
                    <td>${item.nombre}</td>
                    <td class="cantidad">
                        <button class="sumar">
                            <i class="fa-solid fa-square-plus"></i>
                        </button>
                        ${item.cantidad}
                        <button class="restar">
                            <i class="fa-solid fa-square-minus"></i> 
                        </button>
                        
                    </td>
                    <td>$ ${item.precio}</td>
                    <td>$ ${item.precio * item.cantidad}</td>
                    <td>
                    <button class="eliminar">
                            <i class="fa-solid fa-square-xmark" style= "color:red"></i>     
                        </button>
                    </td>
                    </tr>
                `;
    section.innerHTML += html;
    });
    contarProductos();
};

listarCarrito();



function actualizarCantidad(tdCantidad, elemento) {
    tdCantidad.innerHTML =`
    <button class="sumar"> 
        <i class="fa-solid fa-square-plus"></i>
    </button> 
    ${elemento.cantidad}
    <button class="restar"> 
        <i class="fa-solid fa-square-minus"></i> 
    </button>
    `;
    contarProductos();
}


document.addEventListener("click",(event) =>{
console.log("Evento de click detectado", event.target);

    if (event.target.closest("button.sumar")) {
    const id = event.target.closest("tr.tabla").dataset.id;
    console.log("ID del producto:", id);

    const elemento = listadoProductos.find(item => item.id == id);

    if(elemento) {
        console.log("Producto encontrado antes de actualizar", elemento);
        elemento.cantidad += 1;
        console.log("Producto encontrado después de actualizar", elemento);
        

        localStorage.setItem("carrito", JSON.stringify(listadoProductos));

        tdCantidad= event.target.closest("td.cantidad");
        
        actualizarCantidad(tdCantidad,elemento);
        
        } else { console.error("Producto no encontrado en el array."); 

        } 
    }


    if (event.target.closest("button.restar")) {
        const id = event.target.closest("tr.tabla").dataset.id;
        console.log("ID del producto:", id);

        const elemento = listadoProductos.find(item => item.id == id);

        if(elemento && elemento.cantidad > 0) {
            console.log("Producto encontrado antes de actualizar", elemento);
            elemento.cantidad -= 1;
            console.log("Producto encontrado después de actualizar", elemento);

            localStorage.setItem("carrito", JSON.stringify(listadoProductos));
            const tdCantidad= event.target.closest("td.cantidad");
        
            actualizarCantidad(tdCantidad,elemento);
            };

        if(elemento.cantidad === 0) {
            const index = listadoProductos.indexOf(elemento);
            if(index > -1) {
                listadoProductos.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(listadoProductos));
                tdCantidad.closest("tr.tabla").remove();
            }
        }
        } else { console.error("Producto no encontrado en el array."); 

        }
            if (event.target.closest("button.eliminar")) {
                const id = event.target.closest("tr.tabla").dataset.id;
                console.log("ID del producto:", id);
                const elemento = listadoProductos.find(item => item.id == id);
                
                if (elemento) { 
                    console.log("Producto encontrado antes de eliminar:",elemento); // Eliminar el producto del array 
                    
                    const index = listadoProductos.indexOf(elemento); 
                    if (index > -1) 
                        { listadoProductos.splice(index, 1); 
                        localStorage.setItem("carrito", JSON.stringify(listadoProductos)); 
                        event.target.closest("tr.tabla").remove();
                        listarCarrito();
                    } } else { console.error("Producto no encontrado en el array."); 

                    } 
                } 
            });
                                