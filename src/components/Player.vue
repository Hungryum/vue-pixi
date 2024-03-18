<script lang="ts" setup>
import { computed, ref, useModel } from 'vue';
import { useMagicKeys, onKeyDown } from '@vueuse/core'
import { onTick } from 'vue3-pixi'
import forward from '../assets/sprites/plane/plane-forward.png'
import left from '../assets/sprites/plane/plane-left.png'
import right from '../assets/sprites/plane/plane-right.png'
import up from '../assets/sprites/plane/plane-up.png'
import down from '../assets/sprites/plane/plane-down.png'
import upLeft from '../assets/sprites/plane/plane-up-left.png'
import upRight from '../assets/sprites/plane/plane-up-right.png'
import downLeft from '../assets/sprites/plane/plane-down-left.png'
import downRight from '../assets/sprites/plane/plane-down-right.png'
import { SCALE_MODES, Texture } from 'pixi.js';

const showSprite = defineModel<boolean>('showSprite')
const posX = defineModel<number>('playerPosX', {required: true})
const posY = defineModel<number>('playerPosY', {required: true})

const velocityX = ref(0)
const velocityY = ref(0)
const airFriction = 0.05;

const resolves = {
  forward: Texture.from(forward, { scaleMode: SCALE_MODES.NEAREST }),
  left: Texture.from(left, { scaleMode: SCALE_MODES.NEAREST }),
  right: Texture.from(right, { scaleMode: SCALE_MODES.NEAREST }),
  up: Texture.from(up, { scaleMode: SCALE_MODES.NEAREST }),
  down: Texture.from(down, { scaleMode: SCALE_MODES.NEAREST }),
  upLeft: Texture.from(upLeft, { scaleMode: SCALE_MODES.NEAREST }),
  upRight: Texture.from(upRight, { scaleMode: SCALE_MODES.NEAREST }),
  downLeft: Texture.from(downLeft, { scaleMode: SCALE_MODES.NEAREST }),
  downRight: Texture.from(downRight, { scaleMode: SCALE_MODES.NEAREST }),
}

const {
  arrowright,
  arrowleft,
  arrowup,
  arrowdown,
} = useMagicKeys()

onKeyDown(' ', () => {
  console.log('space')
})

onTick(() => {
  if (arrowright.value) {
    if(velocityX.value < 2) {
      velocityX.value += 0.1
    }
  }
  if (arrowleft.value) {
    if(velocityX.value > -2) {
      velocityX.value -= 0.1
    }
  }
  if (arrowup.value) {
    if(velocityY.value < 2) {
      velocityY.value += 0.1
    }
  }
  if (arrowdown.value) {
    if(velocityY.value > -2) {
      velocityY.value -= 0.1
    }
  }

  posX.value += velocityX.value;
  posY.value -= velocityY.value;
  velocityX.value *= (1 - airFriction);
  velocityY.value *= (1 - airFriction);
})

const texture = computed(() => {
  if(velocityX.value > 1) {
    if(velocityY.value > 1) {
      return resolves.upRight
    }
    if(velocityY.value < -1) {
      return resolves.downRight
    }
    return resolves.right
  }

  if(velocityX.value < -1)
  {
    if(velocityY.value > 1) {
      return resolves.upLeft
    }
    if(velocityY.value < -1) {
      return resolves.downLeft
    }
    return resolves.left
  }

  if(velocityY.value > 1) {
    return resolves.up
  }

  if(velocityY.value < -1) {
    return resolves.down
  }

  return resolves.forward
})
</script>

<template>
    <sprite v-if="showSprite" :x="posX" :y="posY" :anchor="0.5" :texture="texture" :scale="1" />
</template>