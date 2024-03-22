<script lang="ts" setup>
import { ref } from 'vue';
import { Assets, Texture } from 'pixi.js';

const texture = ref()
const emit = defineEmits<{
  onRestartGame: []
}>()

function restartGame() {
    emit('onRestartGame')
}

function onAssetsLoaded() {
    const frame = "green_button00"
    texture.value = Texture.from(frame)
}

Assets.load("/buttons.json")
.then(onAssetsLoaded)
</script>

<template>
    <container :x="320" :y="300">
        <sprite :anchor="0.5" :texture="texture" :scale="1" :z-index="0" @click="restartGame" />
        <Text :anchor="0.5" :style="{ align: 'center', fill: 'white'}">Replay</Text>
    </container>
</template>