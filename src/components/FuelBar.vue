<script lang="ts" setup>
import { computed, useModel } from 'vue';

const props = defineProps<{
  fuel: number
}>()

const fuel = useModel(props, 'fuel')

const fillBar = computed(() => {
  return fuel.value
})
</script>

<template>
    <container>
        <graphics
            :x="30"
            :y="30"
            @render="graphics => {
                graphics.clear()
                graphics.beginFill(0xffffff)
                graphics.drawRoundedRect(0, 0, 200, 20, 20)
                graphics.endFill()
            }"
        />
        <graphics
            :x="30"
            :y="30"
            @render="graphics => {
                graphics.clear()
                graphics.beginFill(0x6AA84F)
                graphics.drawRoundedRect(0, 0, fillBar, 20, 20)
                graphics.endFill()
            }"
        />
    </container>
</template>