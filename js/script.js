document.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('[data-tab-item]');
    const tabsContent = document.querySelectorAll('[data-tabcontent]');
    const tabsParent = document.querySelector('[data-tab-items]');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', (event) => {
        const { target } = event;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const deadline = '2021-12-31';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor((t / (1000 * 60 * 60 * 24)));
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor(((t / (1000 * 60 * 60)) % 24));

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        }
        return number;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('[data-days]');
        const hours = timer.querySelector('[data-hours]');
        const minutes = timer.querySelector('[data-minutes]');
        const seconds = timer.querySelector('[data-seconds]');

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
        }

        function zeroClock() {
            const t = getTimeRemaining(endTime);
            const timeInterval = setInterval(updateClock, 1000);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        updateClock();
        zeroClock();
    }

    setClock('[data-timer]', deadline);

    // modal window

    const modalOpenBtn = document.querySelectorAll('[data-modal-open]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-modal-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    // const modalTimerId = setTimeout(openModal, 4500);

    modalOpenBtn.forEach((item) => {
        item.addEventListener('click', () => {
            openModal();
            // clearInterval(modalTimerId);
        });
    });

    function modalClose() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', () => {
        modalClose();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalClose();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    });
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document
            .documentElement.scrollHeight - 1) {
            openModal();
            // clearInterval(modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //    class for card

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 27.5;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: '
        + ' больше свежих овощей и фруктов. Продукт активных и здоровых людей. '
        + ' Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        14,
        '[data-menu-card]',
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и'
        + ' качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в'
        + ' ресторан!',
        21,
        '[data-menu-card]',
        'menu__item',
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие'
        + ' продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество'
        + ' белков за счет тофу и импортных вегетарианских стейков.',
        17,
        '[data-menu-card]',
        'menu__item',
    ).render();

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'loading....',
        success: 'success..',
        failure: 'failure',
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                }
            });
        });
    }

    forms.forEach((item) => {
        postData(item);
    });
});
