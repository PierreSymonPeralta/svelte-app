<script>
  export let label = '';
  export let onclick = () => {};
  export let type = '';

</script>

<style>
  button.app-button {
    cursor: pointer;
    background-color:#e65100;
    position: relative;
		text-align: center;
		font-size: 0.6rem;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
    margin-left: 3px;
    color: #fff;
    transition: transform 0.4s cubic-bezier(0, 0, 0.3, 1);

	}

  .app-button:after {
    content: "";
    background: #fff;
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    transform: scale(1);

    opacity: 0;
    transition: all 0.4s cubic-bezier(0, 0, 0.3, 1);
  }

  .app-button:active:after {
    opacity: 1;
    transform: none;
    transition: 0s;
    transform: scale(0);
  }
</style>

<button class="app-button" type={type} on:click={onclick}>{label}</button>