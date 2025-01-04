import React, { useState } from "react";
import "./style.css";

const FileExplorer = ({ explorer, handleInsertNode, handleDeleteNode }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleClick = (e) => {
    // e.stopPropagation();
    // console.log("--showchildren click");
    setShowChildren(!showChildren);
  };

  const handleAddClick = (e, isFolder) => {
    e.stopPropagation();
    setShowChildren(true);
    setShowInput({ visible: true, isFolder: isFolder });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ margin: "16px" }}>
        <div className="container" onClick={handleClick}>
          <h3>
            {explorer.isFolder ? (showChildren ? "📂" : "📁") : "📄"}{" "}
            <span style={{ marginLeft: "2px" }}>{explorer.name}</span>{" "}
          </h3>
          <div>
            <button
              style={{
                marginRight: "4px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddClick(e, true)}
            >
              Folder +
            </button>
            <button
              style={{
                backgroundColor: "white",
                cursor: "pointer",
                marginRight: "4px",
              }}
              onClick={(e) => handleAddClick(e, false)}
            >
              File +
            </button>
            <button
              style={{ backgroundColor: "white", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNode(explorer.id); // Delete the current folder or file
              }}
            >
              🗑️
            </button>
          </div>
        </div>
        <div
          style={{
            paddingLeft: "16px",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {showChildren &&
            explorer?.items?.map((item, index) => {
              return (
                <FileExplorer
                  explorer={item}
                  key={index}
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                />
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "400px",
        }}
      >
        <p className="file">📄 {explorer.name}</p>{" "}
        <button
          style={{ backgroundColor: "white", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteNode(explorer.id); // Delete the current folder or file  // Pass the node ID
          }}
        >
          🗑️
        </button>
      </div>
    );
  }
};

export default FileExplorer;
