let cardList = [];

const $newInfo = document.querySelector('.newInfo');
const $cardList = document.querySelector('.cardList');
const $submitBtn = document.querySelector('.submitBtn');
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
          <i class="deleteBtn fas fa-times"></i>
          <button class="favorite">★</button>
        </li>`;
  });

  $cardList.innerHTML = html;
};

const generateId = () => {
  return cardList.length ? Math.max(...cardList.map(card => card.id)) + 1 : 1;
};

const generateColor = () => {
  let colorNumber = generateId();
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
  const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const checkMobile = /^\d{3}-\d{4}-\d{4}/;
  const checkName = /../;

  if (newValues.filter(value => value.length === 0).length !== 0) {
    alert('빈칸을 채워주세요!');
    return;
  }

  if (!checkName.test(newValues[0])) {
    alert('이름을 2자 이상 입력해주세요');
    return;
  } if (!checkEmail.test(newValues[4])) {
    alert('이메일을 형식에 맞게 입력해주세요.');
    return;
  } if (!checkMobile.test(newValues[5])) {
    alert('핸드폰번호를 형식에 맞게 입력해주세요.');
    return;
  }

  let [name, company, division, position, email, mobile] = newValues;

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
  const { id } = e.target.parentNode;
  if (!e.target.matches('.cardList > .namecard > i.deleteBtn')) return;
  cardList = cardList.filter(card => card.id !== +id);
  render();
};
