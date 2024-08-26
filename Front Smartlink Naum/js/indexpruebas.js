const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (email, client) => {
    const item = {
        email,
        client
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        mode: "no-cors",
        body: JSON.stringify(item),
        };
        fetch('https://rp5k32sr29.execute-api.sa-east-1.amazonaws.com/', options)
        .then(response => {
            // Verifica si la respuesta tiene contenido
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            return response.text().then(text => {
                return text ? JSON.parse(text) : {}; // Si el cuerpo está vacío, retorna un objeto vacío
            });
        })
        .then(data => {
            if (data.mensaje && data.mensaje.includes('ya existe')) {
                alert('El registro ya existe y no se guardó de nuevo');
            } else {
                alert('Registro guardado exitosamente');
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            alert('Error al comunicarse con el servidor');
        });
}

window.addEventListener('load', () => {
    $('email').addEventListener('focus', () => {
        $("email").classList.add("borde")
        $('error').innerText = ""
    })

    $('email').addEventListener('blur', () => {
        $("email").classList.remove("borde")
    })

    $('email').addEventListener('keydown', () => {
        $('error').innerText = ""
    })

    $("form").addEventListener("submit", event => {
        event.preventDefault()
        let error = false
        let form = $('form');

        if(!emailRegex.test($('email').value)){
            error = true
            $('error').innerText = "Debes ingresar un email válido"
            $("form").elements[0].value = ""
        }

        if(!error) {
            agregarEmail(form.elements[0].value, "naum")
            Swal.fire({
                title: form.elements[0].value + "<br/>ingresado con éxito",
                imageUrl: "img/naum-logo.svg",
                imageWidth: 150,
                imageHeight: 50,
                imageAlt: "Logo Naum",
                icon: "success",
                iconColor: "#4b5563",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 2500,
                timerProgressBar: true,
                customClass: {
                    icon: 'icon',
                    title: "title"
                  }
              });
            $("form").elements[0].value = ""
        }
    })
})