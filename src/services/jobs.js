import axios from 'axios';

export function getJobs() {
  return axios.get('/api/meta-stream');
}
