<template lang="pug">
WindowFrame(title="Network Neighborhood" v-on:closeWindow="closeWindow")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WindowFrame from '../WindowFrame.vue';

@Component({
    components: {
        WindowFrame
    }
})

export default class NetworkNeighborhood extends Vue {
    closeWindow() {
        this.$emit('closeWindow', "NetworkNeighborhood")
    }
} 
</script>