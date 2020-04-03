let cardList = [];
let favCardList = [];

const $newInfo = document.querySelector('.newInfo');
const $submitBtn = document.querySelector('.submitBtn');

const $cardList = document.querySelector('.cardList');
const $sortList = document.querySelector('.sortList');

const $favList = document.querySelector('.favList');

const $newName = document.querySelector('.newName');
const $newEmail = document.querySelector('.newEmail');
const $newMobile = document.querySelector('.newMobile');

const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const checkMobile = /^\d{3}-\d{3,4}-\d{4}$/;
const checkName = /../;

const render = key => {

  let html = '';
  let favHtml = '';
  const isFav = [... cardList.filter(card => card.favorite), ...favCardList.filter(card => card.favorite)];
  const isNotFav = [...cardList.filter(card => !card.favorite), ...favCardList.filter(card => !card.favorite)];

  cardList = isNotFav;
  favCardList = isFav;

  const sortBy = key => {
    const sortById = cardList.sort((card1, card2) => (card1[key] < card2[key] ? 1 : (card1[key] > card2[key] ? -1 : 0)));
    const sortByElse = cardList.sort((card1, card2) => (card1[key] > card2[key] ? 1 : (card1[key] < card2[key] ? -1 : 0)));
    return key === 'id' ? sortById : sortByElse;
  };

  sortBy(key);

  cardList.forEach(card => {
    html += `<li id="${card.id}" class="namecard color${card.color}">
          <div class="namecardInfo">
            <span class="cardName">${card.name}</span>
            <span class="cardMobile">${card.mobile}</span>
            <span class="cardEmail">${card.email}</span>
          </div>
          <div class="namecardCompany">
            <span class="cardCompany">${card.company}</span>
            <span class="cardDivision">${card.division}</span>
            <span class="cardPosition">${card.position}</span>
          </div>
          <i class="favoriteBtn far fa-star"></i>
          <i class="deleteBtn fas fa-times"></i>
        </li>`;
  });

  favCardList.forEach(card => {
    favHtml += `<li id="${card.id}" class="namecard color${card.color}">
          <div class="namecardInfo">
            <span class="cardName">${card.name}</span>
            <span class="cardMobile">${card.mobile}</span>
            <span class="cardEmail">${card.email}</span>
          </div>
          <div class="namecardCompany">
            <span class="cardCompany">${card.company}</span>
            <span class="cardDivision">${card.division}</span>
            <span class="cardPosition">${card.position}</span>
          </div>
          <i class="favoriteBtn fas fa-star"></i>
          <i class="deleteBtn fas fa-times"></i>
        </li>`;
  });

  $cardList.innerHTML = html;
  $favList.innerHTML = favHtml;
};

const getCardList = () => {
  cardList = [
    { id: 1, name: '이하은', company: '카카오 뱅크', division: '앱 개발팀', position: '대리', email: 'daidy@naver.com', mobile: '010-5067-5111', color: 'namecard color1', favorite: true, },
    { id: 2, name: '김우정', company: '토스', division: '인재 개발팀', position: '선입', email: 'tj123y@naver.com', mobile: '010-2344-3453', color: 'namecard color2', favorite: false, },
    ];

  favCardList = [
    { id: 3, name: '송승은', company: '쿠팡', division: '경영지원팀', position: '과장', email: 'wj456@naver.com', mobile: '010-2535-4985', color: 'namecard color3', favorite: true, },
    { id: 4, name: '김태진', company: '에어비앤비', division: 'UX디자인팀', position: '책임', email: 'se7890@naver.com', mobile: '010-2355-2455', color: 'namecard color4', favorite: true, },
    ]
  render();

};

const generateId = () => {
  return cardList.length ? Math.max(...cardList.map(card => card.id)) + 1 : 1;
};

window.onload = getCardList;


const generateColor = () => {
  const colorNumber = generateId();
  return colorNumber % 4;
};

$newName.onblur = e => {
  e.target.nextElementSibling.style.display = checkName.test(e.target.value) ? 'none' : 'block';
};

$newEmail.onblur = e => {
  e.target.nextElementSibling.style.display = checkEmail.test(e.target.value) ? 'none' : 'block';
};

$newMobile.onblur = e => {
  e.target.nextElementSibling.style.display = checkMobile.test(e.target.value) ? 'none' : 'block';
};

$submitBtn.onclick = () => {

  let inputs = [...$newInfo.children].filter(child => child.nodeName === 'INPUT');
  let newValues = inputs.map(input => input.value.trim());

  if (newValues.filter(value => value.length === 0).length !== 0) {
    alert('빈칸을 채워주세요!');
    return;
  }

  if (!checkName.test(newValues[0]) || !checkEmail.test(newValues[4]) || !checkMobile.test(newValues[5])) return;
  const [name, company, division, position, email, mobile] = newValues;

  cardList = [...cardList, {
    id: generateId(),
    name,
    company,
    division,
    position,
    email,
    mobile,
    favorite: false,
    color: generateColor()
  }];

  render('id');

  inputs.forEach(input => { input.value = ''; });
};

// Delete Button event

$cardList.onclick = e => {
  const {
    id
  } = e.target.parentNode;
  if (!e.target.matches('.cardList > .namecard > i.deleteBtn')) return;
  cardList = cardList.filter(card => card.id !== +id);
  render();
};

// favorite event

const toFavList = target => {
  if (!target.matches('.cardList > li > i.favoriteBtn')) return;

  let id = target.parentNode.id;

  cardList = cardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

const fromFavList = target => {
  if (!target.matches('.favList > li > i.favoriteBtn')) return;

  let id = target.parentNode.id;

  favCardList = favCardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

$cardList.addEventListener('click', ({
  target
}) => toFavList(target));

$favList.addEventListener('click', ({
  target
}) => fromFavList(target));


// Sort Button event
$sortList.onclick = e => {
  if (e.target.matches('.sortWrapper > .sortList > .sortName')) {
    cardList = cardList.sort((card1, card2) => (card1.name > card2.name ? 1 : card1.name < card2.name ? -1 : 0));
  }
  if (e.target.matches('.sortWrapper > .sortList > .sortCompany')) {
    cardList = cardList.sort((co1, co2) => ((co1.company > co2.company) ? 1 : co1.company < co2.company ? -1 : 0));
  }
  if (e.target.matches('.sortWrapper > .sortList > .sortRecent')) {
    cardList = cardList.sort((recent1, recent2) => ((recent1.id > recent2.id) ? 1 : recent1.id < recent2.id ? -1 : 0));
  }
  render();

