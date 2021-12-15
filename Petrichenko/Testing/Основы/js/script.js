/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

const movieDB = {
    movies: [
        'Логан',
        'Лига справедливости',
        'Ла-ла лэнд',
        'Одержимость',
        'Скотт Пилигрим против...',
    ],
};

const promo = document.querySelectorAll('[data-promo] img');
const genre = document.querySelector('.promo__genre');
const bacgrn = document.querySelector('.promo__bg');
const movieList = document.querySelector('.promo__interactive-list');
const addForm = document.querySelector('[data-form]');
const addInput = addForm.querySelector('[data-input]');
const checkBox = addForm.querySelector('[type="checkbox"]');

const deleteAdv = (adv) => {
    adv.forEach((element) => {
        element.remove();
    });
};
deleteAdv(promo);

const ert = (gnr, bacImg) => {
    gnr.textContent = 'ДРАМА';

    bacImg.style.backgroundImage = 'url("img/bg.jpg")';
};
ert(genre, bacgrn);

const sortArr = (arr) => {
    arr.sort();
};
sortArr(movieDB.movies);

function createMovies(films, parent) {
    parent.innerHTML = '';
    sortArr(films);

    films.forEach((film, i) => {
        parent.innerHTML += `<li class="promo__interactive-item"> ${i + 1}. ${film}
            <div class="delete" data-delete></div>
        </li>
        `;
    });

    document.querySelectorAll('[data-delete]').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            films.splice(i, 1);

            createMovies(films, parent);
        });
    });
}
createMovies(movieDB.movies, movieList);

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newFilm = addInput.value;
    const favorite = checkBox.checked;

    if (newFilm) {
        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }
        if (favorite) {
            console.log('object');
        }
        movieDB.movies.push(newFilm);

        createMovies(movieDB.movies, movieList);
    }

    addForm.reset();
});
