<script lang="ts" setup>
import { computed, ref } from 'vue';
import Player from './Player.vue';
import { PixiTransition, onTick } from 'vue3-pixi'
import Cloud from './Cloud.vue';

const showSprite = ref<boolean>(true)
const playerPosX = ref<number>(300)
const playerPosY = ref<number>(300)
const clouds = ref<{ x: number; y: number; z: number; }[]>([])
var playerPosZ : number = 0
var time : number = 0

function spawnCloud(zPos: number) {
    clouds.value.unshift({ x: Math.random() * 640, y: Math.random() * 480, z: zPos })
}

onTick((delta) => {
    if(time > 5) {
        spawnCloud(playerPosZ + 100)
        time = 0
        console.log(playerPosX.value, playerPosY.value, playerPosZ)
    }
    
    if (clouds.value.length && clouds.value[clouds.value.length - 1].z < playerPosZ) {
        clouds.value.pop()
    }

    playerPosZ += 0.1 * delta;
    time += 0.1 * delta;
})

</script>

<template>
    <container>
        <container>
            <Cloud v-for="cloud in clouds" :key="cloud.x" :x="cloud.x" :y="cloud.y" v-model:playerPosX="playerPosX" v-model:playerPosY="playerPosY"/>
        </container>
        <!-- <Cloud :x="200" :y="256" :playerPosX="playerPosX" :playerPosY="playerPosY" ></Cloud> -->
        <!-- <Text :x="280" :y="200" :style="{ align: 'left' }" @click="showSprite = !showSprite">
        Click Toggle Sprite
        </Text> -->
        <pixi-transition
            :duration="300"
            :before-enter="{ alpha: 0 }"
            :enter="{ alpha: 1 }"
            :leave="{ alpha: 0 }"
        >
            <Player v-model:show-sprite="showSprite" v-model:player-pos-x="playerPosX" v-model:player-pos-y="playerPosY"/>
        </pixi-transition>
    </container>
</template>