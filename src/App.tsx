import { useRecoilValue } from "recoil";
import Folder from "./components/Folder";
import { mainFolderAtom } from "./atoms";

function App() {
  const mainFolderData = useRecoilValue(mainFolderAtom);
  return (
    <div className="w-full">
      <Folder data={mainFolderData} wrapperStyle="px-1 bg-gray-200" />
    </div>
  );
}

export default App;
