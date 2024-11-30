<script lang="ts">
	import axios from 'axios';

	let { news } = $props();
	let content = $state(news['title'] + ' ' + news['description']);
	let currentColor = $state('#000000');

	async function makeNewsFunny() {
		let response = await axios.post('http://localhost:3000/news/funny', { news: news });
		content = response.data;
		currentColor = '#FF0000';
		// console.log(content);
	}
</script>

<div class="flex py-1">
	<div
		class="flex w-full items-center justify-between rounded-xl border p-4 shadow-md hover:shadow-lg"
	>
		<div class="w-4/5">
			<span style="color: {currentColor}">
				{content}
			</span>
		</div>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex h-10 cursor-pointer items-center justify-center rounded-xl border px-3 py-1 text-center hover:bg-black hover:text-white"
			onclick={() => makeNewsFunny()}
		>
			<span> MAKE IT FUNNY! </span>
		</div>
	</div>
</div>
