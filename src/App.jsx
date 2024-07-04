import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/detail/Details";

const App = () => {
  return (
    <div className="h-5/6 w-5/6 max-w-[1000px] min-h-[500px] bg-black/50 backdrop-blur-md backdrop-saturate-200 rounded-xl shadow-lg flex">
      <List />
      <Chat />
      <Details />
    </div>
  );
};

export default App;