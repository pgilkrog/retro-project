<template lang="pug">
.login-screen-wrapper.center-item
    WindowFrame(title="Log in now")
        .d-flex.p-4
            .image.pe-4
                img(width="70" src="https://win98icons.alexmeub.com/icons/png/key_win_alt-2.png")
            .d-flex.flex-column
                | Type a user name and password to log into Windows
                .d-flex.mt-4
                    .login-text User name:
                    input.light-border(type="text" autocomplete="off" name="username" v-model="username")
                .d-flex.mt-2
                    .login-text   Password:
                    input.light-border(type="password" name="password" autocomplete="off" v-model="password")
            .buttons.d-flex.flex-column.ps-4
                button.btn(v-on:click="confirmLogin()") OK 
                button.btn.mt-2 Cancel
</template>
    
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WindowFrame from './WindowFrame.vue';
import { UserModule } from '@/store/UserModule';

@Component({
    components: {
        WindowFrame
    },
})

export default class LoginScreen extends Vue {
    username = ""
    password = ""

    confirmLogin() {
        if (this.username != "" && this.password != "") {
            console.log("User Logged in")
            UserModule.SET_LOGGEDIN(true)
        }
    }
}
</script>
    