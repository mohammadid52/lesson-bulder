import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Content = ({
  setSelectedComponent,
  selectedComponent,
  componentList = [],
  setComponentList,
  btnColor,
  isDark,
}) => {
  const onSelectComponent = (item) => {
    setSelectedComponent(item);
  };

  const Col = ({ comp }) => {
    return (
      <div
        id="content"
        key={comp.id}
        className={`${btnColor} h-12 col-span-1 font-bold cursor-pointer bg-opacity-50 rounded p-4`}
      ></div>
    );
  };
  const handleOnDragEnd = (result) => {
    const items = Array.from(componentList);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setComponentList(items);
  };

  return (
    <div
      style={{ width: "75%" }}
      className={`${
        isDark ? "bg-gray-700" : "bg-white"
      } py-8  h-full overflow-y-scroll`}
    >
      {componentList.length > 0 ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="rows">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {componentList.map((comp, idx) => {
                  const isSelected = comp.id === selectedComponent.id;
                  return (
                    <Draggable key={comp.id} draggableId={comp.id} index={idx}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mx-4 my-4"
                        >
                          <h5 className="text-left mb-2 text-gray-400">
                            {comp.name} {idx + 1}
                          </h5>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelectComponent(comp)}
                            className={`grid grid-cols-${
                              comp.columns.length <= 12
                                ? comp.columns.length
                                : 4
                            } gap-4 p-4 ${
                              isSelected
                                ? "border-gray-400"
                                : isDark
                                ? "border-gray-600"
                                : "border-gray-200"
                            } ${
                              comp.bgColor || "bg-transparent"
                            } text-white bg-opacity-30 border${
                              isDark ? "-2" : ""
                            } min-h-24 rounded`}
                          >
                            {comp.columns.map((id) => {
                              return <Col key={id} comp={comp} />;
                            })}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="flex items-center justify-center text-gray-400 h-full">
          <p>Click on component to add here</p>
        </div>
      )}
    </div>
  );
};
export default Content;
