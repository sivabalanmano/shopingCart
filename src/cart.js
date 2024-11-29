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
             <div class="title-price-x">
               <h4 class="title-price">
                <p>${search.name}</p>
                <p class="card-item-price"> $ ${search.price}</p>
               </h4>
             <i onclick ="removeItem(${id})" class="bi bi-x-lg"></i>
             </div>
                    <div class="buttons">
                                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                    <div id=${x.id} class="quantity">${item}</div>
                                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
             <h3> $ ${item * search.price}</h3>
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

let increment = (id) =>{
    let selectItem =id;
    let search = basket.find((x)=>x.id === selectItem.id)
    if(search === undefined){
    basket.push({
        id:selectItem.id,
        item:1,
    })}
    else{
        search.item += 1;
    }  
     generatCrtItem();
    localStorage.setItem("data",JSON.stringify(basket));
    update(selectItem.id)
};
let decrement =  (id)=>{
    let selectItem =id;
    let search = basket.find((x)=>x.id === selectItem.id)
    if(search === undefined) return
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(selectItem.id)
    basket = basket.filter((x)=>x.item !== 0)
    generatCrtItem();
    localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id)=>{
    let search = basket.find((x)=>x.id === id)
    //console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectItem = id;
    console.log(selectItem.id)
    basket = basket.filter((x) => x.id !== selectItem.id);
    generatCrtItem();
    TotalAmount()
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let clearCard = () => {
    basket =[]
    generatCrtItem()
    localStorage.setItem("data",JSON.stringify(basket));
    calculation()
    

}
   
let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id,item} =x;
            let search = shopData.find((y)=>y.id === id) || []
            return item * search.price
        }).reduce((x,y)=>x + y , 0)
        lable.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="chekout">chekout</button>
        <button onclick="clearCard()" class="removeAll">removeAll</button>`;
        
    } 
    else return;


}
TotalAmount();