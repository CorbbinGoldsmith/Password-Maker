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
	if (amount > 3000) {
		message = "Amount too large!"
		setTimeout(() => {message = ""}, 2000)
		amount = 3000
	}
	generated_list = [];
	for (var i = 0; i < amount; i++) {
		generated_list.push(makeGetPattern(patterns[current_generator])())
	}

	generated_list = generated_list;
}

$: keysDown = {}

function handleKeydown () {
	if (("ShiftLeft" in keysDown) || ("ShiftRight" in keysDown)) {
		if (event.code == "ArrowUp") {
			event.preventDefault();
			amount += 10;
		}
		if (event.code == "ArrowDown") {
			event.preventDefault();
			amount -= 10;
		}
	}
	keysDown[event.code] = true;
	keysDown = keysDown;
}

function handleKeyup () {
	delete keysDown[event.code];
	keysDown = keysDown;
}

</script>

<div class="block">
	{#if message}
		<div class="bg-red-500 p-3 mb-8">{message}</div>
	{/if}
	<h1 class="text-4xl pb-12 text-white">Password Generator</h1>
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
				bg-gray-700 text-gray-200
				py-4
				border border-1 border-black border-gray-700
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
				border border-1 border-transparent
				rounded" 
				type="submit" 
				on:click={handleGenerate}
				>Generate</button>
			<div class=" flex flex-col">
				<div class="tracking-[.25em] text-gray-400 text-sm">
					RESULT
				</div>

				<div class="font-mono border border-1
						border-black
						bg-gray-700
						focus:outline-none
						focus:shadow-outline
						rounded  text-gray-500 leading-tight 
						font-mono shadow appearance-none 
						mb-0
						px-3
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
				<div class="font-mono border border-1
					border-black
					bg-gray-700
					focus:outline-none
					focus:shadow-outline
					rounded leading-tight 
					font-mono shadow appearance-none 
					mb-0
					px-3 py-2
					rounded grid">
					<input type="number" name="" class="appearance-none outline-none focus:outline-none
					bg-transparent
					text-white
					h-8
					w-16
					focus:shadow-outline" 
					on:keydown={handleKeydown}
					on:keyup={handleKeyup}
					bind:value={amount}>
				</div>
			</div>
			<button 
				class="bg-green-500 
				bg-gradient-to-r from-indigo-500 to-blue-500
				hover:bg-gradient-to-l
				py-3
				border border-1 border-transparent
				hover:bg-green-700 text-white px-4 rounded w-64" 
				type="submit" 
				on:click={bulkCreate}
				
				>Generate Bulk ({amount})</button>
		</div>
	</form>
	<div class=" mt-6">

		<div class="tracking-[.25em] text-gray-400 text-sm">
				BATCH RESULTS
			</div>
		<div class="grid p-3 bg-gray-300 rounded grid-cols-4 py-4 font-mono gap-10">
			{#each generated_list as word} 
				<div class="overflow-wrap break-words">{word}</div>
			{/each}
		</div>
	</div>
</div>



