import { useState } from "react";
import "./App.css";
import Addtasks from "./component/Main/addtask/Addtasks";
import Inprogres from "./component/Main/inprogrestasks/Inprogres";

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  const handleNewTask = (taskData) => {
    setAllTasks([
      ...allTasks,
      {
        id: Date.now(),
        typeValue: taskData.typeValue,
        typeTitle: taskData.typeTitle,
        value: taskData.value,
        description: taskData.description,
        isdone: false,
        // date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const delettask = (TaskID) => {
    setAllTasks((prevtask) => prevtask.filter((task) => task.id !== TaskID));
  };

  const handleFilterChange = (filterValueParam) => {
    console.log("فیلتر تغییر کرد:", filterValueParam);
    setFilterValue(filterValueParam);
  };

  const filteredTasks =
    filterValue === "all"
      ? allTasks
      : allTasks.filter((task) => task.typeValue === filterValue);

  const toggleTaskStatus = (taskId) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isdone: !task.isdone } : task,
      ),
    );
  };

  return (
    <div>
      <Addtasks onAddTask={handleNewTask} onFilterChange={handleFilterChange} />
      <Inprogres
        tasks={filteredTasks}
        Ontoggletask={toggleTaskStatus}
        Ondelete={delettask}
        onAddNewTask={handleNewTask}
      />
    </div>
  );
}

export default App;
