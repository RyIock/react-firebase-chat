import React, { Component, useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../lib/Firebase";
import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false); //Open and Close Emoji Picker
  const [text, setText] = useState(""); //Adds Emoji's to Textbox
  const [img, setImg] = useState({ //send images in chat
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverUserBlocked } = useChatStore();
  const currentUser = useUserStore((state) => state.currentUser);

  const endRef = useRef(null);

  useEffect(() => {
    //Autosmooth to bottom of Chat
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    //https://firebase.google.com/docs/firestore/query-data/listen
    // This cool function onSnapshot, allows me to listen to a document thats on the database, when the database updated then 
    const unSub = onSnapshot(doc(database, "chats", chatId), (res) => { //this listens if the contents of chatId changes
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "" && !img.file) return;

   

    try { 
      
      let imgUrl = null

      if(img.file){
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(database, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
        }),
      });

      const userIDs = [currentUser.id, user.id];
    //For both of the current user and the user you're messaging update their shared chat.
      userIDs.forEach(async (id) => { 
        const userChatsRef = doc(database, "userchats", id);
        const userChatSnapshot = await getDoc(userChatsRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data(); 

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false; // if you're the sender you've seen it, else you havent.
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }


    setImg({
      file: null,
      url: "",
    })

    setText("")

  };

  return (
    <div className="flex flex-col flex-auto border-l-2 border-[#18405f]">
      <div //Top Bar
        className="flex border-b-2 border-[#18405f] shadow-lg"
      >
        <div className="flex items-center gap-4 p-4">
          <img
            src={user?.avatar || "src/assets/avatar.png"}
            alt=""
            className="size-16 rounded-full"
          />
          <div //Contact Name & Desc
            className="flex flex-col gap-0"
          >
            <span className="font-bold text-lg">{user?.username || 'Unavailable User' }</span>
            <p className="text-sm text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="icons flex flex-auto justify-end items-center gap-3 pr-6 *:size-6">
          <svg //Phone
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <svg //Video
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
          </svg>
          <svg //Info
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div // Center
        className="flex flex-col flex-1 overflow-scroll gap-5 *:max-w-[70%] *:flex *:gap-5"
      >


        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser?.id ? "self-end " : "*:*:bg-black/25 pl-2"} key={message?.createdAt}>
            <div className="texts mt-5 mr-5">
              {message.img && (
                <img
                  src={message.img}
                  alt=""
                  className="w-full h-72 object-cover rounded-lg mb-1"
                />
              )}
              <p className="bg-sky-300 p-4 rounded-md shadow-sm">
                {message.text}
              </p>
              {/* {<span className="text-xs ">{message}</span>} */}
            </div>
          </div>
        ))}

            {img.url && (  //IMAGE MESSAGE 
              <div className="self-end " >
               <div className="texts mt-5 mr-5">
              
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-72 object-cover rounded-lg mb-1"
                />
            </div>
          </div>
        )}

        {/* <div className="message">
          <img
            src="src/assets/avatar.png"
            alt=""
            className="size-8 rounded-full object-cover ml-4 "
          />
          <div className="texts">
            <p className="p-4 rounded-md  bg-black/25 shadow-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
              aperiam illo vitae fuga ea culpa recusandae. Expedita id dolor
              neque qui quis, dolore nobis ullam eveniet sint dicta ex natus.
            </p>
            <span className="text-xs ">1 min ago</span>
          </div>
        </div> */}

        <div ref={endRef} className="end"></div>
      </div>

      <div //Bottom Bar
        className="flex items-center justify-between border-t-2 border-[#18405f] shadow-lg"
      >
        <div className="flex *:size-6 gap-1 p-2">
          <input type="file" id="file" className=" hidden" onChange={handleImg} />
          <label htmlFor="file">
            <svg //image
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <svg //microphone
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
            <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
          </svg>
          <svg //camera
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fillRule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={text}
          disabled={isCurrentUserBlocked || isReceiverUserBlocked}
          onChange={(e) => setText(e.target.value)}
          placeholder={(isCurrentUserBlocked || isReceiverUserBlocked) ? 'You cannot chat with this user...' : 'Type a message...' }
          className="bg-black/35 flex-1 disabled:cursor-not-allowed border-none outline-none focus:outline-none text-white rounded-lg p-1 pl-3 m-2 placeholder:text-gray-700 group-hover:placeholder:text-gray-800 focus:placeholder:text-gray-800 sm:text-sm sm:leading-6"
        />
        <div //emoji and Emoji Onlick
          className="*:size-6 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            data-open={open}
            className="size-6 data-[open=true]:fill-slate-500"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
              clipRule="evenodd"
            />
          </svg>
          <div className=" absolute bottom-[23rem] right-[17rem]">
            <EmojiPicker
              on
              open={open}
              onEmojiClick={handleEmoji}
              theme="auto"
              width={300}
              height={350}
            />
          </div>
        </div>
        <button
          onClick={handleSend}
          className="mx-3 py-1 px-3 rounded-md shadow-sm text-sm font-semibold bg-sky-600 hover:bg-sky-500 disabled:text-gray-400 disabled:bg-gray-700/50"
          disabled={isCurrentUserBlocked || isReceiverUserBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
