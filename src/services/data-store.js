
import { writable } from 'svelte/store';
import * as DataService from './data-service.js';

class DataStore {
  constructor() {
    this.store = writable({});
    this.subscribe = this.store.subscribe;
    this.initData();
  }
  
  // update the client store
  initData() {
    DataService.getData().then(data => {
      this.store.set(data);
    });
  }

  getColumns() {
    return DataService.getColumns();
  }

  saveColumn(col) {
    return DataService.saveColumn(col)
      .then(_ => {
        this.initData();
      })
			.catch(err => {
        // TODO: handle error
        return this.store;
      });
  }

  updateColumn(col, id) {
    DataService.updateColumn(col, id)
      .then(_ => {
        this.initData();
      })
      .catch((err) => {
        // TODO
      });
  }

  deleteColumn(colId) {
    DataService.deleteColumn(colId)
      .then(_ => {
        this.initData();
      })
      .catch(err => { 
        // TODO: handle error
        console.log(err) 
      });
  }

  getCards() {
    return DataService.getCards();
  }

  saveCard(card) {
    const { columnId, title, description } = card;
    const newcard = { 
      columnId,
      title,
      description
    };
    DataService.saveCard(newcard)
      .then(data => {
        this.initData();
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateCard(card) {
    DataService.updateCard(card, card.id)
      .then(data => {  
        this.initData();
      })
      .catch(err => {
        // TODO
      });
  }

  deleteCard(card) {
    DataService.deleteCard(card, card.id)
      .then(data => {  
        this.initData();
      })
      .catch(err => {
        // TODO
      });
  }
}

// export as singleton
export default new DataStore();