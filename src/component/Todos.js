import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTodo, DeleteTodo, UpdateTodo } from "../services/Action/actions";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Card = ({todo}) => {
  const dispatch = useDispatch();
  
  return ( 
    <>
      <p> {todo.data} </p>

      <div >
          <button>
              edit
          </button>
          <button onClick={() => dispatch(DeleteTodo(todo.id))}>
            delete
          </button>
      </div>
    </> 
  )
}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


export const Todos = ({handleEdit}) => {
    const todos = useSelector(state => state.todo_List.list);
    console.log('67', todos)

    useEffect(() => {
      <Card/>
    }, [todos])
    
    const columnsFromBackend = {
        [uuidv4()]: {
          name: "To do",
          items: todos
        },
        [uuidv4()]: {
          name: "In Progress",
          items: []
        },
        [uuidv4()]: {
          name: "Done",
          items: []
        }
      };

      const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <div>

            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
         
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <Card key={item.id} index={index} todo={item} handleEdit={handleEdit} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
            
            
        </div>
    );
};