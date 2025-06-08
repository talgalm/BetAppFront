import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BET_BASE_URL);
export default socket;
