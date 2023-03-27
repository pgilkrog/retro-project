import axios from "axios";

const setAuthToken = (token: string) => {
    if (token) {
        console.log("SETAUTHTOKEN", token)
        axios.defaults.headers.common["Authorization"] = token
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
};

export default setAuthToken;