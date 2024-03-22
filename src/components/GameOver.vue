<script lang="ts" setup>
import Button from './Button.vue'
import { PixiTransition } from 'vue3-pixi'

const emit = defineEmits<{
  onRestartGame: []
}>()

function restartGame() {
    emit('onRestartGame')
}
</script>

<template>
    <Text :anchor="0.5" :x="330" :y="200" :style="{ align: 'left', fill: 'white', fontSize: 60 }">
        GAME OVER
    </Text>
    <Button @onRestartGame="restartGame"></Button>
</template>