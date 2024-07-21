import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../../../lib/Firebase";
import { useState } from "react";
import useUserStore from "../../../lib/userStore";

const AddUser = ({ set }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  //const {currentUser} = useUserStore();

  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      // https://firebase.google.com/docs/firestore/query-data/queries 2:17:41
      const userRef = collection(database, "users");

      const q = query(userRef, where("username", "==", username)); //No validation on same usernames yet. Fix.

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(database, "chats");
    const userChatsRef = collection(database, "userchats");
    const userChatRefCheck = doc(database, "userchats", currentUser.id);
    const userChatSnap = await getDoc(userChatRefCheck);
    let createChat = true;

    try {
      if (userChatSnap.exists()) {
        //console.log("Document data:", userChatSnap.data());
        const checkData = userChatSnap.data();
        console.log(checkData.chats);
        checkData.chats.forEach((e) => {
          if (e.receiverId === user.id) {
            set(false);
            createChat = false;
          }
        });
      }
      if (createChat && currentUser.id !== user.id) {
        const newChatRef = doc(chatRef);

        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          messages: [],
        });

        await updateDoc(doc(userChatsRef, user.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(), //serverTimestamp doesnt work with arrayUnion??
          }),
        });

        await updateDoc(doc(userChatsRef, currentUser.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      }
      set(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 bg-[#082742] border-[#18405f] shadow-lg rounded-xl border-2 absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
      <form
        onSubmit={handleSearch}
        className="flex gap-2 pb-3 items-center justify-center mb-2 border-b-2 border-[#18405f]"
      >
        <input
          className="bg-black/35 flex-1 border-none outline-none focus:outline-none text-white rounded-lg p-1 pl-3 placeholder:text-gray-700 group-hover:placeholder:text-gray-800 focus:placeholder:text-gray-800 sm:text-sm sm:leading-6"
          type="text"
          placeholder="Username"
          name="username"
        />
        <button className="bg-sky-600 p-1 px-6 rounded-md text-sm font-semibold">
          Search
        </button>
      </form>
      {user && (
        <div className="flex justify-between mt-6">
          <div className="flex items-center gap-5">
            <img
              className="size-14 rounded-full"
              src={user.avatar || "src/assets/avatar.png"}
              alt=""
            />
            <span className="font-semibold">{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="bg-black/25 px-6 rounded-md h-10 self-center"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
