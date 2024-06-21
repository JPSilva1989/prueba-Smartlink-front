const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (data) => {
    const email = {
        email: data
    }
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        mode: "no-cors",
        body: JSON.stringify(email),
        };
        console.log(email)
        fetch('https://rp5k32sr29.execute-api.sa-east-1.amazonaws.com/', options)
        .then(data => {
            if(!data.ok) {
                throw Error(data.status)
            }
            return data.json()
        }).then(email => {
            console.log(email)
        }).catch(e => {
            console.log(e);
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
        }

        if(!error) {
            agregarEmail(form.elements[0].value)
            console.log("mail ingresado con exito")
        }
    })
})