const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");

const apellido = document.getElementById("apellido");

const email = document.getElementById("email");

const consulta = document.getElementById("consulta");

formulario.addEventListener("submit",(e) => {
    e.preventDefault();

    if(nombre.value.trim() ==="") {
        alert("Por favor, ingrese su nombre.");
        return;
    }
    if(nombre.value.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return;
    }

    if(apellido.value.trim() ==="") {
        alert("Por favor, ingrese su apellido.");
        return;
    }
    if(apellido.value.length < 3) {
        alert("El apellido debe tener al menos 3 caracteres.");
        return;
    }
    if(email.value.trim() ==="") {
        alert("Por favor, ingrese su correo electrónico.");
        return;
    }
    if(!email.value.includes("@")) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }
    if(consulta.value.length < 40) {
        alert("La consulta debe tener al menos 40 caracteres.");
        return;
    }
    alert("Formulario enviado con éxito.")

    formulario.reset();

});
