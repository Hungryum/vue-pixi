<script lang="ts" setup>
import { PTransition } from 'vue3-pixi'
</script>

<template>
  <PTransition
    :duration="1000"
    :before-enter="{ alpha: 0 }"
    :enter="{ alpha: 1 }"
    :leave="{ alpha: 0 }"
  >
    <slot></slot>
  </PTransition>
</template>
