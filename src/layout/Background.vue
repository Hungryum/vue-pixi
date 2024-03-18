<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'
import { SCALE_MODES } from 'pixi.js'
import texture from '../assets/sprites/background.jpeg'

const screen = useScreen()
</script>

<template>
  <tiling-sprite
    :width="screen.width"
    :height="screen.height"
    :texture="texture"
    :texture-options="{ scaleMode: SCALE_MODES.NEAREST }"
    :y="-50"
  >
    <blur-filter :strength="1" />
  </tiling-sprite>
</template>

<style lang="scss" scoped></style>