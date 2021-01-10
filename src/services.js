import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-mr-electronics.cloudfunctions.net/api",
});

export default instance;
