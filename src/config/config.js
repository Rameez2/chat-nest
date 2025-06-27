// config.js
// export const SOCKET_URL = 'chat-nest-nodejs-production.up.railway.app';
export const SOCKET_URL = 'localhost:4000';

export const ICE_SERVERS = [
  { urls: ['stun:bn-turn2.xirsys.com'] },
  {
    username: '8fUyCPsN4iaQBVt2m85Z7C0-mF6AQK-2yCqX4BlxnxDykeOCip2JN20jhSC7JgoiAAAAAGhZs6JyYW1lZXpyb290',
    credential: '77d21974-506d-11f0-bb59-0242ac140004',
    urls: [
      'turn:bn-turn2.xirsys.com:80?transport=udp',
      'turn:bn-turn2.xirsys.com:3478?transport=udp',
      'turn:bn-turn2.xirsys.com:80?transport=tcp',
      'turn:bn-turn2.xirsys.com:3478?transport=tcp',
      'turns:bn-turn2.xirsys.com:443?transport=tcp',
      'turns:bn-turn2.xirsys.com:5349?transport=tcp',
    ],
  },
];
