import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
// import { VueFire, VueFireAuth } from 'vuefire'
import jwtDecode from 'jwt-decode'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import IconComponent from '@/components/general/IconComponent.vue'
import axiosInstance from './helpers/axiosInterceptors'
import { authStore } from './stores/authStore'

const TOKEN_EXPIRATION_THRESHOLD = 5 * 60 * 1000; // 5 minutes
const app = createApp(App)
let tokenRefreshTimeout: any

app.component('IconComponent', IconComponent)
app.use(createPinia())
app.use(router)

app.config.globalProperties.$http = axiosInstance
const authstore = authStore()

interface DecodedToken {
  exp: number;
  // add any other properties here that are included in your token payload
}

watch(
  () => authstore.getToken,
  (token, oldToken) => {
    // Clear the token refresh timeout when the token changes
    clearTimeout(tokenRefreshTimeout);

    if (token && typeof token === 'string') {
      const decodedToken = jwtDecode(token as string) as DecodedToken;
      const expiresIn = decodedToken.exp * 1000 - Date.now();

      if (expiresIn > TOKEN_EXPIRATION_THRESHOLD) {
        // If the token will expire after TOKEN_EXPIRATION_THRESHOLD, refresh it early
        tokenRefreshTimeout = setTimeout(() => {
          refreshTokenTry();
        }, expiresIn - TOKEN_EXPIRATION_THRESHOLD);
      } else {
        // If the token will expire before TOKEN_EXPIRATION_THRESHOLD, log the user out
        authstore.signOut();
      }
    }
  }
);

export function startTokenRefresh() {
  const token = authstore.getToken;
  if (token && typeof token === 'string') {
    const decodedToken = jwtDecode(token as string) as DecodedToken;
    const expiresIn = decodedToken.exp * 1000 - Date.now();
    if (expiresIn > TOKEN_EXPIRATION_THRESHOLD) {
      // If the token will expire after TOKEN_EXPIRATION_THRESHOLD, refresh it early
      tokenRefreshTimeout = setTimeout(() => {
        refreshTokenTry();
      }, expiresIn - TOKEN_EXPIRATION_THRESHOLD);
    } else {
      // If the token will expire before TOKEN_EXPIRATION_THRESHOLD, log the user out
      authstore.signOut();
    }
  }
}

async function refreshTokenTry() {
  try {
    const response = await authstore.refreshToken();
    authstore.setAuthData(response.token, response.rToken, response.user);
  } catch (error) {
    authstore.signOut();
  }
}

// Start token refresh on app start
startTokenRefresh();

app.mount('#app')
