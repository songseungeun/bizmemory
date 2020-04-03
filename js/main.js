// states
let cardList = [];

const $cardList = document.querySelector('.cardList');
const $submitBtn = document.querySelector('.submitBtn');

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

$cardList.onclick = e => {
  let id = e.target.parentNode;
  if (!e.target.matches('.cardList > .namecard > i.deleteBtn')) return;
  cardList = cardList.filter(card => card.id !== +id);
  render();
};