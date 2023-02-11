<!-- svelte-ignore a11y-media-has-caption -->
<script lang="ts">
	let preview = '/wisp.png';
	let animation = '/wisp.webm';
</script>

<video id="hero-anim" class="hero" poster={preview} preload="auto" autoplay loop playsinline muted>
	<source type="video/webm" src={animation} />
	<img src={preview} alt="IO" />
</video>

<style>
	video {
		width: 100%;
		height: 100%;
	}
</style>
