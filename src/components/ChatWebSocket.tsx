"use client";
import { useEffect, useState } from "react";
import scss from "./ChatWebSocket.module.scss";
import Chats from "./Chats/Chats";

interface IChatWebSocket {
  username: string;
  photo: string;
  message: string;
}
const ChatWebSocket = () => {
  const [messages, setMessages] = useState<IChatWebSocket[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputValue, setInputValue] = useState('')
  const initialWebSocket = () => {
    const ws = new WebSocket("wss://api-v2.elchocrud.pro");
    ws.onopen = () => {
      console.log("WebSocket opened");
    };
    ws.onmessage = (event) => {
      setMessages(JSON.parse(event.data));
    };
    ws.onerror = (error) => {
      console.log(error);
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
      initialWebSocket()
    };
    setSocket(ws);
    
  };
  const sendMessage = () => {
    if(!inputValue) return
    const messageData = {
      event: "message",
      username: "Sezimai",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Saturn%27s_Rings_in_Ultraviolet_Light.png/330px-Saturn%27s_Rings_in_Ultraviolet_Light.png",
      message: inputValue,
    };
    socket?.send(JSON.stringify(messageData));
    setInputValue('')
  };
  useEffect(() => {
    initialWebSocket();
  }, []);
  return (
    <section className={scss.ChatWebSocket}>
      <div className="container">
        <div className={scss.ChatWebSocketContent}>
          <Chats/>
          <div className={scss.content}>
            <h1>Senior Pro-6</h1>
            <div className={scss.sendingMess}>
              <input value={inputValue} type="text" onChange={(e) => setInputValue(e.target.value)}/>
              <button onClick={sendMessage}>send</button>
            </div>
            <div className={scss.messContent}>
              {messages.map((item, index) => (
                    <>
                    <div key={index} className={scss.message} style={{marginLeft: item.username === "Angelina Jolie" ? 'auto' : 0}}>
                    <img src={item.photo} alt="avatar" />
                    <div className={scss.messageContent}>
                      <h3>{item.username}</h3>
                      <p>{item.message}</p>
                    </div>
                  </div>
                    </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChatWebSocket;