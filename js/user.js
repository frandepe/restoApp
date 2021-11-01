const baseURL = 'https://back-sandbox.herokuapp.com/api';

// const contenedorFlex = document.querySelector('.contenedorFlex')

const getUserInfo = async () => {

    try{
        const response = await fetch(`${baseURL}/user`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2M5NzljMTRiZTljMDAwNDI4NTI3MiIsImlhdCI6MTYzNTY5ODgyNX0.uz-qSPBcN5SoyRBNKLiIU5Sj1rUF8lZu2c3mT0y2_qw"
            }
        });

        const json = await response.json();
        console.log(json);
        
       
    } catch( error ) {
        alert('error')
    }
}

    

getUserInfo();