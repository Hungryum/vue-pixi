<script lang="ts" setup>
import { computed, ref, useModel } from 'vue';
import cloud1 from '../assets/sprites/clouds/cloud1.png'
import cloud2 from '../assets/sprites/clouds/cloud2.png'
import cloud3 from '../assets/sprites/clouds/cloud3.png'
import cloud4 from '../assets/sprites/clouds/cloud4.png'
import cloud5 from '../assets/sprites/clouds/cloud5.png'
import cloud6 from '../assets/sprites/clouds/cloud5.png'
import { onTick } from 'vue3-pixi'

const props = defineProps<{
  x: number
  y: number
}>()

const posX = useModel(props, 'x')
const posY = useModel(props, 'y')
const playerPosX = defineModel<number>('playerPosX', {required: true})
const playerPosY = defineModel<number>('playerPosY', {required: true})
const scale = ref(0.5)
const anchor: [number, number] = posX.value < playerPosX.value ? [1, 0] : [0, 0]
const clouds = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6]

const texture = computed(() => {
  var variant =  Math.round(Math.random() * clouds.length - 1)
  return clouds[variant]
})

const alpha = computed(() => {
  if(scale.value < 1.5) { 
    return scale.value - 0.5
  }

  return 3.5 - scale.value
})

onTick((delta) => {
  scale.value += (scale.value / 500) * delta;
})

function positionRelativeToPlayer(playerAxis: number, cloudAxis: number) {
    return (cloudAxis - playerAxis) / (4 - scale.value);
}
</script>

<template>
  <container :x="positionRelativeToPlayer(playerPosX, posX)" :y="positionRelativeToPlayer(playerPosY, posY)">
    <sprite :x="posX" :y="posY" :anchor="anchor" :texture="texture" :scale="scale" :alpha="alpha" />
  </container>
</template>