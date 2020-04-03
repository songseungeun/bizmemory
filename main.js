// const $newInfo = document.querySelector('.newInfo');
const $newName = document.querySelector('.newName');
const $newCompany = document.querySelector('.newCompany');
const $newDivision = document.querySelector('.newDivision');
const $newEmail = document.querySelector('.newEmail');
const $newMobile = document.querySelector('.newMobile');
const $submitBtn = document.querySelector('.submitBtn');
const $cardList = document.querySelector('.cardList');

// console.log($newInfo, $newName, $newCompany, $newDivision, $newEmail, $newMobile, $submitBtn);
// console.log($new);

let cardList = [];

const render = () => {
  let html = '';

  cardList.forEach(todo => {
    html += `<li id="${todo.id}" class="namecard">
    <span class="cardName">${todo.name}</span>
    <span class="cardCompany">${todo.company}</span>
    <span class="cardDivision">${todo.division}</span>
    <span class="cardEmail">${todo.email}</span>
    <span class="cardMobile">${todo.mobile}</span>
    <button class="deleteBtn">X</button>
  </li>`;
  });

  $cardList.innerHTML = html;
};

const getData = () => {
  cardList = [
    { id: 1, name: '이하은', company: 'Fast Campus', division: 'UX디자인팀', email: 'daidy@naver.com', mobile: '010-5067-5111', favorite: true, },
  ];
  render();
};

window.onload = getData;


$submitBtn.onclick = () => {
  const newId = 3;
  const newCard = { id: newId, name: `${$newName.value}`, company: `${$newCompany.value}`, division: `${$newDivision.value}`, email: `${$newEmail.value}`, mobile: `${$newMobile.value}`, favorite: false, };
  cardList = [newCard, ...cardList];

  $newName.value = '';
  $newCompany.value = '';
  $newDivision.value = '';
  $newEmail.value = '';
  $newMobile.value = '';
  
  // const arrNewCard = [];

  // for (key in newCard) { arrNewCard.push(key) }

  // arrNewCard.forEach(card => { card.value = ''; });



  render();
};