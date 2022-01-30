import axios from 'axios';


const baseURL = 'https://ecochallenge-apis.herokuapp.com';


const topTechApi = axios.create({ baseURL });

export default topTechApi;