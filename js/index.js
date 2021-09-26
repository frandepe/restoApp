const imagenes = ['./img/imgcomida1.jpg', './img/imgcomida2.jpg', './img/imgcomida3.jpg', './img/imgcomida4.jpg', './img/imgcomida5.jpg'];

let cont = 0;

const carrousel = (contenedor) => {
    contenedor.addEventListener('click', e => {
        const atras = contenedor.querySelector('.atras');
        const adelante = contenedor.querySelector('.adelante');
        const img = contenedor.querySelector('.imgcomidas');
        const tgt = e.target;

        if(tgt === atras){
            if(cont > 0){
                img.src = imagenes[cont -1];
                cont--;
            } else {
                img.src = imagenes[imagenes.length -1];
                cont = imagenes.length -1;
            }
           } else if(tgt === adelante){
                if(cont < imagenes.length -1){
                    img.src = imagenes[cont +1];
                    cont++;
                } else {
                    img.src = imagenes[0];
                    cont = 0;
                }
            }
    });

}

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.contenedor');

    carrousel(contenedor)
})