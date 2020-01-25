const DATA_URL = 'http://localhost:3000/'

// get all the data, cards are parsed per columns
export async function getData() {
  const columns = await getColumns();
  const cards = await  getCards();
  const data = [];

  // parse the data
  columns.map(col => {
    data.push({
      id: col.id,
      title: col.title,
      cards: cards.filter(c => c.columnId === col.id)
    });
  })
  return data;
}

// get columns 
export function getColumns() {
  return fetch(`${DATA_URL}columns`).then(response => response.json());
}

// get cards
export function getCards() {
  return fetch(`${DATA_URL}cards`).then(response => response.json());
}

// update column
export function updateColumn(data, columnId) {
  return fetch(`${DATA_URL}columns/${columnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).then(data => data.json())
}

// delete column
export function deleteColumn(columnId) {
  return fetch(`${DATA_URL}columns/${columnId}`, {
    method: 'DELETE'
  }).then(data => data.json())
}

// save column
export function saveColumn(data) {
  const { title } = data;
  const newcol = { title, cards: [] };

  return fetch(`${DATA_URL}columns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newcol) 
  }).then(data => data.json())
}

// update card
export function updateCard(data, cardId) {
  return fetch(`${DATA_URL}cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).then(data => data.json())
}

// save card
export function saveCard(data) {
  return fetch(`${DATA_URL}cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).then(data => data.json())
}

// delete card
export function deleteCard(data, cardId) {
  return fetch(`${DATA_URL}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
  }).then(data => data.json())
}

