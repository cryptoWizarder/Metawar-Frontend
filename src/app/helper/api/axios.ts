import axios from 'axios';
import { API_URL } from '@/app/helper/contsants.helper';

export const http = axios.create({
  baseURL: API_URL,
});
