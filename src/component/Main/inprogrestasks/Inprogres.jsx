// Inprogres.jsx
import React from "react";
import styles from "./Inprogres.module.css";
import Addbox from "../addtask/Addbox";
import { useState } from "react";

function Inprogres({ tasks, filterValue, Ontoggletask, Ondelete, onAddNewTask }) {
  const getImportantColor = (typeValue) => {
    switch (typeValue) {
      case "newest":
        return { backgroundColor: "#ff5e00", color: "white" };
      case "forced":
        return { backgroundColor: "#ff0095", color: "white" };
      case "relax":
        return { backgroundColor: "#00abdf", color: "white" };
      case "important":
        return { backgroundColor: "red", color: "white" };
      default:
        return { backgroundColor: "#e7c70e", color: "white" };
    }
  };

  const activeTasks = tasks.filter((task) => !task.isdone);
  const completedTasks = tasks.filter((task) => task.isdone);

  const [showAddBox, setShowAddBox] = useState(false);
  const [editingTaskData, setEditingTaskData] = useState(null);

  const handleToggle = (taskId) => {
    if (Ontoggletask) {
      Ontoggletask(taskId);
    }
  };

  const handleDelete = (taskId) => {
    if (window.confirm("آیا از حذف این تسک مطمئن هستید؟")) {
      if (Ondelete) {
        Ondelete(taskId);
      }
    }
  };

  const handleEdit = (task) => {
    // اول تسک قبلی رو حذف کن
    if (window.confirm("آیا می‌خواهید این تسک را ویرایش کنید؟")) {
      if (Ondelete) {
        Ondelete(task.id);
      }
      // اطلاعات تسک رو برای ویرایش آماده کن
      setEditingTaskData({
        typeValue: task.typeValue,
        typeTitle: task.typeTitle,
        value: task.value,
        description: task.description,
        isdone: task.isdone
      });
      // باکس اضافه کردن رو باز کن
      setShowAddBox(true);
    }
  };

  const handleAddTaskFromEdit = (taskData) => {
    if (onAddNewTask) {
      onAddNewTask(taskData);
    }
    setShowAddBox(false);
    setEditingTaskData(null);
  };

  const closeAddBox = () => {
    setShowAddBox(false);
    setEditingTaskData(null);
  };

  const renderTaskCard = (task) => (
    <div key={task.id} className={styles.inprogrestasks}>
      <div className={styles.inprogresdetails}>
        <h2 className={styles.inprogresname}>{task.value}</h2>
        <h3 className={styles.inprogresdiscription}>{task.description}</h3>
      </div>
      <div className={styles.inprogresbtns}>
        <div className={styles.inprogresrightprt}>
          <button className={styles.done} onClick={() => handleToggle(task.id)}>
            {task.isdone ? "تکمیل شده ✓" : "تکمیل شد"}
          </button>
          <button
            className={styles.important}
            style={getImportantColor(task.typeValue)}
          >
            {task.typeTitle}
          </button>
        </div>
        <div className={styles.inprogresleftpart}>
          <button className={styles.edit} onClick={() => handleEdit(task)}>
            🖊️
          </button>
          <button
            className={styles.delet}
            onClick={() => handleDelete(task.id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );

  // باید selectvalue رو از جایی بگیریم - می‌تونیم از props بیاریم یا اینجا تعریف کنیم
  const selectvalue = [
    { id: 0, title: "انتخواب نوع", value: "all", describe: "همه" },
    { id: 1, title: "جدید ترین", value: "newest", describe: "جدید ترین ها" },
    { id: 2, title: "اجباری", value: "forced", describe: "اجباری ها" },
    { id: 3, title: "اختیاری ", value: "relax", describe: "آروم باش" },
    { id: 4, title: " بحرانی", value: "important", describe: "اوضاع بده" },
  ];

  return (
    <div className={styles.inprogres}>
      {showAddBox && <div className={styles.overlay} onClick={closeAddBox} />}
      
      <h3 className={styles.inprogrestxt}>
        تسک های در حال انجام : ({activeTasks.length})
      </h3>
      <div className={styles.inprogrescard}>
        {activeTasks.length > 0 ? (
          activeTasks.map(renderTaskCard)
        ) : (
          <div className={styles.empty}>
            <p>هیچ تسکی وجود ندارد</p>
            <p>برای افزودن تسک جدید، روی دکمه "ایجاد جدید+" کلیک کنید</p>
          </div>
        )}
      </div>
      
      <h3 className={styles.inprogrestxt}>
        تسک های تکمیل شده : ({completedTasks.length})
      </h3>
      <div className={styles.inprogrescard}>
        {completedTasks.length > 0 ? (
          completedTasks.map(renderTaskCard)
        ) : (
          <div className={styles.empty}>
            <p>هیچ تسکی وجود ندارد</p>
          </div>
        )}
      </div>
      
      {showAddBox && (
        <Addbox
          closebox={closeAddBox}
          selectvalue={selectvalue}
          onAddTask={handleAddTaskFromEdit}
        />
      )}
    </div>
  );
}

export default Inprogres;