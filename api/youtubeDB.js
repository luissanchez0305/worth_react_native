import axios from 'axios';
import { YOUTUBE_KEY } from '@env';

const channelId = 'UCPFlu0ga-pU8SezS3rl_XnQ';
const youtubeDB = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: YOUTUBE_KEY,
  },
});

export default youtubeDB;

export const endpoints = {
  search: `/search?channelId=${channelId}&order=date&part=snippet&type=video&maxResults=50`,
}
