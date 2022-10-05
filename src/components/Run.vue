<template lang="pug">
WindowFrame
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WindowFrame from './WindowFrame.vue';

@Component({
    components: {
        WindowFrame
    },
    props: {

    }
})
export default class DesktopItem extends Vue {

}
</script>
    