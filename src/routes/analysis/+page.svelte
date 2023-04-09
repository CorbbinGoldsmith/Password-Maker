<script>

import {get__store,data,results,analyze} from "./analysis.js"
import { onMount } from 'svelte';


let _data, _results;

onMount(() => {
	return data.subscribe(value => {
		_data = value;
	})
});

onMount(() => {
	return results.subscribe(value => {
		_results = value;
	})
});

analyze(_data)

</script>
<div>
	<form>
		<textarea class="w-full h-32 p-2" bind:value={_data}></textarea>
	</form>
	<button 
		class="bg-blue-500 hover:bg-blue-700 text-white py-4 px-12 
		bg-gradient-to-r from-indigo-500 to-blue-500
		hover:bg-gradient-to-l
		duration-300
		border border-1 border-transparent
		rounded" 
		on:click={analyze}
		>Generate {_data}</button>
	<div class="font-mono bg-white p-5 overflow-wrap break-words">
		{#if _results}
			{JSON.stringify(_results)}
		{/if}
	</div>
</div>