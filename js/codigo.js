let myCart = [];

const apiURL = 'https://www.themealdb.com/api/json/v1/1/categories.php'

const totalAmount = document.getElementById('totalAmount');
const productsContainer = document.getElementById('products-container');
const cartList = document.getElementById('cart-list');
const submitButton = document.getElementById('onSubmit');

const store = document.getElementById('store');
const btnLogin = document.getElementById('btnLogin');
const inputSearch = document.getElementById('inputSearch');
const formInput = document.getElementById('formInput');
const productsSearch = document.getElementById('productsSearch');
const cleanSearch = document.getElementById('cleanSearch');
const esconderSearch = document.getElementById('esconderSearch');
const contError = document.getElementById('contError');
const goToCart = document.getElementById('goToCart');




//LLAMADA A LA API

const getMeals = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET'
        });

        const json = await response.json();
      const { categories } = json;
      console.log(categories);
     
      if (localStorage.getItem('token')){
        renderMeals(categories);  
      }
      

    } catch( error ) {
        alert(error);
    }
};

// RENDERIZAR POR BUSQUEDA 

const searchMeal = async (e) => {
    e.preventDefault();
    const term = inputSearch.value;
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`, {
            method: 'GET'
        });
        const json = await res.json();
        console.log(json.meals);
        
        cleanSearch.addEventListener('click', () => {
            productsSearch.innerHTML=''
        })
        
            json.meals.forEach((meal)=> {

                

                const li = document.createElement('li');
                const div = document.createElement('div');
                
                const id = meal.idMeal;
                const img = document.createElement('img');
                img.src = meal.strMealThumb;
                img.alt = meal.strMeal;
                img.classList = "imgComida"
        
                div.appendChild(img);
                const spanDescription = document.createElement('span');
                spanDescription.style.display="none"
                spanDescription.innerText = meal.strInstructions;
                spanDescription.style.fontWeight = "bold";
                
                img.addEventListener('click', () => {
                    if (spanDescription.style.display === "none") {
                        spanDescription.style.display = "flex";
                      } else {
                        spanDescription.style.display = "none";
                      }
                   
                })
        
                const spanTitle = document.createElement('span');
                spanTitle.innerText = meal.strMeal;
                spanTitle.style.fontWeight = "bold";
        
                const spanPrice = document.createElement('span');
                const price = Math.floor(Math.random() * 1000) + 450
                spanPrice.innerText = `$ ${price}`
        
                const button = document.createElement('button');
                button.innerText = 'Comprar';
        
                li.appendChild(div);
                li.appendChild(spanTitle);
                li.appendChild(spanDescription);
                li.appendChild(spanPrice);
                li.appendChild(button);
        
                button.addEventListener('click', () => {
        
                    const comida = myCart.find(comida => comida.id === id);
                    
                    if (comida){
                        const index = myCart.indexOf(comida);
                        comida.quantity ++;
                        myCart[index] = comida;
                        
                    }else{
                        const mealToCart = {
                            img: meal.strMealThumb,
                            name: meal.strMeal,
                            price,
                            id: meal.idMeal,
                            quantity: 1
                        };
                        myCart.push(mealToCart);
        
                    }
                   
                    renderCartProduct();
                    showTotalAmount();
                });
                productsSearch.appendChild(li);
                contError.innerText=''
                })
        
    } catch (error) {
        contError.innerText='No hubo coincidencias, intenta una vez más. Ej: chicken/salad/egg...'
    }
}

formInput.addEventListener('submit', searchMeal);

//RENDERIZAR PRODUCTOS PRINCIPALES (EL MISMO CODIGO DE ARRIBA CAMBIANDO LA LLAMADA A LOS meal.sarasa)

const renderMeals = (comidas) => {
    
    comidas.forEach(meal => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        
        const id = meal.idCategory;
        const img = document.createElement('img');
        img.src = meal.strCategoryThumb;
        img.alt = meal.strCategory;
        img.classList = "imgComida"

        div.appendChild(img);
        const spanDescription = document.createElement('span');
        spanDescription.style.display="none"
        spanDescription.innerText = meal.strCategoryDescription;
        spanDescription.style.fontWeight = "bold";
        
        img.addEventListener('click', () => {
            if (spanDescription.style.display === "none") {
                spanDescription.style.display = "flex";
              } else {
                spanDescription.style.display = "none";
              }
           
        })

        const spanTitle = document.createElement('span');
        spanTitle.innerText = meal.strCategory;
        spanTitle.style.fontWeight = "bold";

        const spanPrice = document.createElement('span');
        const price = Math.floor(Math.random() * 1000) + 450
        spanPrice.innerText = `$ ${price}`

        const button = document.createElement('button');
        button.innerText = 'Comprar';

        li.appendChild(div);
        li.appendChild(spanTitle);
        li.appendChild(spanDescription);
        li.appendChild(spanPrice);
        li.appendChild(button);

        

        button.addEventListener('click', () => {

            const comida = myCart.find(comida => comida.id === id);
            
            if (comida){
                const index = myCart.indexOf(comida);
                comida.quantity ++;
                myCart[index] = comida;
                
            }else{
                const mealToCart = {
                    img: meal.strCategoryThumb,
                    name: meal.strCategory,
                    price,
                    id: meal.idCategory,
                    quantity: 1
                };
                myCart.push(mealToCart);

            }
           
            renderCartProduct();
            showTotalAmount();
        });

        productsContainer.appendChild(li);
    });
}

//MOSTRAR PRECIO TOTAL

const showTotalAmount = () => {

    let total = 0;
    myCart.forEach(cart => {
        total += (cart.price * cart.quantity);
    });

    totalAmount.innerText = `$ ${total}`;
}

//RENDERIZAR EN EL CARRITO DE COMPRAS

const renderCartProduct = () => {
    cartList.innerText=null;

    myCart.forEach(product => {

        
        const container = document.createElement('div');
        container.className = 'cart-item';
 
        const cartItemContent = document.createElement('div');
        cartItemContent.className = 'cart-item-content';
   
        const itemImg = document.createElement('div');
        itemImg.className = 'item-img';
        itemImg.style.marginRight = '30px';

        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.style.width = '100px';

        itemImg.appendChild(img);

        cartItemContent.appendChild(itemImg);

        const itemName = document.createElement('span');
        itemName.innerText = `- ${product.name}`;

        const itemQuantity = document.createElement('b');
        itemQuantity.innerText = `X ${product.quantity}`;
        itemQuantity.style.marginLeft = '80px';

        const nameAndQuantity = document.createElement('div');
        nameAndQuantity.appendChild(itemQuantity);
        nameAndQuantity.appendChild(itemName);
        
        cartItemContent.appendChild(nameAndQuantity);

        const itemPrice = document.createElement('span');
        itemPrice.innerText = `$ ${product.price}`;

        container.appendChild(cartItemContent);

        container.appendChild(itemPrice);
        
        cartList.appendChild(container);

    })
}

// MOSTRAR ELEMENTOS DEPENDIENDO SI HAY TOKEN O NO

    const navCont = document.querySelector('.navCont')
    const principalWrapper = document.querySelector('.principalWrapper')
    const h2Wrapper = document.querySelector('.h2Wrapper')
    const cartWrapper = document.getElementById('cartWrapper')

   
        const pCerrar = document.createElement('a')

        pCerrar.innerText='Cerrar sesion'

        pCerrar.addEventListener('click', () => {
            localStorage.removeItem("token");
            location.reload()
        });

        pCerrar.className='pCerrar'

        navCont.appendChild(pCerrar)
    

//MENSAJE PARA FINALIZAR COMPRA

submitButton.addEventListener('click', () => {

    
    const compraFinal = document.getElementById('compraFinal')

    cartList.innerHTML = null;
    myCart = [];
    showTotalAmount();
    
    
    const compraHecha = document.createElement('div')
    const compraRealizada = document.createElement('h3')
    const compraContacto = document.createElement('p')

    compraHecha.className='compra';

    compraRealizada.innerText='Gracias por su compra'
    compraContacto.innerText='Estaremos en contacto con usted, una vez procesemos su orden'

    compraFinal.appendChild(compraHecha)
    compraHecha.appendChild(compraRealizada)
    compraHecha.appendChild(compraContacto)
});



getMeals();

//ICONO PARA IR AL CART
const contCartList = document.getElementById('contCartList');

goToCart.addEventListener("click", subir);

function subir() {
    contCartList.scrollIntoView({
        behavior: "smooth"
    })
}
