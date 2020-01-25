<style>
  .card {
		width: 250px;
    background-color: #faf8f6;
    margin: 5px 0;
    box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);

    display: flex;
    flex-direction: column;
	}

  /* TODO - put on global */
  .card-title,
  .card-description,
  .card-form {
    padding: 10px;
    word-wrap: break-word;
  }

  .card-title {
    background-color:#e65100;
    color: #fff;
  }
  
  .card-description {
    cursor: pointer;
  }

  .card textarea {
    width: 230px;
    height: 180px;
  }

  .card input {
    width: 230px;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }

</style>


<script>
  // components
  import Button from './Button.svelte';
  import { onDestroy } from 'svelte';
  // services
  import DataStore from '../services/data-store.js';
  // props
  export let data = {};
  export let editMode = false;
  export let newCard = false;

  let newData = { title: '', description: '' };
  let showDesc = false;


  onDestroy(() => console.log('Card: onDestroy', data));

  // for new card
  if (newCard) {
    editClick();
  } 

  function showDescription() {
    showDesc = !showDesc;
  }

  function editClick() {
    editMode = !editMode;
    newData = Object.assign({}, data);
  }

  function deleteClick() {
    DataStore.deleteCard(data);
  }

  function saveClick() {
    editMode = !editMode;
    DataStore.updateCard(newData);
    clear();
  }

  function cancelClick() {
    editMode = !editMode;
    clear();
  }

  function clear(){
    newData = {
      title: '',
      description: '' 
    }
  }

</script>



<div class="card">
  {#if !editMode }
    <div class="card-title">
      {data.title}
    </div>
    {#if showDesc}
      <div class="card-description" on:click={showDescription}>
        {data.description}
      </div>
    {:else}
    <div class="card-description" on:click={showDescription}>see description</div>
    {/if}
    <div class="card-actions">
      <Button label='Edit' onclick={editClick}/>
      <Button label='Delete' onclick={deleteClick}/>
    </div>
  {:else}
    <div class="card-form">
      <input type="text" name="title" bind:value={newData.title}/>
      <textarea name="description" bind:value={newData.description}></textarea>
    </div>

    <div class="card-actions">
      <Button label='Save' onclick={saveClick}/>
      <Button label='Cancel' onclick={cancelClick}/>
    </div>
  {/if}

</div>