<script lang="ts">
	import { onMount } from 'svelte';
	import Io from './Io.svelte';

	function throttled(delayMs: number, fn: Function) {
		let lastCall = 0;
		return function (...args: any[]) {
			const now = new Date().getTime();
			if (now - lastCall < delayMs) {
				return;
			}
			lastCall = now;
			return fn(...args);
		};
	}

	function setCharacterPosition(event: MouseEvent) {
		event.preventDefault();
		const character = document.getElementById('character');
		if (character === null) return;
		if (event.buttons === 0) return;

		const { clientX, clientY } = event;
		character.style.top = `${clientY}px`;
		character.style.left = `${clientX}px`;
	}

	function nodefaults(event: MouseEvent) {
		event.preventDefault();
	}

	onMount(() => {
		window.onmousedown = setCharacterPosition;
		window.onmousemove = throttled(100, setCharacterPosition);
		window.oncontextmenu = nodefaults;
	});
</script>

<div class="rift">
	<div id="character">
		<Io />
	</div>
</div>

<style>
	.rift {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #495;
	}

	#character {
		position: relative;
		top: 50%;
		left: 50%;
		width: 30rem;
		height: 30rem;
		transition: cubic-bezier(0.39, 0.575, 0.565, 1) 1s;
		transform: translate(-50%, -50%);
	}
</style>