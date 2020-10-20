import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/veg.svg',
        success: 'Спасибо, скоро свяжемся',
        failure: 'Что то не так'
    };

    forms.forEach(item => { // Подвязываем функцию для всех форм
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // Вывод сообщения статуса
            statusMessage.scr = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);



            // request.setRequestHeader('Content-type', 'application/json'); // При использованиие XMLHttpRequest и form data заголовок не нужен
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries() ) ); // преобразование объекта формдата в джей сон формат // entries - Создаёт массивы из ключ-значение
            // Превращает formData в 2мерный массив - потом превращаетм в обычный объект - потом в JSON

            postData('http://localhost:3000/requests', json) // сама отправка 
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset(); // очистка введёной инфы
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close> × </div>   
            <div class="modal__title">${message}</div>     
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000)

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

export default forms;