<script>

import {browser} from "$app/environment";

import {generators,patterns,patterns_AI,makeGetPattern} from "./model.js";

export let value = "";
export let message = "";
export let current_generator = "Severe Security";

function handleGenerate() {
	value = makeGetPattern(patterns[current_generator])()
}

$: generated_list = [];

$: amount = 30;

function bulkCreate() {
	generated_list = [];
	for (var i = 0; i < amount; i++) {
		generated_list.push(makeGetPattern(patterns[current_generator])())
	}

	generated_list = generated_list;
}

</script>

<div>
	<div>{message}</div>
	<h1></h1>
	<form class="flex flex-col gap-3">
		<div>
			<select bind:value={current_generator} class="p-2">
				{#each Object.keys(generators) as gen}
					<optgroup label={gen}>
						{#each Object.keys(generators[gen]) as pss}
							<option>{pss}</option>
						{/each}
					</optgroup>
				{/each}
			</select>

			<input 
				class="font-mono shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" 
				type="text" 
				placeholder="result"
				bind:value={value}
			/>
		</div>
		<button 
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64" 
			type="submit" 
			on:click={handleGenerate}
			>Generate</button>

		<div class="">
			<button 
				class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-64" 
				type="submit" 
				on:click={bulkCreate}
				>Generate Bulk ({amount})</button>
			<input type="number" name="" class="p-2" bind:value={amount}>
		</div>
	</form>
	<div class="grid grid-cols-4 py-4 font-mono gap-10">

		{#each generated_list as word} 
			<div class="overflow-wrap break-words">{word}</div>
		{/each}
	</div>
</div>



