import "./App.css";
import { useState } from "react";

import Content from "./Components/Content.jsx";
import Sidebar from "./Components/Sidebar.jsx";

const mode = "dark";
const isDark = mode === "dark";
const shadeMain = 400;
const theme = "indigo";
const btnColor = `bg-${theme}-${shadeMain}`;

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState({
    name: "",
    id: "",
    bgColor: "",
    columns: [0, 1, 2, 3],
  });
  const [componentList, setComponentList] = useState([]);

  return (
    <div className="App flex  justify-center w-screen h-screen">
      <Content
        btnColor={btnColor}
        isDark={isDark}
        setSelectedComponent={setSelectedComponent}
        componentList={componentList}
        selectedComponent={selectedComponent}
        setComponentList={setComponentList}
      />
      <Sidebar
        isDark={isDark}
        componentList={componentList}
        setComponentList={setComponentList}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
    </div>
  );
};

export default App;
