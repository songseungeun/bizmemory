let cardList = [];
let favCardList = [];

const $newInfo = document.querySelector('.newInfo');
const $submitBtn = document.querySelector('.submitBtn');

const $namecardList = document.querySelector('.namecardList');
const $cardList = document.querySelector('.cardList');
const $sortList = document.querySelector('.sortList');

const $favList = document.querySelector('.favList');
const $favTitle = document.querySelector('.favTitle');

const $newName = document.querySelector('.newName');
const $newEmail = document.querySelector('.newEmail');
const $newMobile = document.querySelector('.newMobile');


const $blankMsg = document.querySelector('.blankMsg');

const $modal = document.querySelector('.modal');
const $warningMsg = document.querySelector('.warningMsg');
const $warningClose = document.querySelector('.warningClose');


const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const checkMobile = /^\d{3}-\d{3,4}-\d{4}$/;
const checkName = /../;

const blankMsg = () => {
  $blankMsg.style.display = (cardList.length || favCardList.length) ? 'none' : 'block';
};

const render = key => {
  let html = '';
  let favHtml = '';
  const isFav = [...cardList.filter(card => card.favorite), ...favCardList.filter(card => card.favorite)];
  const isNotFav = [...cardList.filter(card => !card.favorite), ...favCardList.filter(card => !card.favorite)];

  cardList = isNotFav;
  favCardList = isFav;

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
          <img class="favoriteBtn fas" src="./img/fav-icon.png">
          <img class="deleteBtn" src="./img/close-btn.png">
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
          <img class="favoriteBtn far" src="./img/fav-icon-on.png">
          <img class="deleteBtn" src="./img/close-btn.png">
        </li>`;
  });

  $favTitle.style.display = favCardList.length ? 'block' : 'none';

  $cardList.innerHTML = html;
  $favList.innerHTML = favHtml;

  blankMsg();
};

const getCardList = () => {
  cardList = [{
    id: 1,
    name: '이하은',
    company: '카카오뱅크',
    division: '앱 개발팀',
    position: '대리',
    email: 'daidy@naver.com',
    mobile: '010-5067-5111',
    color: 'namecard color1',
    favorite: false,
  },
  {
    id: 2,
    name: '김우정',
    company: '토스',
    division: '인재 개발팀',
    position: '선임',
    email: 'tj123y@naver.com',
    mobile: '010-2344-3453',
    color: 'namecard color2',
    favorite: false,
  },
  {
    id: 3,
    name: '송승은',
    company: '라인',
    division: '경영지원팀',
    position: '과장',
    email: 'wj456@naver.com',
    mobile: '010-2535-4985',
    color: 'namecard color3',
    favorite: false,
  },
  {
    id: 4,
    name: '김태진',
    company: '에어비앤비',
    division: 'UX디자인팀',
    position: '책임',
    email: 'se7890@naver.com',
    mobile: '010-2355-2455',
    color: 'namecard color4',
    favorite: false,
  },
  {
    id: 5,
    name: '김데레사',
    company: '에어비앤비',
    division: 'UX디자인팀',
    position: '책임',
    email: 'se7890@naver.com',
    mobile: '010-2355-2455',
    color: 'namecard color6',
    favorite: false,
  },
  {
    id: 6,
    name: '이웅모',
    company: '라인',
    division: '경영지원팀',
    position: '과장',
    email: 'wj456@naver.com',
    mobile: '010-2535-4985',
    color: 'namecard color5',
    favorite: false,
  }].sort((a, b) => b.id - a.id);

  favCardList = [];
  render('id');
};

const generateId = () => {
  return cardList.length ? Math.max(...cardList.map(card => card.id)) + 1 : 1;
};

window.onload = getCardList;


const generateColor = () => {
  const colorNumber = generateId();
  return colorNumber % 6;
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

  const inputs = [...$newInfo.children].filter(child => child.nodeName === 'INPUT');
  const newValues = inputs.map(input => input.value.trim());

  if (newValues.filter(value => value.length === 0).length !== 0) {

    $modal.style.display = 'block';

    // switch (표현식) {
    //   case 표현식1:
    //     switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    //     break;
    //   case 표현식2:
    //     switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    //     break;
    //   default:
    //     switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
    // }

    
    switch (true) {
      case !newValues[0]:
        $warningMsg.textContent = '이름을 입력해 주세요';
        break;
      case !newValues[1]:
        $warningMsg.textContent = '회사를 입력해 주세요';
        break;
      case !newValues[2]:
        $warningMsg.textContent = '부서를 입력해 주세요';
        break;
      case !newValues[3]:
        $warningMsg.textContent = '직급을 입력해 주세요';
        break;
      case !newValues[4]:
        $warningMsg.textContent = '이메일을 입력해 주세요';
        break;
      default:
        $warningMsg.textContent = '핸드폰 번호를 입력해 주세요';
    }

    if (!newValues[0]) {
      $warningMsg.textContent = '이름을 입력해 주세요';
      return;
    } if (!newValues[1]) {
      $warningMsg.textContent = '회사를 입력해 주세요';
      return;
    } if (!newValues[2]) {
      $warningMsg.textContent = '부서를 입력해 주세요';
      return;
    } if (!newValues[3]) {
      $warningMsg.textContent = '직급을 입력해 주세요';
      return;
    } if (!newValues[4]) {
      $warningMsg.textContent = '이메일을 입력해 주세요';
      return;
    } if (!newValues[5]) {
      $warningMsg.textContent = '핸드폰 번호를 입력해 주세요';
      return;
    }
    return;
  }

  if (!checkName.test(newValues[0]) || !checkEmail.test(newValues[4]) || !checkMobile.test(newValues[5])) return;
  const [name, company, division, position, email, mobile] = newValues;

  cardList = [{
    id: generateId(),
    name,
    company,
    division,
    position,
    email,
    mobile,
    favorite: false,
    color: generateColor()
  }, ...cardList];

  render('id');

  inputs.forEach(input => {
    input.value = '';
  });
};

// close modal event

$warningClose.onclick = e => {
  e.target.parentNode.parentNode.style.display = 'none';
};

// Delete Button event

$cardList.onclick = e => {
  const {
    id
  } = e.target.parentNode;
  if (!e.target.matches('.cardList > .namecard > img.deleteBtn')) return;
  cardList = cardList.filter(card => card.id !== +id);
  render();
};

$favList.onclick = e => {
  const {
    id
  } = e.target.parentNode;
  if (!e.target.matches('.favList > .namecard > img.deleteBtn')) return;
  favCardList = favCardList.filter(card => card.id !== +id);
  render();
};

// $namecardList.onclick = e => {
//   const { id } = e.target.parentNode;
//   if (e.target.matches('.cardList > .namecard > img.deleteBtn') && !e.target.matches('.favList > .namecard > img.deleteBtn')) return;
//   favCardList = favCardList.filter(card => card.id !== +id);
//   render();
// };



// favorite event

const toFavList = target => {
  if (!target.matches('.cardList > li > img.favoriteBtn')) return;

  const { id } = target.parentNode;

  cardList = cardList.map(card => (card.id === +id ? {
    ...card,
    favorite: !card.favorite
  } : card));

  render('id');
};

const fromFavList = target => {
  if (!target.matches('.favList > li > img.favoriteBtn')) return;

  const { id } = target.parentNode;

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
    console.log(e.target);
    cardList = cardList.sort((recent1, recent2) => ((recent1.id < recent2.id) ? 1 : recent1.id > recent2.id ? -1 : 0));
  }
  render();
};
