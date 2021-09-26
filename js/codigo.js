let myCart = [];

const apiURL = 'https://www.themealdb.com/api/json/v1/1/categories.php'

const totalAmount = document.getElementById('totalAmount');
const productsContainer = document.getElementById('products-container');
const cartList = document.getElementById('cart-list');
const submitButton = document.getElementById('onSubmit');



const getMeals = async () => {
    try {

        const response = await fetch(apiURL, {
            method: 'GET'
        });

        const json = await response.json();
      const { categories } = json;
      renderMeals(categories);

    } catch( error ) {
        alert(error);
    }
};

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

const showTotalAmount = () => {

    let total = 0;
    myCart.forEach(cart => {
        total += (cart.price * cart.quantity);
    });

    totalAmount.innerText = `$ ${total}`;
}


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

submitButton.addEventListener('click', () => {

    cartList.innerHTML = null;
    myCart = [];
    showTotalAmount();
    alert('Gracias por comprar en nuestro Restaurante');
});

getMeals();