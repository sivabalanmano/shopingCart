let lable = document.getElementById('lable');

let shopingCart = document.getElementById("shoping-cart");

let basket =JSON.parse(localStorage.getItem("data")) || []


let calculation = ()=>{
    let cardIcon = document.getElementById('cardamound')
   cardIcon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0)

}
calculation();

let generatCrtItem =  ()=>{
    if(basket.length !== 0){
        return (shopingCart.innerHTML =  basket.map((x)=>{
            let {id,item} =x;
            let search = shopData.find((y)=>y.id === id) || []
            return `
            <div class="cart-item"> 
             <img width="100" src=${search.img} alt=""/>
             <div class="details">
             <div class="title-price-x"></div>
               <h4>
                <p>${search.name}</p>
                <p> $ ${search.price}</p>
               </h4>
             <i class="bi bi-x-lg"></i>
             <div class="cart-buttons"></div>
             <h3></h3>
             </div>
            </div>`;
        }).join(""))
    }
    else{
        shopingCart.innerHTML=``
        lable.innerHTML=`
        <h2>Cart is Empty<h2>
        <a href="index.html">
        <button class="HomeBtn">Back To Home</button>
        </a>`;
    }
}
generatCrtItem();