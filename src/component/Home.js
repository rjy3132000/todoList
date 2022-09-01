import "../assets/style.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTodo, DeleteTodo, UpdateTodo } from "../services/Action/actions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Home() {
  let [inputData, setInputData] = useState("");
  let [todoToEdit, setTodoToEdit] = useState(null);
  let dispatch = useDispatch();
  let list = useSelector((state) => state.todo_List.list);
  const [update, setUpdate] = useState(false);
  let [user, setUsers] = useState(list);

  const updateInitialized = (id, data) => {
    setUpdate(true);
    setTodoToEdit(id);
    setInputData(data);
  };

  const editTodo = () => {
    dispatch(UpdateTodo(todoToEdit, inputData));
    setUpdate(false);
    setTodoToEdit(null);
    setInputData("");
  };

  return (
    <section className="toDoList">
      <div className="wrapper">
        <h2>Todo App with React/Redux</h2>
        <div className="form-details">
          <div className="form-group input">
            <input
              type={"text"}
              placeholder="Enter a Text...."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </div>
          <div className="form-group btn">
            {update ? (
              <button title="Edit List" onClick={editTodo}>
                Edit TODO
              </button>
            ) : (
              <button
                title="Add List"
                onClick={() => dispatch(AddTodo(inputData, setInputData("")))}
              >
                Add TODO
              </button>
            )}
          </div>
        </div>

        <div>

          <DragDropContext
            onDragEnd={(e) => {
              if (!e.destination) return;
              let tempData = list;
              let [source_data] = tempData.splice(e.source.index, 1);
              tempData.splice(e.destination.index, 0, source_data);
              setUsers(tempData);
            }}
          >
            <table className="table-content" border={1}>
              <thead>
                <tr>
                  <td>##</td>
                  <td>To Do List</td>
                  <td>Delete</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <Droppable droppableId="droppable-1">
                {(provider) => (
                  <tbody ref={provider.innerRef} {...provider.droppableProps}>
                    {list.map((elem, index) => (
                      <Draggable
                        draggableId={elem.data}
                        key={elem.data}
                        index={index}
                      >
                        {(provider) => (
                          <tr
                            ref={provider.innerRef}
                            {...provider.draggableProps}
                          >
                            <td {...provider.dragHandleProps}>=</td>
                            <td>{elem.data}</td>
                            <td>
                              <RiDeleteBin6Line
                                className="icon"
                                onClick={() => dispatch(DeleteTodo(elem.id))}
                              />
                            </td>
                            <td>
                              <AiOutlineEdit
                                onClick={() => {
                                  updateInitialized(elem.id, elem.data);
                                }}
                              />
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>
    </section>
  );
}

export default Home;
