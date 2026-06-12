import React from "react";
import Styles from "./Addtask.module.css";
import hourglass from "../../../assets/hourglass.png";
import { useState } from "react";

function Addbox({ onAddTask, selectvalue, closebox }) {
  const [tasktype, settasktype] = useState();
  const [taskvalue, settaskvalue] = useState();
  const [describetask, setdescribetask] = useState();
  const [hasdone, setifdone] = useState(false);

  const handleSubmit = () => {
    if (tasktype && taskvalue) {
      const selectedType = selectvalue.find((item) => item.value === tasktype);
      const taskTitle = selectedType ? selectedType.title : tasktype;
      onAddTask &&
        onAddTask({
          typeValue: tasktype,
          typeTitle: taskTitle,
          value: taskvalue,
          description: describetask,
          isdone: hasdone,
        });
      closebox();
      settasktype("");
      settaskvalue("");
    } else {
      alert("لطفاً نوع و عنوان تسک را وارد کنید");
    }
  };

  return (
    <div className={Styles.Addbox}>
      <button className={Styles.cancelbtn} onClick={closebox}>
        X
      </button>
      <div className={Styles.midofadding}>
        <h2>افزودن تسک جدید</h2>
        <div className={Styles.inputbox}>
          <div className={Styles.inputpart}>
            <select className={Styles.shoeselection}
              onChange={(e) => settasktype(e.target.value)}
              value={tasktype}  

            >
              <option value="" disabled hidden >
                نمایش فقط
              </option>
              {selectvalue.map((item) => (
                <option key={item.id} value={item.value} >
                  {item.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              className={Styles.inputtask}
              placeholder="عنوان تسک..."
              value={taskvalue}
              onChange={(e) => settaskvalue(e.target.value)}
            />
          </div>
          <input
            type="text"
            className={Styles.inputtask}
            placeholder="توضیحات..."
            onChange={(e) => setdescribetask(e.target.value)}
          />
        </div>
      </div>
      <button className={Styles.submitbtn} onClick={handleSubmit}>
        ثبت
      </button>
    </div>
  );
}

export default Addbox;
