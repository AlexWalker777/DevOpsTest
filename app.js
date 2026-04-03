const idInstanceInput = document.getElementById('idInstance');
const apiTokenInput = document.getElementById('apiToken');
const apiResponse = document.getElementById('apiResponse');


const apiUrl = (method) =>
  `https://4100.api.green-api.com/waInstance${idInstanceInput.value}/${method}/${apiTokenInput.value}`;


async function callApi(method, data = {}) {
  try {
    let options = {};
    // Для getSettings и getStateInstance используем GET, для остальных POST
    if (method === 'getSettings' || method === 'getStateInstance') {
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

// Кнопки
document.getElementById('getSettingsBtn').addEventListener('click', () => callApi('getSettings'));
document.getElementById('getStateBtn').addEventListener('click', () => callApi('getStateInstance'));
document.getElementById('sendMessageBtn').addEventListener('click', () => {
  const chatId = prompt('Введите chatId (числовой ID пользователя или группы в Telegram)');
  const message = prompt('Введите сообщение');
  if (!chatId || isNaN(chatId)) {
    apiResponse.value = 'Ошибка: chatId должен быть числом для Telegram-инстанса!';
    return;
  }
  callApi('sendMessage', { chatId, message });
});

document.getElementById('sendFileBtn').addEventListener('click', () => {
  const chatId = prompt('Введите chatId (числовой ID пользователя или группы в Telegram)');
  const urlFile = prompt('Введите ссылку на файл (urlFile)');
  const fileName = prompt('Введите имя файла (например, photo.jpg)');
  const caption = prompt('Введите подпись к файлу (необязательно)');
  if (!chatId || isNaN(chatId)) {
    apiResponse.value = 'Ошибка: chatId должен быть числом для Telegram-инстанса!';
    return;
  }
  if (!urlFile || !fileName) {
    apiResponse.value = 'Ошибка: urlFile и fileName обязательны!';
    return;
  }
  const payload = { chatId, urlFile, fileName };
  if (caption) payload.caption = caption;
  callApi('sendFileByUrl', payload);
});