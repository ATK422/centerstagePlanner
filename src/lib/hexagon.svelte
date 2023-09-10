<script lang="ts">
	let state: number = 0
	let color = "#505050"
	const update = () => {
		if (state == 4) {
			state = 0
		} else {
			state += 1
		}

		if (state == 0) {
			color = "#505050"
		} else if (state == 1) {
			color = "#d8d8d8"
		} else if (state == 2) {
			color = "#dda91b"
		} else if (state == 3) {
			color = "#22b01d"
		} else if (state == 4) {
			color = "#b684c2"
		}
	}
</script>

<style>
	button {
		display: inline-block;
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		user-select: none;
		height: 3.5em;
		width: 3.9em;
		font-size: min(2vh, 2vw);
		rotate: 90deg;
		
		touch-action: manipulation;

		outline: none;
		border: none;

		margin-left: .5em;

		--btn-raise: 1.3em;
		clip-path: polygon(var(--btn-raise) 0%, calc(100% - var(--btn-raise)) 0%, 100% 50%, calc(100% - var(--btn-raise)) 100%, var(--btn-raise) 100%, 0 50%);
		background-color: #dda91b;
		text-transform: uppercase;
	}
</style>

<button on:click={update} style="background-color: {color}">
	
</button>
