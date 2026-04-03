
// Элементы токенов
const idInstanceInput = document.getElementById('idInstance');
const apiTokenInput = document.getElementById('apiTokenInstance');
const apiResponse = document.getElementById('apiResponse');

// Элементы для отправки текста
const phoneNumberText = document.getElementById('phoneNumberText');
const messageText = document.getElementById('messageText');

// Элементы для отправки файла
const phoneNumberFile = document.getElementById('phoneNumberFile');
const fileUrl = document.getElementById('fileUrl');


const apiUrl = (method) =>
  `https://4100.api.green-api.com/waInstance${idInstanceInput.value}/${method}/${apiTokenInput.value}`;


async function callApi(method, data = {}, useGet = false) {
  try {
    let options = {};
    if (useGet) {
      options.method = 'GET';
    } else {
      options.method = 'POST';
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(data);
    }
    const response = await fetch(apiUrl(method), options);
    const result = await response.json();
    apiResponse.value = JSON.stringify(result, null, 2);
  } catch (error) {
    apiResponse.value = `Ошибка: ${error}`;
  }
}


// Кнопки получения настроек
document.getElementById('getSettings').addEventListener('click', () => {
  callApi('getSettings', {}, true);
});
document.getElementById('getStatusInstance').addEventListener('click', () => {
  callApi('getStateInstance', {}, true);
});

// Кнопка отправки сообщения
document.getElementById('sendMessage').addEventListener('click', () => {
  const chatId = phoneNumberText.value.trim();
  const message = messageText.value;
  if (!chatId) {
    apiResponse.value = 'Ошибка: chatId обязателен!';
    return;
  }
  callApi('sendMessage', { chatId, message });
});

// Кнопка отправки файла по URL
document.getElementById('sendFileByUrl').addEventListener('click', () => {
  const chatId = phoneNumberFile.value.trim();
  const urlFileVal = fileUrl.value.trim();
  const fileName = urlFileVal.split('/').pop() || '';
  if (!chatId) {
    apiResponse.value = 'Ошибка: chatId обязателен!';
    return;
  }
  if (!urlFileVal || !fileName) {
    apiResponse.value = 'Ошибка: urlFile и fileName обязательны!';
    return;
  }
  const payload = { chatId, urlFile: urlFileVal, fileName };
  callApi('sendFileByUrl', payload);
});