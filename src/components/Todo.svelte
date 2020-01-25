<style>
	
	.todo-container {
		color: rgb(44, 43, 43);
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		font-size: 12px;
	}

	.todo-header {
		background-color: #fff;
		display: flex;
		min-height: 50px;
		padding: 1rem;
		box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
	}

	.todo-header button{
		border: none;
		background-color:#fa7c39;
		color: #fff;
		box-sizing: border-box;
		cursor: pointer;
	}

	.todo-header button:hover{
		background-color:#fa7c39;
	}

	.todo-header input{
		border-radius: 5px;
		margin-left: 5px;
	}

	.todo-header input:invalid {
		border: 1px solid red;
	}

	.todo-header input:focus {
		border: none;
	}

	.todo-body {
		display: flex;
	}

</style>

<script>
	import DataStore from '../services/data-store.js';
	import Card from './Card.svelte';
	import Column from './Column.svelte';
	
	let appData = [];
	let newColumn;

	DataStore.subscribe((data) =>	{
		console.log('Todo:subscribe', data);
		appData = data
	}); // subscribe to data

	function addColumn(){
		_saveColumn();
	}

	function handleKeypress(e){
		if (e.keyCode !== 13) {
			return;
		}
		_saveColumn();
	}

	function _saveColumn() {
		if (!newColumn) {
			return;
		}
		DataStore.saveColumn({ title: newColumn });
		newColumn = '';
	}

</script>

<div class="todo-container">
	<div class="todo-header">
		<button role="button" on:click={addColumn}>Add Column</button>
		<input type="text" name="column" placeholder="Enter column title" bind:value={newColumn} on:keydown={handleKeypress} required/>
	</div>
	<div class="todo-body">
		{#each appData as col}
			<Column data={col}/>
		{/each}
	</div>
</div>

