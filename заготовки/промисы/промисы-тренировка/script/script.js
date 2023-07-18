let productsListDOM = document.querySelector(".products-list")

/* console.log('hello 1');
console.log('hello 2');
 */
//let isLoading = false

//движок V8 С++

/* let fetchRes = fetch('https://fakestoreapi.com/products') //проходит время
    .then(res => res.json()) //сервер вернёт обьект респонc
    .then(productsList => {
        productsList.map((product) => productsListDOM.innerHTML +=  `<div class="products-item"> <div class="title">${product.title}</div> <img src='${product.image}'></div>`)
    })
    .catch(err => console.log('err', err))
 */

fetch('https://fakestoreapi.com/users', {
    method: "POST",
    body: JSON.stringify(
        {
            email: 'John@gmail.com',
            username: 'johnd',
            password: 'm38rmF$',
            name: {
                firstname: 'John',
                lastname: 'Doe'
            },
            address: {
                city: 'kilcoole',
                street: '7835 new road',
                number: 3,
                zipcode: '12926-3874',
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                }
            },
            phone: '1-570-236-7033'
        }
    )
})
    .then(res => res.json())
    .then(json => console.log(json))

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

