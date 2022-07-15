import axios from 'axios';

const channelId = 'UCPFlu0ga-pU8SezS3rl_XnQ';
const youtubeDB = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyBXYtvK1nGLzR3OSejuKd3fpvHvwVp_b0o',
  },
});

export default youtubeDB;

export const endpoints = {
  search: `/search?channelId=${channelId}&order=date&part=snippet&type=video&maxResults=50`,
}
