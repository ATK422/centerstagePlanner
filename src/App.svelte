<script lang="ts">
	import Hexagon from './lib/hexagon.svelte';
	import Option from './lib/option.svelte';
	import { createOptionsStore } from './lib/options';

	const { getOption, setOption } = createOptionsStore();
</script>

<main>
	<div style="style: flex; height: 60vh; position: relative">
		{#each Array(11) as _, row}
			<div class="line">
				{#each Array(6 + (row + 1) % 2) as _, column}
					<Hexagon></Hexagon>
				{/each}

				{#if $getOption("setlines") && (row - 1) % 3 == 0 && row != 10}
					<div class="setline" style="top: {row}"></div>
				{/if}
			</div>
		{/each}
		<div style="margin-top: 5%"></div>
		{#if !$getOption("footer")}
			<h2 style="color: rgb(255, 100, 0)">10464</h2>
		{/if}
		<div>
			<Option getOption={getOption} setOption={setOption} name="setlines" richName="set lines"></Option>
			<Option getOption={getOption} setOption={setOption} name="footer" richName="hide footer"></Option>
		</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

	button {
		font-family: 'Josefin Sans', sans-serif;
	}

	.line {
		/* height: max(7vh, 7vw); */
		/* width: max(80vw, 80vh); */
		padding: 0%
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