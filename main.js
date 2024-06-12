const listNovel = document.querySelector('.list');
const cartContain = document.querySelector('.cart');

async function getNovelList(){
    const response = await fetch('./mockData.json');

    const data = await response.json();

    listNovel.innerHTML = data.map(novel => {
        return `<div class="item">
                <img src="./assets/icons/open-book.png" alt="open-book" class="icon-ab">
                <img src="${novel.imgUrl}" alt="${novel.title}">
                <div class="product-info">
                    <h3>${novel.title}</h3>
                    <p>${novel.description}</p>
                    <a href="/pages/detail/index.html?id=${novel.id}" class="btn">View</a>
                </div>
            </div>`
    })
}

function getCartCount(){
   
    const cart = localStorage.getItem('cart');
    const cartData = JSON.parse(cart);
    if(cartData){
        const cartItem = document.querySelector('.cart-item');
        if(cartItem){
            cartItem.innerText  = cartData.length;
        }else{
            cartContain.innerHTML = `<p class="cart-item">${cartData.length}</p>
             <img src="./assets/icons/shopping-cart.png" alt="shopping-cart">`;
        }
    }
    
}



getNovelList();
getCartCount();