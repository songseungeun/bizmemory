
const render = () => {
  let html = '';

  cardList.sort((card1, card2) => card2.id - card1.id);

  cardList.forEach(card => {
    html += `<li id="${card.id}" class="namecard color${card.id}">
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
  </li>`;
  });

  $cardList.innerHTML = html;
};

const getCardList = () => {
  cardList = [
    { id: 1, name: '이하은', company: '카카오 뱅크', division: '앱 개발팀', position: '대리', email: 'daidy@naver.com', mobile: '010-5067-5111', favorite: true, },
    { id: 2, name: '김우정', company: '토스', division: '인재 개발팀', position: '선입', email: 'tj123y@naver.com', mobile: '010-2344-3453', favorite: false, },
    { id: 3, name: '송승은', company: '쿠팡', division: '경영지원팀', position: '과장', email: 'wj456@naver.com', mobile: '010-2535-4985', favorite: false, },
    { id: 4, name: '김태진', company: '에어비앤비', division: 'UX디자인팀', position: '책임', email: 'se7890@naver.com', mobile: '010-2355-2455', favorite: true, },
  ];
  render();
};

window.onload = getCardList;
