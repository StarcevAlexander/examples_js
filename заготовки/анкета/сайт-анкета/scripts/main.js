//открытие поля для другого гражданства
function showInput(value) {
  if (value === "Другое") {
    document.getElementById("inputField").style.display = "block";
  }
  if (value === "РФ") {
    document.getElementById("inputField").style.display = "none";
  }

}

//открытие поля по наличию карты
function checkCard(value) {
  if (value === "Нет") {
    document.getElementById("inputCard").style.display = "none";
  }
  if (value === "Да") {
    document.getElementById("inputCard").style.display = "block";
  }
}


//номер токена
const TOKEN = "6273687344:AAEIIRCKZK7xQEI4ULMN74gR-4zwYQnHvqA"

//номер айдишника чата
const CHAT_ID = "-1001711407669"

//ссылка на чат
const url_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`

let howClick = 0;

//слушатель на форму по её айди
document.getElementById('tg').addEventListener('submit', function (e) {

  //сброс настроек
  // e.preventDefault();
  let message = `<b>Сообщение с сайта: 
      </b> 
     фамилия: ${this.surname.value}
     имя: ${this.name.value}
     отчество: ${this.patronymic.value}
     гражданство: ${this.citizenship.value}
     дата рождения: ${this.birth_date.value}
     гражданство: ${this.citizenship.value}
     если другое: ${this.otherCitizenship.value}
     паспортные данные
     кем выдан: ${this.issued_by.value}
     код подразделения: ${this.division_code.value}
     дата выдачи паспорта: ${this.passport_issue_date.value}
     серия: ${this.passport_series.value}
     номер: ${this.passport_number.value}
     адрес по регистрации: ${this.registration_address.value}
     адрес фактического проживания: ${this.residential_address.value}
     ближайшая остановка общественного транспорта: ${this.nearest_transport_stop.value}
     мобильный телефон: ${this.mobile_phone.value}
     наличие карты: ${this.has_card.value}

     данные карты:
     Получатель: ${this.cardName.value}
     Номер счёта: ${this.cardNumber.value}
     Банк получателя: ${this.personBank.value}
     БИК: ${this.bik.value}
     Корр. счёт: ${this.korrNumber.value}
     ИНН: ${this.innNumber.value}
     КПП: ${this.kppNumber.value}
     ОКПО: ${this.okpoNumber.value}
     ОГРН: ${this.ogrnNumber.value}
     SWIFT-код: ${this.swift_Number.value}
     Почтовый адрес банка: ${this.bankAdress.value}`

  axios.post(url_api, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message
  })
  howClick++;
  //если пользователь отправил форму больше 3 раз, преезагрузим страницу
  if (howClick === 3) {
    location.reload()
  }
})


// Получаем ссылки на элементы
const popupBtn = document.getElementById('popup-btn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementsByClassName('close')[0];
const popupCloseBtn = document.getElementById('popup-close-btn');

// Обработчик события "клик" на кнопке открытия попапа
popupBtn.addEventListener('click', function () {
  popup.style.display = 'flex';
});

// Обработчик события "клик" на крестике
closeBtn.addEventListener('click', function () {
  popup.style.display = 'none';
});

// Обработчик события "клик" на кнопке "Ок"
popupCloseBtn.addEventListener('click', function () {
  popup.style.display = 'none';
});