import React from "react";
import ReactDOM from "react-dom/client";
import "reset-css";
import initialData from "./initial-data";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  state = initialData;

  onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    this.state.columns[source.droppableId].taskIds.splice(source.index, 1);

    const newTasks = this.state.columns[destination.droppableId].taskIds;
    newTasks.splice(destination.index, 0, draggableId);

    this.setState(newTasks);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
