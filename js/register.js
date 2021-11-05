const baseURL = 'https://back-sandbox.herokuapp.com/api';

const formName = document.getElementById('formName');
const formLastName = document.getElementById('formLastName');
const formEmail = document.getElementById('formEmail');
const formPass = document.getElementById('formPass');
const btnSubmit = document.getElementById('btnSubmit');

const contenedorLogin = document.querySelector('.contenedorLogin')
const contenedorFlex = document.querySelector('.contenedorFlex')
const inputCheck = document.querySelector('.inputCheck')

const register = async () => {
    const payload = {
        email: formEmail.value,
        password: formPass.value,
        name: formName.value,
        lastName: formLastName.value
    };

    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.token);

        if (response.status === 201) {
        contenedorLogin.style.display='none';

        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const pHome = document.createElement('p')
        const img = document.createElement('img');
        const a = document.createElement('a')

        h2.innerText='Bienvenido a Cooking';
        p.innerText='Disfrute de su compra'
        pHome.innerText='Home ⬇'
        a.href='./../index.html'
        img.src='./../img/logo.png'
        img.alt='Cooking'

        pHome.style.fontWeight='bold'
        pHome.style.marginTop='10px'

        div.className='cont-bienvenido'

        contenedorFlex.appendChild(div);
        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(pHome)
        div.appendChild(a)
        a.appendChild(img)
        }else {
            const pError = document.createElement('p');

            pError.innerText = json.message;
            pError.style.color='red'

            inputCheck.appendChild(pError);

        }
        
    } catch (error){
        alert(error)
    }
}

btnSubmit.addEventListener('click', register)