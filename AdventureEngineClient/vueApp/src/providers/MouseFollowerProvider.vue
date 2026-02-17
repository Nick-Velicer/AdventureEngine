<script setup lang="ts">
//This is pulled from Kevin Powell's tilt tutorial https://www.youtube.com/watch?v=Z-3tPXf9a7M&t=11s 
//and lets us specify any rotation target within the app page to follow the mouse. Doing this in the
//setup of anything within the layout/subpage will not allow for mouse events to be captured within
//the full view window.

function rotateElement(event) {

	let element = document.getElementById("rotationTarget");

	const x = event.clientX;
	const y = event.clientY;
	const middleX = window.innerWidth / 2;
	const middleY = window.innerHeight / 2;
	const offsetX = ((x - middleX) / middleX) * 45;
	const offsetY = ((y - middleY) / middleY) * 45;

	element.style.setProperty("--rotateX", offsetX + "deg");
	element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}

function resetRotation() {

	let element = document.getElementById("rotationTarget");

	element.style.setProperty("--rotateX", "0deg");
	element.style.setProperty("--rotateY", "0deg");
}

</script>

<template>
    <div class="rotationProviderWrapper" v-on:mousemove="rotateElement" v-on:mouseleave="resetRotation">  
        <slot></slot>
    </div>
</template>

<style lang="css" scoped>
    .rotationProviderWrapper {
        height: 100%;
        width: 100%;
    }
</style>