import React from "react";
import Styles from "./Addtask.module.css";
import hourglass from "../../../assets/hourglass.png";
import { useState } from "react";
import Addbox from "./Addbox";

function Addtasks({ onAddTask ,onFilterChange }) {
  const [selectvalue, setselectvalue] = useState([
    { id: 0, title: "انتخواب نوع", value: "all",describe:"همه" },
    { id: 1, title: "جدید ترین", value: "newest",describe:"جدید ترین ها" },
    { id: 2, title: "اجباری", value: "forced",describe:"اجباری ها" },
    { id: 3, title: "اختیاری ", value: "relax",describe:"آروم باش" },
    { id: 4, title: " بحرانی", value: "important",describe:"اوضاع بده" },
  ]);

  const [addingbox, setaddingbox] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [describetask, setdescribetask] = useState();

  const wantadd = () => {
    setaddingbox(true);
  };

  const closebox = () => {
    setaddingbox(false);
  };

  const handleAddTask = (taskData) => {
    onAddTask(taskData);
    closebox();
  };

   const handleFilterChange = (event) => {
    const filterValueParam = event.target.value; 
    console.log("مقدار فیلتر:", filterValueParam);
    setSelectedFilter(filterValueParam);

    const selectedItem = selectvalue.find(item => item.value === filterValueParam);
    const describevalue = selectedItem ? selectedItem.describe : "";

    setdescribetask(describevalue)
    console.log(" توضیحات:", describevalue);
    
    if (onFilterChange) {
      onFilterChange(filterValueParam);  
    }
  };

  return (
    <>
      {addingbox && <div className={Styles.overlay} onClick={closebox} />}
      <div className={Styles.addtasks}>
        <div>
          <div className={Styles.managementpart}>
            <img src={hourglass} className={Styles.hour} alt="" />
            <h2 className={Styles.managementtopic}>مدیریت و برنامه ریزی</h2>
          </div>
          <h3 className={Styles.creator}>
            ساخته شده توسط علی اسمعیلی
          </h3>
        </div>
        <div>
          <button className={Styles.button} onClick={wantadd}>
            ایجاد جدید+
          </button>
          <select value={selectedFilter} onChange={handleFilterChange} className={Styles.shoeselection}>
            {selectvalue.map((item) => (
              <option key={item.id} value={item.value} >
                {item.title}
              </option>
            ))}
          </select>
        </div>
        {addingbox && (
          <Addbox
            closebox={closebox}
            selectvalue={selectvalue}
            onAddTask={handleAddTask}
          />
        )}
      </div>
    </>
  );
}

export default Addtasks;
