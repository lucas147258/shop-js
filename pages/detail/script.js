const detail = document.querySelector('.detail-contain');
const cartContain = document.querySelector('.cart');

async function getDataDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const novelId = urlParams.get('id');
    
    const response = await fetch('../../mockData.json');

    const data = await response.json();
 
    
    const novel = data.find(novel => novel.id.toString() === novelId.toString());

    detail.innerHTML = `<div class="detail">
            <div class="detail-image">
                <img src="../../${novel.imgUrl}" alt=">${novel.title}">
            </div>
            <div class="detail-info">
                <h2>${novel.title}</h2>
                <p>${novel.description}</p>
                <div class="detail-price">
                    <span class="price">${novel.price} VND</span>
                </div>
            </div>
        </div>`
        const btnAddCart = document.getElementById('addCart');
        
        btnAddCart.addEventListener('click', function(){
            const user = localStorage.getItem('user');
            if(!user){
                alert('Please login to buy');
                return window.location.href = '../authenticate/login/index.html';
            }
            let cart = localStorage.getItem('cart');
            if(cart){
                cart = JSON.parse(cart);
                const index = cart.findIndex(item => item.id === novel.id);
                if(index !== -1){
                    cart[index].quantity += 1;
                } else {
                    cart.push({id: novel.id, quantity: 1});
                }
            } else {
                cart = [{id: novel.id, quantity: 1}];
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            getCartCount();
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
               <img src="../../assets/icons/shopping-cart.png" alt="shopping-cart">`;
        }
    }
}

getDataDetail();
getCartCount();