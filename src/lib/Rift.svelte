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

	function mouseInput(event: MouseEvent) {
		event.preventDefault();
		if (event.buttons === 0) return;

		const { clientX, clientY } = event;
		setCharacterPosition(clientX, clientY);
	}

	function touchInput(event: TouchEvent) {
		const touches = event.changedTouches;
		const { x, y } = new Array(...touches).reduce(
			({ x, y }, { clientX, clientY }) => {
				return { x: x + clientX, y: y + clientY };
			},
			{ x: 0, y: 0 }
		);
		setCharacterPosition(x / touches.length, y / touches.length);
	}

	function setCharacterPosition(x: number, y: number) {
		const character = document.getElementById('character');
		if (character === null) return;

		character.style.top = `${y}px`;
		character.style.left = `${x}px`;
	}

	function nodefaults(event: Event) {
		event.preventDefault();
	}

	onMount(() => {
		window.onmousedown = mouseInput;
		window.ontouchstart = touchInput;
		window.ontouchend = touchInput;

		window.onmousemove = throttled(100, mouseInput);
		window.ontouchmove = throttled(100, touchInput);

		window.oncontextmenu = nodefaults;
		window.ondragstart = nodefaults;
		window.onresize = nodefaults;
	});
</script>

<div class="rift">
	<div class="greeting">Why Hello There!</div>
	<div id="character">
		<Io />
	</div>
</div>

<style>
	:global(html),
	:global(body) {
		overscroll-behavior: none;
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
	}

	.greeting {
		position: absolute;
		top: 20%;
		left: 50%;
		font-size: 5rem;
		color: #fff;
		text-shadow: 2rem 2rem 2rem #000;
		transform: translate(-50%, -50%);
		z-index: 100;
		text-align: center;
	}
	.rift {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #4c5;
		background-image: url('/grass.jpeg');
		background-size: cover;
		background-blend-mode: multiply;
		z-index: -100;
		overflow: hidden;
		overscroll-behavior: contain;
	}

	#character {
		position: relative;
		top: 80%;
		left: 50%;
		width: 30rem;
		height: 30rem;
		max-width: 50%;

		transition: cubic-bezier(0.39, 0.575, 0.565, 1) 1s;
		transform: translate(-50%, -50%);
	}
</style>
