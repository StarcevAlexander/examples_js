let productsListDOM = document.querySelector(".products-list")

/* console.log('hello 1');
console.log('hello 2');
 */
//let isLoading = false

//движок V8 С++

let fetchRes = fetch('https://fakestoreapi.com/products') //проходит время
    .then(res => res.json()) //сервер вернёт обьект респонc
    .then(productsList => {
        productsList.map((product) => productsListDOM.innerHTML +=  `<div class="products-item"> <div class="title">${product.title}</div> <img src='${product.image}'></div>`)
    })
    .catch(err => console.log('err', err))


//.finally(()=> isLoading = true, console.log(123)) //файнали сработает всегда, независимо от резолв/реджект

/* console.log(fetchRes);
console.log('hello 3');
 */

/* let promise = new Promise((resolve, reject) => {
    resolve([])//ответ от сервера, всё что приходит оттуда
    reject(new Error('error')) //если ошибка то выведет её
}) */


/* console.log('hi1');
let promise = new Promise((resolve, reject) => {
    console.log('hi2'); // всё равно займёт своё место, не смотря на промис
    resolve(2)
})
    .then(res => console.log(res))
console.log('hi3'); */

//lifo last in first out

