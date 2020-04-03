let cardList = [];

const $newInfo = document.querySelector('.newInfo');
const $cardList = document.querySelector('.cardList');
const $submitBtn = document.querySelector('.submitBtn');
const $sortName = document.querySelector('.sortName');
const $sortCompany = document.querySelector('.sortCompany');
const $sortRecent = document.querySelector('.sortRecent');
const $favorite = document.querySelector('.favorite');

const render = key => {
  let html = '';
  const sortBy = key => {
    const sortById = cardList.sort((card1, card2) => card1[key] < card2[key] ? 1 : (card1[key] > card2[key] ? -1 : 0))
    const sortByElse = cardList.sort((card1, card2) => card1[key] > card2[key] ? 1 : (card1[key] < card2[key] ? -1 : 0))
    key === 'id' ? sortById : sortByElse;
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

$submitBtn.onclick = e => {
  let inputs = [...$newInfo.children].filter(child => child.nodeName === 'INPUT');
  let newValues = inputs.map(input => input.value.trim());
  const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const checkMobile = /^\d{3}-\d{4}-\d{4}/;
  const checkName = /../;

  if (newValues.filter(value => value.length === 0).length !== 0) {
    alert('빈칸을 채워주세요!');
    return;
  };

  // if (!checkName.test(newValues[0])) {
  //   alert('이름 형식을 지켜주세요!')
  //   return;
  // } else if (!checkEmail.test(newValues[4])) {
  //   alert('이메일 형식을 지켜주세요!')
  //   return;
  // } else if (!checkMobile.test(newValues[5])) {
  //   alert('번호 형식을 지켜주세요!')
  //   return;
  // };

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

  inputs.forEach(input => input.value = '');
};

