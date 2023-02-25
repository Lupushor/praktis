const data = [
  {
    id: '1',
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: '2',
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: '3',
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

localStorage.setItem('books', JSON.stringify(data));

const rootEl = document.querySelector('#root');

const leftEl = document.createElement('div');
leftEl.classList.add('left');

const rightEl = document.createElement('div');
rightEl.classList.add('right');

rootEl.append(leftEl, rightEl);

const titleEl = document.createElement('h1');
const listEl = document.createElement('ul');
const btnEl = document.createElement('button');

titleEl.classList.add('title');
titleEl.textContent = 'Library';

btnEl.classList.add('btn');
btnEl.textContent = 'Add';

listEl.classList.add('list');

leftEl.append(titleEl, listEl, btnEl);

// const rootEl = document.querySelector('#root');
// const leftEl = document.createElement('div');
// leftEl.classList.add('left');
// const rightEl = document.createElement('div');
// rightEl.classList.add('right');
// rootEl.append(leftEl, rightEl);
// const titleEl = document.createElement('h1');
// const listEl = document.createElement('ul');
// const btnEl = document.createElement('button');
// titleEl.classList.add('title');
// titleEl.textContent = 'Library';
// btnEl.textContent = 'Add';
// btnEl.classList.add('btn');
// listEl.classList.add('list');
// leftEl.append(titleEl, listEl, btnEl);

function renderList() {
  const books = JSON.parse(localStorage.getItem('books'));
  const markup = books
    .map(
      ({ id, title }) =>
        `<li id = '${id}'><p class='name'>${title}</p><button type='button'>Edit</button><button type='button' class='delete'>Delete</button></li>`
    )
    .join('');
  listEl.innerHTML = '';
  listEl.insertAdjacentHTML('beforeend', markup);

  const nameEl = document.querySelectorAll('.name');
  nameEl.forEach((el) => {
    el.addEventListener('click', renderPreview);
  });

  const deleteEl = document.querySelectorAll('.delete');
  deleteEl.forEach((el) => {
    el.addEventListener('click', onClickDelete);
  });
}

function renderPreview(e) {
  const bookId = e.target.closest('li').id;
  const booksStronge = JSON.parse(localStorage.getItem('books'));
  const bookPreview = booksStronge.find((el) => el.id === bookId);
  const markup = createPreviewMarkup(bookPreview);
  rightEl.innerHTML = '';
  rightEl.insertAdjacentHTML('beforeend', markup);
}
renderList();

function createPreviewMarkup({ id, title, author, img, plot }) {
  const markup = `<div data-id='${id}'><h2>${title}</h2><p>${author}</p><img src='${img}' alt='title'><p>${plot}</p></div>`;
  return markup;
}

function onClickDelete(e) {
  const booksStronge = JSON.parse(localStorage.getItem('books'));
  const deleteId = e.target.closest('li').id;
  const books = booksStronge.filter((el) => el.id !== deleteId);
  localStorage.setItem('books', JSON.stringify(books));
  renderList();
}

btnEl.addEventListener('click', onClickAddBtn);

function onClickAddBtn() {
  const markup = createFormMarkup();
  rightEl.insertAdjacentHTML('beforeend', markup);
  const newBook = {
    id: `${Date.now()}`,
    title: '',
    author: '',
    plot: '',
    img: '',
  };
  fillObject(newBook);

  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', submitHandler);

  function submitHandler(e) {
    e.preventDefault();

    const booksStronge = JSON.parse(localStorage.getItem('books'));
    booksStronge.push(newBook);

    localStorage.setItem('books', JSON.stringify(booksStronge));
    renderList();

    const markup = createPreviewMarkup(newBook);
    rightEl.innerHTML = '';
    rightEl.insertAdjacentHTML('beforeend', markup);
  }
}

function createFormMarkup() {
  const markup = `<form>
    <label>Title<input name='title' type='text'></label>
    <label>Author<input name='author' type='text'></label>
    <label>Plot<input name='plot' type='text'></label>
    <label>Img<input name='img' type='url'></label>
    <button type ='submit'>Save</button>
    </form>`;
  return markup;
}

function fillObject(obj) {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((el) => {
    el.addEventListener('chenge', chengeHalder);
  });
  function chengeHalder(e) {
    obj[e.target.name] = e.target.value;
  }
}
