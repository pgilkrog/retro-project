<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.fit-content.m-4.pointer(v-on:click="itemPressed()")
    img(:src="img" height="50" width="50")
    |  {{ title }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
    },
    props: {
        img: String,
        title: String,
        url: String
    }
})
export default class DesktopItem extends Vue {
    img: string | undefined
    title: string | undefined
    url: string | undefined

    itemPressed() {
        this.$emit('generateComponent')
    }
}
</script>
    