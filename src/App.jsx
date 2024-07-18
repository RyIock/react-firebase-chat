import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/detail/Details";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase";
import useUserStore from "./lib/userStore";
import useChatStore from "./lib/chatStore";

const App = () => {
  
  const {currentUser, isLoading, fetchUserInfo } = useUserStore();
  const chatId  = useChatStore((state) => state.chatId);



  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      if (user) {
      fetchUserInfo(user?.uid);
      } else {
        fetchUserInfo(null);
      }
    });


    return () => {
      unSub();
    };
  }, [fetchUserInfo]);


  if (isLoading) return( 
    <div className="flex items-center justify-center bg-gradient-to-t from-[#08203e] to-[#557c93] h-dvh w-dvw">
  <div className="p-20 text-lg bg-black/50 rounded-md">Loading...</div>
    </div>  );

  return (
    <div className="flex items-center justify-center bg-gradient-to-t from-[#08203e] to-[#557c93] h-dvh w-dvw">
      <div className="h-5/6 w-5/6 max-w-full min-w-[40rem] mx-8 min-h-[500px] bg-black/50 backdrop-blur-md backdrop-saturate-200 rounded-xl shadow-lg flex">
        {currentUser ? (
          <>
            <List/>
            {chatId && <Chat />}
            {chatId && <Details />}
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
