<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Player from './Player.vue';
import { onTick } from 'vue3-pixi'
import Cloud from './Cloud.vue';
import Fuel from './Fuel.vue';
import FuelBar from './FuelBar.vue'
import GameOver from './GameOver.vue'

const playerPosX = ref<number>(320)
const playerPosY = ref<number>(300)
const playerFuel = ref<number>(200)
const clouds = ref<{ x: number; y: number; z: number; }[]>([])
const fuels = ref<{ x: number; y: number; z: number; }[]>([])
var playerPosZ : number = 0
var time : number = 0

function fuelPickup(amount: number) {
    playerFuel.value = Math.min(playerFuel.value + amount, 200)
}

function restartGame() {
    clouds.value = []
    fuels.value = []
    playerFuel.value = 200
    playerPosX.value = 320
    playerPosY.value = 200
}

function spawnObject(group: { x: number; y: number; z: number; }[], zPos: number) {
    group.unshift({ x: Math.random() * 640, y: Math.random() * 480, z: zPos })
}

function gameOver(): boolean {
    return playerFuel.value <= 0
}

onMounted(() => {
    for(let i = 0; i < 10; i++) {
        spawnObject(clouds.value, time + 100)
    }
})

onTick((delta) => {
    if(gameOver()) {
        return
    }

    time += 0.1 * delta

    if(Math.round(time) == playerPosZ) { 
        return
    }

    if(playerPosZ % 5 == 0) {
        spawnObject(clouds.value, playerPosZ + 200)
    }

    if(playerPosZ % 10 == 0) {
        spawnObject(fuels.value, playerPosZ + 400)
    }
    
    if (clouds.value.length && clouds.value[clouds.value.length - 1].z < playerPosZ) {
        clouds.value.pop()
    }

    if (fuels.value.length && fuels.value[fuels.value.length - 1].z < playerPosZ) {
        fuels.value.pop()
    }    

    playerPosZ = Math.round(time)

    if(playerFuel.value > 0) {
        playerFuel.value -= 1
    }
})

</script>

<template>
    <container :sortableChildren="true">
        <Cloud v-for="cloud in clouds" :key="cloud.x" :x="cloud.x" :y="cloud.y" v-model:playerPosX="playerPosX" v-model:playerPosY="playerPosY"/>
        <Fuel v-for="fuel in fuels" :key="fuel.x" :x="fuel.x" :y="fuel.y" v-model:playerPosX="playerPosX" v-model:playerPosY="playerPosY" @onFuelPickup="fuelPickup"/>
        <Player v-model:player-pos-x="playerPosX" v-model:player-pos-y="playerPosY" :fuel="playerFuel"/>
        <FuelBar :fuel="playerFuel"/>
        <!-- <Text :x="280" :y="200" :style="{ align: 'left' }" @click="showSprite = !showSprite">
        Fuel
        </Text> -->
        <GameOver v-if="gameOver()" @onRestartGame="restartGame"/>
    </container>
</template>