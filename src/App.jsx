import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/detail/Details";
import Login from "./components/login/Login";

const App = () => {

  const user = false;

  return (
    <div className="flex items-center justify-center bg-gradient-to-t from-[#08203e] to-[#557c93] h-dvh w-dvw">
      <div className="h-5/6 w-5/6 max-w-full min-w-[40rem] mx-8 min-h-[500px] bg-black/50 backdrop-blur-md backdrop-saturate-200 rounded-xl shadow-lg flex">
        {
          user ? (
            <>
        <List />
        <Chat />
        <Details />
        </>
      ) : (
<>
<Login/>
</>

      )
        }
        
       
      </div>
    </div>
  );
};

export default App;
