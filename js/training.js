'use strict'

console.log('zapros');

const req = new Promise(function (resolve, reject) { // Создаём промис(резолв - всё работает, реджект - что то не так)
    setTimeout(() => {
        console.log('podgotovka');

        const product = {
            name: 'TV',
            price: 2000

        };

        resolve(product); // данные получины и вызывается функция(через 2 секунды)
    }, 2000);

});

req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product)
        }, 2000);
    });
}).then(data => {
    data.modify = true;
    return data;
}).then((data) => {
    console.log(data); // передача по цепочке что бы они были последовательные
}) // метод выполняется после положитеьного исхода, аргумент - это резолв