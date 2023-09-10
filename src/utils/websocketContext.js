import io from "socket.io-client";
import { baseURL } from "./request";

const SOCKET_URL_MESSAGE = `${baseURL}:3003`;
const SOCKET_URL_TRIP = `${baseURL}:3014`;

class WSService {
  constructor() {
    this.connected = false;
  }
  initializeSocket = async key => {
    try {
      this.socket = io(
        key === "chatting" ? SOCKET_URL_MESSAGE : SOCKET_URL_TRIP,
        {
          transports: ["websocket"],
        }
      );
      // console.log("initializing socket", this.socket);

      this.socket.on("connect", data => {
        console.log("=== socket connected ====");
        this.connected = true; // Socket đã kết nối
        console.log(key);
      });

      this.socket.on("disconnect", data => {
        this.connected = false; // Socket đã ngắt kết nối
        console.log("=== socket disconnected ====");
      });

      this.socket.on("error", data => {
        console.log("socekt error", data);
      });
    } catch (error) {
      console.log("scoket is not inialized", error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketServcies = new WSService();

export default socketServcies;
