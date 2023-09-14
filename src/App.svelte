<script lang="ts">
	import Hexagon from './lib/hexagon.svelte';
	import Option from './lib/option.svelte';
	import { createOptionsStore } from './lib/options';
	import { Pixels } from './lib/pixels';

	const { getOption, setOption } = createOptionsStore();

	let pixels: Pixels
	const path = window.location.pathname.replaceAll("/", "")
	if (path != "") {
		pixels = new Pixels(JSON.parse(atob(path)))
	} else {
		pixels = new Pixels()
	}

	const s = pixels.score
	$: score = $s

	let tooltip: HTMLSpanElement
	function share() {
		const b64 = pixels.tob64()
		console.log("https://centerstage-planner.vercel.app/" + b64)

		navigator.clipboard.writeText("https://centerstage-planner.vercel.app/" + b64);
	}
</script>

<main>
	<div style="style: flex; height: 60vh; position: relative">
		{#each Array(11) as _, row}
			<div class="line">
				{#each Array(6 + (row) % 2) as _, column}
					<Hexagon pixels={pixels} row={10-row} column={column}></Hexagon>
				{/each}

				{#if $getOption("setlines") && (row - 1) % 3 == 0 && row != 10}
					<div class="setline" style="top: {row}"></div>
				{/if}
			</div>
		{/each}
		<div style="margin-top: 5%"></div>
		<h2 style="color: rgb(255, 100, 0)">{score != 0 ? score : 10464}</h2>
		<div>
			<Option getOption={getOption} setOption={setOption} name="setlines" richName="set lines"></Option>
			<button on:click={share}>copy board</button>
			<!-- <Option getOption={getOption} setOption={setOption} name="footer" richName="hide footer"></Option> -->
		</div>
	</div>
</main>

<style>
	.line {
		/* height: max(7vh, 7vw); */
		/* width: max(80vw, 80vh); */
		padding: 0%
	}

	button {
		background-color: rgb(57, 57, 57);
		outline: none;
		width: 8em;
		height: 2.5em;
		border: 2px solid #dd5b4f;
		border-radius: 10px;
		cursor: pointer;
		transition: .2s;
		font-family: 'Josefin Sans', sans-serif;

	}
	button:hover {
		background-color: rgb(47, 47, 47);
	}
	button:focus {
		border: 2px solid #50dd5f;
	}

	.setline {
		background-color: rgb(125, 125, 125); 
		height: 1.25vh; 
		width: 100%; 
		position: absolute; 
		border-radius: 30px;
		z-index: -1;
	}
</style>