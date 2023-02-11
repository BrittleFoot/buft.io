<!-- svelte-ignore a11y-media-has-caption -->
<script>
	let preview = '/wisp.png';
	let animation = '/wisp.webm';
</script>

<video class="hero" poster={preview} preload="auto" autoplay loop playsinline>
	<source type="video/webm" src={animation} />
	<img src={preview} alt="IO" />
</video>

<style>
	video {
		width: 100%;
		height: 100%;
	}
</style>
