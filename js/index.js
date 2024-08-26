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
        body: JSON.stringify(item),
        };
        fetch('https://onyuya51yb.execute-api.sa-east-1.amazonaws.com', options)
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
                setTimeout(() => {
                    $('error').innerText = "El email ya está registrado"
                }, 1500);
            } else {
                Swal.fire({
                    title: email + "<br/>ingresado con éxito",
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
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
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
            $("buttontxt").style = "display: none"
            $("loader").style = "display: block"
            $("enviarForm").disabled = true
            setTimeout(function() {
                $("form").elements[0].value = ""
                $("enviarForm").disabled = false
                $("buttontxt").style = "display: block"
                $("loader").style = "display: none"
            }, 2600);
            
        }
    })
})