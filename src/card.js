let shop = document.getElementById("shop");


let basket =JSON.parse(localStorage.getItem("data")) || []
let generatrShop = () =>{
    return (shop.innerHTML = shopData.map((x)=>{
        let {id,name,price,desc,img} = x
        let search = basket.find((x)=> x.id === id) || []
       return `
        <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}.</p>
                    <div class="price-qundity">
                    <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${x.id} class="quantity">
                            ${search.item === undefined ? 0:search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }).join(" "))
}
generatrShop()

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
    localStorage.setItem("data",JSON.stringify(basket));
    //console.log(basket)
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
    //console.log(basket)
    localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id)=>{
    let search = basket.find((x)=>x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
};

let calculation = ()=>{
    let cardIcon = document.getElementById('cardamound')
   cardIcon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0)

}
calculation();