<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const url: string = "https://pokeapi.co/api/v2/pokemon/pikachu"
const  { onFetchResponse, onFetchError, data }  = useFetch(url).get().json()
const textTest: string[] = ["hello", "hello2"]

onFetchResponse((response) => {
  console.log(response.status)
  if(response.status == 200) {
    console.log(data.value)
  }
})

onFetchError((error) => {
  console.error(error.message)
})
</script>

<template>
    <!-- <Text v-if="data" v-for="test in data" :anchor="0.5" :x="200" :y="200" :style="{ align: 'left', fill: 'white',  wordWrap: true,
        wordWrapWidth: 500, fontSize: 10 }">
        {{test}}
    </Text> -->
</template>