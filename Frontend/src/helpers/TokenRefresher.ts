import axios from 'axios'
import { authStore } from '@/stores/authStore'
import { watch } from 'vue'
import jwtDecode from 'jwt-decode'

const authstore = authStore();

interface DecodedToken {
  exp: number;
  // add any other properties here that are included in your token payload
}

let tokenRefreshTimeout: ReturnType<typeof setTimeout> | null = null;
const TOKEN_EXPIRATION_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export function startTokenRefresh() {
  const token = authstore.getToken;
  if (token && typeof token === 'string') {
    const decodedToken = jwtDecode(token as string) as DecodedToken;
    const expiresIn = decodedToken.exp * 1000 - Date.now();
    if (expiresIn > TOKEN_EXPIRATION_THRESHOLD) {
      // If the token will expire after TOKEN_EXPIRATION_THRESHOLD, refresh it early
      tokenRefreshTimeout = setTimeout(() => {
        refreshToken();
      }, expiresIn - TOKEN_EXPIRATION_THRESHOLD);
    } else {
      // If the token will expire before TOKEN_EXPIRATION_THRESHOLD, log the user out
      authstore.signOut();
    }
  }
}

async function refreshToken() {
  try {
    const response = await authstore.refreshToken();
    authstore.setAuthData(response.token, response.rToken, response.user);
  } catch (error) {
    authstore.signOut();
  }
}