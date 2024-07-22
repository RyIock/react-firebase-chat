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
    <div className="flex h-dvh w-dvw items-center justify-center bg-gradient-to-t from-[#08203e] to-[#557c93]">
  <div className="rounded-md bg-black/50 p-20 text-lg">Loading...</div>
    </div>  );

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-gradient-to-t from-[#08203e] to-[#557c93]">
      <div className="sm:mx-8 flex h-full sm:h-5/6 sm:min-h-[500px] sm:w-5/6 w-full sm:min-w-[40rem] max-w-full rounded-xl bg-black/50 shadow-lg backdrop-blur-md backdrop-saturate-200">
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
