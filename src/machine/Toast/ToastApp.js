import React, { useRef, useState } from "react";
import "./style.css";

const ToastApp = () => {
  const [toasts, setToasts] = useState([]);
  const timerRef = useRef({});
  const handleClose = (id) => {
    console.log(id);

    setToasts((prevToasts) => {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
      const filteredArr = prevToasts.filter((toast) => {
        return toast.id !== id;
      });
      return filteredArr; // whenever dealing with settitmeout always manage state using cb prev
    });
  };
  const handleAdd = (type) => {
    const id = new Date().getTime();
    // const newToast = { id, type };
    // setToasts((prevToasts) => {
    //   return [...prevToasts, newToast];
    // });

    const newToasts = [...toasts, { id, type }];
    setToasts(newToasts);

    timerRef.current[id] = setTimeout(() => {
      return handleClose(id);
    }, 5000);
  };

  console.log(toasts);
  return (
    <div className="container">
      <div style={{ position: "fixed", top: "1rem", right: "1rem" }}>
        {toasts.length ? (
          toasts?.map(({ id, type }) => {
            return (
              <div key={id} className={`toasts ${type}`}>
                {type} <span onClick={() => handleClose(id)}>x</span>
              </div>
            );
          })
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
      <div className="button-container">
        <button onClick={() => handleAdd("success")}>Success</button>
        <button onClick={() => handleAdd("warning")}>Warning</button>
        <button onClick={() => handleAdd("error")}>Error</button>
        <button onClick={() => handleAdd("info")}>Info</button>
      </div>
    </div>
  );
};

export default ToastApp;
