<script lang="ts" setup>
import { computed, ref, useModel } from 'vue';
import fuelSprite from '../assets/sprites/fuel.png'
import { onTick } from 'vue3-pixi'
import { SCALE_MODES, Texture } from 'pixi.js';
import { whenever } from '@vueuse/core';

const props = defineProps<{
  x: number
  y: number
}>()

const posX = useModel(props, 'x')
const posY = useModel(props, 'y')
const playerPosX = defineModel<number>('playerPosX', {required: true})
const playerPosY = defineModel<number>('playerPosY', {required: true})
const scale = ref(0.1)
const anchor: [number, number] = posX.value < playerPosX.value ? [1, 0] : [0, 0]
const texture = Texture.from(fuelSprite, { scaleMode: SCALE_MODES.NEAREST })

const emit = defineEmits<{
  onFuelPickup: [amount: number]
}>()

const alpha = computed(() => {
  return 2.5 - scale.value
})

const zIndex = computed(() => {
  return scale.value > 1.5 ? 1 : 0
})

onTick((delta) => {
  scale.value += (scale.value / 100) * delta;
})

whenever(
  () => scale.value > 1.4 && scale.value < 1.5,
  () => {
    if(playerPosX.value > positionRelativeToPlayer(playerPosX.value, posX.value) + 60 || playerPosX.value < positionRelativeToPlayer(playerPosX.value, posX.value) - 60) {
      return;
    }

    if(playerPosY.value > positionRelativeToPlayer(playerPosY.value, posY.value) + 80 || playerPosY.value < positionRelativeToPlayer(playerPosY.value, posY.value) - 20) {
      return;
    }
    
    emit('onFuelPickup', 20)
    scale.value = 2.5
  },
)

function positionRelativeToPlayer(playerAxis: number, fuelAxis: number) {
    return fuelAxis + (fuelAxis - playerAxis) * (scale.value);
}
</script>

<template>
    <sprite :x="positionRelativeToPlayer(playerPosX, posX)" :y="positionRelativeToPlayer(playerPosY, posY)" :anchor="anchor" :texture="texture" :scale="scale" :alpha="alpha" :z-index="zIndex"/>
</template>