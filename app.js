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



// ...обработчики кнопок теперь добавлены ниже по новой разметке...