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
	<form class="flex flex-col gap-3 items-start">
		<div class="flex gap-3 items-end">
			<div class=" flex flex-col">
				<div class="tracking-[.25em] text-gray-400 text-sm">
					GENERATOR
				</div>

				<select bind:value={current_generator} class="
				rounded px-3
				after:bg-blue-500
				after:content-['•']
				bg-gray-500 text-gray-200
				py-4
				border border-2 border-gray-700
				">
					{#each Object.keys(generators) as gen}
						<optgroup label={gen}>
							{#each Object.keys(generators[gen]) as pss}
								<option>{pss}</option>
							{/each}
						</optgroup>
					{/each}

				</select>
			</div>

			<button 
				class="bg-blue-500 hover:bg-blue-700 text-white py-4 px-12 
				bg-gradient-to-r from-indigo-500 to-blue-500
				hover:bg-gradient-to-l
				duration-300
				rounded" 
				type="submit" 
				on:click={handleGenerate}
				>Generate</button>
			<div class=" flex flex-col">
				<div class="tracking-[.25em] text-gray-400 text-sm">
					RESULT
				</div>

				<div class="font-mono border border-2 
						border-gray-700
						focus:outline-none
						focus:shadow-outline
						rounded  text-gray-500 leading-tight 
						font-mono shadow appearance-none 
						mb-0
						px-3
						bg-gray-500
						rounded grid">
					<input 
						class=" 
						appearance-none outline-none focus:outline-none
						bg-transparent
						text-white
						h-8
						py-7
						focus:shadow-outline" 
						type="text" 
						placeholder="result"
						bind:value={value}
					/>
				</div>
			</div>
		</div>

		<div class="flex gap-3 pt-12 items-end">
			<div class=" flex flex-col">
				<div class="tracking-[.25em] text-gray-400 text-sm">
					AMOUNT
				</div>
				<div class="font-mono border border-2 
					border-gray-700
					focus:outline-none
					focus:shadow-outline
					rounded  text-gray-500 leading-tight 
					font-mono shadow appearance-none 
					mb-0
					px-3 py-2
					bg-gray-500
					rounded grid">
					<input type="number" name="" class="appearance-none outline-none focus:outline-none
					bg-transparent
					text-white
					h-8
					focus:shadow-outline" bind:value={amount}>
				</div>
			</div>
			<button 
				class="bg-green-500 
				bg-gradient-to-r from-indigo-500 to-blue-500
				hover:bg-gradient-to-l
				py-3
				hover:bg-green-700 text-white px-4 rounded w-64" 
				type="submit" 
				on:click={bulkCreate}
				>Generate Bulk ({amount})</button>
		</div>
	</form>
	<div class="grid p-3 bg-gray-300 rounded mt-6 lg:grid-cols-4 py-4 font-mono gap-10">

		{#each generated_list as word} 
			<div class="overflow-wrap break-words">{word}</div>
		{/each}
	</div>
</div>



