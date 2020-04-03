let cardList = [];

const $newInfo = document.querySelector('.newInfo');
const $submitBtn = document.querySelector('.submitBtn');

const $cardList = document.querySelector('.cardList');

const $sortName = document.querySelector('.sortName');
const $sortCompany = document.querySelector('.sortCompany');
const $sortRecent = document.querySelector('.sortRecent');

const $favorite = document.querySelector('.favorite');

const $newName = document.querySelector('.newName');
const $newEmail = document.querySelector('.newEmail');
const $newMobile = document.querySelector('.newMobile');

const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const checkMobile = /^\d{3}-\d{3,4}-\d{4}$/;
const checkName = /../;

const render = key => {

  let html = '';

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
          <i class="favoriteBtn ${card.favorite ? 'fas' : 'far'} fa-star"></i>
          <i class="deleteBtn fas fa-times"></i>
        </li>`;
  });

  $cardList.innerHTML = html;
};

const getCardList = () => {
  cardList = [
    { id: 1, name: '이하은', company: '카카오 뱅크', division: '앱 개발팀', position: '대리', email: 'daidy@naver.com', mobile: '010-5067-5111', color: 'namecard color1', favorite: true, },
    { id: 2, name: '김우정', company: '토스', division: '인재 개발팀', position: '선입', email: 'tj123y@naver.com', mobile: '010-2344-3453', color: 'namecard color2', favorite: false, },
    { id: 3, name: '송승은', company: '쿠팡', division: '경영지원팀', position: '과장', email: 'wj456@naver.com', mobile: '010-2535-4985', color: 'namecard color3', favorite: false, },
    { id: 4, name: '김태진', company: '에어비앤비', division: 'UX디자인팀', position: '책임', email: 'se7890@naver.com', mobile: '010-2355-2455', color: 'namecard color4', favorite: true, },
  ];
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

$submitBtn.onclick = e => {

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

const favoriteList = target => {
  if (!target.matches('.cardList > li > i.favoriteBtn')) return;

  let id = target.parentNode.id;
  let isFav = cardList.filter(card => card.id === +id)[0].favorite;

  cardList = cardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

$cardList.addEventListener('click', ({
  target
}) => favoriteList(target));
