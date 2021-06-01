import { useEffect, useState } from "react";
import uuid from "react-uuid";
import findIndex from "lodash/findIndex";
import filter from "lodash/filter";
import Button from "../Elements/Button";

const Sidebar = ({
  selectedComponent,
  setSelectedComponent,
  componentList,
  setComponentList,
  isDark,
}) => {
  const addComponent = () => {
    setComponentList([
      ...componentList,
      { name: "Row", id: uuid(), bgColor: "", columns: [0, 1, 2, 3] },
    ]);
  };

  const update = (id) => {
    const idx = getIdx(id);
    componentList[idx].bgColor = selectedBgColor;
    let newColums = [];
    for (let i = 0; i < colNum; i++) {
      newColums.push(i);
    }
    componentList[idx].columns = newColums;
    componentList[idx].bgColor = selectedBgColor;
    setComponentList([...componentList]);
  };

  const getIdx = (id) => findIndex(componentList, (item) => item.id === id);

  const clear = () => {
    setSelectedComponent({
      name: "",
      id: "",
      bgColor: "",
      columns: [0, 1, 2, 3],
    });
  };

  const { name, id } = selectedComponent;

  const [selectedBgColor, setSelectedBgColor] = useState("");
  const [colNum, setColNum] = useState(selectedComponent.columns.length);

  useEffect(() => {
    setColNum(selectedComponent.columns.length);
  }, [selectedComponent.columns.length]);

  const onDelete = (id) => {
    const filtered = filter(componentList, (item) => item.id !== id);
    clear();
    setComponentList(filtered);
  };

  return (
    <div
      style={{ width: "25%" }}
      className={`relative flex items-center justify-center bg-gray-${
        isDark ? 600 : 500
      } h-full py-8 overflow-y-hidden`}
    >
      <div className="flex flex-col w-4/5">
        <div
          className={`mb-2 text-gray-300 bg-opacity-50 bg-gray-${
            isDark ? 500 : 400
          } w-auto min-w-56 text-center flex items-center justify-center rounded-lg`}
        >
          {name ? (
            <div className="flex flex-col w-full p-2">
              <div
                onClick={() =>
                  setSelectedBgColor(() =>
                    !selectedBgColor ? "bg-gray-500" : ""
                  )
                }
                className={`hover:bg-gray-100 py-2 rounded cursor-pointer hover:bg-opacity-10 text-left px-2`}
              >
                Change Background
              </div>
              <div className="hover:bg-gray-100 flex items-center justify-start py-2 rounded cursor-pointer hover:bg-opacity-10 text-left px-2">
                <label>Columns:</label>
                <input
                  value={colNum}
                  type="number"
                  min={1}
                  max={99}
                  onChange={(e) => setColNum(e.target.value)}
                  className="bg-transparent border-none px-2 outline-none w-12"
                />
              </div>
            </div>
          ) : (
            <div className="h-20 px-4 flex items-center justify-center">
              <p className="text-xs">Click on row to edit</p>
            </div>
          )}
        </div>
        {name && (
          <>
            <div className="flex w-full items-center mb-2 mt-4">
              <Button onClick={clear} classes="w-1/3 mr-1" text="Cancel" />
              <Button
                onClick={() => onDelete(id)}
                classes="w-3/4"
                text="Delete"
                border={`border-red-400 hover:border-red-500`}
              />
            </div>
            <Button onClick={() => update(id)} text="Update" />
          </>
        )}
      </div>

      <Button
        onClick={addComponent}
        text="Add Row +"
        classes="absolute bottom-5 w-4/5"
      />
    </div>
  );
};
export default Sidebar;
