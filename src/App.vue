<script setup lang="ts">
import Main from './layout/Main.vue';
import Game from './components/Game.vue';
import AlphaTransition from './components/AlphaTransition.vue';
import Background from './layout/Background.vue';
import { useScreen } from 'vue3-pixi';

const screen = useScreen()
</script>

<template>
  <Main>
    <Background />
    <!-- game screen switching with alpha transition -->
    <AlphaTransition>
      <Game />
    </AlphaTransition>
  </Main>
</template>