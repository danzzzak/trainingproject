function cards() {
       //CLASS for cards

       class MenuCard {
        constructor(scr, alt, title, descr, price, parentSelector, ...classes) {
            this.scr = scr;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector)
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
                    <img src=${this.scr} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> Руб/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    const getResourse = async (url) => { // получение данных 
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`cant fetch ${url}, status: ${res.status}`); // Отлавливает ошибку
        }

        return await res.json();
    };

    // getResourse('http://localhost:3000/menu')
    //     .then(data => {
            // data.forEach(({img, altimg, title, descr, price}) => { // Деструктиризация объекта по частям
            //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // 
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => { // Деструктиризация объекта по частям
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
        });
}

export default cards;