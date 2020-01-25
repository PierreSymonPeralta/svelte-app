<style>
  .column {
    background-color: #fff;
    position: relative;
		min-height: 300px;
		min-width: 280px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
	}

	.column-header {
    display: flex;
    justify-content: space-between; 
		font-size: 1.25em;
	}

  .column-header input{
    width: 170px;
  }

  .column-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .column-btn--add {
    width: 90%;
    margin: 5px auto;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }

  .column-btn--add:hover {
    color: #fff;
    background-color:#e65100;
    cursor: pointer;
  }
  
  .card-form {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-form form {
    background-color: rgb(250, 248, 248);
    border-radius: 5px;
    width: 280px;
    
    position: absolute;
    top: 2rem;
    padding: 10px;
    box-sizing: border-box;
  }

  .card-form input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
  }

  .card-form-actions {
    display: flex;
    justify-content: flex-end;
  }

  .card-form::before {
    content: "";
    background-color:  rgba(0, 0, 0, 0.4);
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    position: absolute;
  }

  .card-form--invalid {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  .card-form-message--invalid {
    font-size: 0.8rem;
    color: #e65100;
  }


</style>

<script>
  // svelte
  import { onMount } from 'svelte';

  // components
  import Card from './Card.svelte';
  import Button from './Button.svelte';

  // services
  import DataStore from '../services/data-store.js';
  
  // props
  export let data = {}

  const { id: columnId } = data;
  let cards = [...data.cards];
  let cardForm;
  let newTitle = '';
  let editMode = false;
  let invalidForm = false;
  let isAddingNewCard = false;


  onMount(() => { console.log('Column: onMount', data); });

  function editColumn() {
    editMode = !editMode;
    newTitle = data.title;
  }

  function saveColumn() {
    updateColumn();
  }

  function cancelColumn() {
    editMode = !editMode;
  }

  function deleteColumn() {
    DataStore.deleteColumn(data.id);
  }

  function handleKeypress(e){
		if (e.keyCode !== 13) {
			return;
    }
    updateColumn();
  }
  
  function updateColumn() {
    if (!newTitle) {
      return;
    }
    const newColumn = {
      title: newTitle,
      id: data.id
    }
    DataStore.updateColumn(newColumn, data.id);
    editMode = !editMode;
  }

  function handleAddCard() {
    isAddingNewCard = !isAddingNewCard;
  }

  function handleReset(evt){
    evt.preventDefault();
    isAddingNewCard = !isAddingNewCard;
    invalidForm = false;
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    invalidForm = false; 
    const inputFields = Array.prototype.slice.apply(evt.target.elements, [0, 2]);
    const [title , description ] = inputFields;

    if (!title.value || !description.value) {
      setTimeout(() => invalidForm = true);
      return;
    }

    const nc = {
      title: title.value,
      description: description.value,
      columnId: data.id,
      newCard: true
    };
    DataStore.saveCard(nc);
    isAddingNewCard = !isAddingNewCard;
  }

</script>

<div class="column">
  <div class="column-header">
    {#if editMode}
      <input id="column-name" type="text" bind:value={newTitle} on:keydown={handleKeypress}/>
      <div>
        <Button label="Save" onclick={saveColumn}/>
        <Button label="Cancel" onclick={cancelColumn}/>
      </div>
    {:else}
      <div>{data.title}</div>
      <div>
        <Button label="Edit" onclick={editColumn}/>
        <Button label="Delete" onclick={deleteColumn}/>
      </div>
    {/if}

  </div>
  <div class="column-body">
    <button class="column-btn--add" on:click={handleAddCard}>Add new card</button>
    {#each data.cards as card}
      <Card	data={card} newCard={card.newCard}/>
    {/each}
  </div>

  {#if isAddingNewCard}
   <div class="card-form">

    <form bind:this={cardForm}
          on:submit={handleFormSubmit}
          on:reset={handleReset}
          class:card-form--invalid={invalidForm}
    >
      <label for="title">Title</label>
      <input type="text" name="title" />
      <label for="description">Description</label>
      <input type="text" name="description" />

      {#if invalidForm}
        <span class="card-form-message--invalid">Please fill-up all the fields</span>
      {/if}

      <div class="card-form-actions">
        <Button label="Save" type="submit"/>
        <Button label="Cancel" type="reset"/>
      </div>
    </form>
  </div>
  {/if}
</div>