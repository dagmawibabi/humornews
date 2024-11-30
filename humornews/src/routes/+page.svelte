<script lang="ts">
	import axios from 'axios';
	import EachNews from '../components/each_news.svelte';

	// Get Headlines
	let articles: any = [];
	async function getHumorNews() {
		let response = await axios.get('http://localhost:3000/news/normal');
		articles = response.data;
		// console.log(articles);
	}

	getHumorNews();
</script>

<div class="mx-auto w-1/2 pb-36 pt-5">
	<!-- Title -->
	<div class="flex justify-center pb-5">
		<span class="text-4xl font-bold"> HumorNews </span>
	</div>

	<!-- Headlines -->
	{#each articles as eachArticle}
		<EachNews news={eachArticle} />
	{/each}
</div>
