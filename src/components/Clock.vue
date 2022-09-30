<template lang="pug">
.clock-wrapper
    |   {{ time }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
    },
})
export default class Clock extends Vue {

    time = ''
    
    mounted() {
        this.updateTime()
        setInterval(() => this.updateTime(), 30000)
    }
   
    updateTime() {
        var cd = new Date()
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2)
    }

    zeroPadding(num: number, digit: number) {
        var zero = ''
        for(var i = 0; i < digit; i++) {
            zero += '0'
        }
        return (zero + num).slice(-digit)
    }
}
</script>
    