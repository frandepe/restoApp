
const baseURL = 'https://back-sandbox.herokuapp.com/api';

const formEmail = document.getElementById('formEmail');
const formPass = document.getElementById('formPass');
const btnSubmit = document.getElementById('btnSubmit');

const contenedorLogin = document.querySelector('.contenedorLogin')
const contenedorFlex = document.querySelector('.contenedorFlex')
const inputCheck = document.querySelector('.inputCheck')

const login = async () => {

    const body = {
        email: formEmail.value,
        password: formPass.value
    };

    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.token);
        

        if (json.token) {
        contenedorLogin.style.display='none';

        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const a = document.createElement('a')

        h2.innerText='Bienvenido a Cooking';
        p.innerText='Disfrute de su compra'
        a.href='./../index.html'
        img.src='./../img/logo.png'
        img.alt='Cooking'

        div.className='cont-bienvenido'

        contenedorFlex.appendChild(div);
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(a)
        a.appendChild(img)
        } else {
            const pError = document.createElement('p');

            pError.innerText = json.message;
            pError.style.color='red'

            inputCheck.appendChild(pError);

        }
        
        

    } catch(error) {
        alert(error)

    }

}


btnSubmit.addEventListener('click', login)