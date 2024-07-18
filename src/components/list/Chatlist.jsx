import React, { useEffect, useState } from "react";
import AddUser from "./addUser/addUser";
import useUserStore from "../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../../lib/Firebase";

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false); 
  const [chats, setChats] = useState([]);

  const handleUserAdded = (newChat) => { //Added
    setChats(prevChats => [...prevChats, newChat]);
    setAddMode(false);
  };

  const currentUser  = useUserStore((state) => state.currentUser); //Obtain the zustand state managed "useUserStore"
  //const { currentUser } = useUserStore();


  useEffect(() => { //  https://firebase.google.com/docs/firestore/query-data/listen

    const unSub = onSnapshot(doc(database, "userchats", currentUser.id), async (response) => {

        const items = response.data().chats;
        

        const promises = items.map(async (item) => {
          
          if (!item || !item.receiverId) { //ADDED
            console.warn("Invalid chat item:", item);
            return null;
          }
          try{ //ADDED
          const userDocRef = doc(database, "users", item.receiverId); // https://firebase.google.com/docs/firestore/query-data/get-data
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) { //ADDED
            console.warn(`User ${item.receiverId} not found`);
            return null;
          }

          const user = userDocSnap.data();
         
          return { ...item, user }; }
          catch (err) { //ADDED
            console.error(`Error fetching user ${item.receiverId} at index ${index}:`, err);
            return null;
          }
        });

        const chatData = await Promise.all(promises);
       
        const validChats = chatData.filter(Boolean); //ADDED 
       
        setChats(validChats.sort((a, b) => b.updatedAt - a.updatedAt)); //Changed chatData -> validChats
      });

    return () => {
      unSub();
    };
  }, [currentUser.id]); 

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-bl-xl">
      <div className="flex py-1 px-2 gap-2">
        <div // Search BAR
          className="relative rounded-md shadow-sm group"
        >
          <div // Search Icon in Search Box
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="transition ease-in-out size-5 fill-gray-700 group-hover:fill-gray-300 duration-200"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input // Search Box
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="focus:outline-none block bg-black/35 text-white border-none w-full rounded-md border-0 py-1.5 pl-7 pr-2 placeholder:text-gray-700 group-hover:placeholder:text-gray-800 focus:placeholder:text-gray-800 sm:text-sm sm:leading-6"
          />
        </div>
        <button // Add Friends Button
          className="rounded-md hover:bg-black/45 group bg-black/35 content-center justify-center w-9 h-9 flex-none flex items-center"
          onClick={() => setAddMode((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-addmode={!addMode}
            className="size-6 fill-white group-hover:fill-gray-300 w-5 h-5 data-[addmode=false]:hidden"
          >
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-addmode={!addMode}
            className="size-6 fill-white group-hover:-gray-300 w-5 h-5 data-[addmode=true]:hidden"
          >
            <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
          </svg>
        </button>
      </div>
      <div // Friends List
        className="overflow-auto *:flex *:items-center *:gap-6 *:p-2 *:cursor-pointer *:border-b-2 *:border-[#18405f]"
      >
        {chats.map((chat) => (
          <div className="" key={chat.chatId}>
            <img src="src\assets\avatar.png" className="h-10 rounded-full" />
            <div className="texts">
              <span className="text-base font-semibold">Adam Doe</span>
              <p className="text-sm">{chat.lastMessage || "No messages"}</p>
            </div>
          </div>
        ))}
      </div>
      {addMode ? (
        <AddUser onUserAdded={handleUserAdded} />
      ) : (
        <button className="text-sm" onClick={() => setAddMode(true)}>Add User +</button>
      )}
    </div>
  );
};

export default Chatlist;
