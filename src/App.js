import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "./BoardList";
import Write from "./Write";
import View from "./View";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [boardId, setBoardId] = useState(0);

  let handleModify = (checkList) => {
    console.log(checkList);
    if (checkList.length === 0) {
      alert("수정할 게시물을 선택하세요");
    } else if (checkList.length > 1) {
      alert("하나의 게시물만 선택하세요");
    }
    setIsModifyMode(checkList.length === 1);
    setBoardId(checkList[0] || 0);
  };

  let handleCancel = () => {
    setIsModifyMode(false);
    setIsCompleted(false);
    setBoardId(0);
  };
  let renderComplete = () => {
    //목록 출력 완료하면
    setIsCompleted(true);
  };

  return (
    <div className="container">
      <h1>React BBS</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BoardList
                handleModify={handleModify}
                renderComplete={renderComplete}
                isCompleted={isCompleted}
              />
            }
          ></Route>
          <Route
            path="/write"
            element={
              <Write
                isModifyMode={isModifyMode}
                boardId={boardId}
                handleCancel={handleCancel}
              />
            }
          ></Route>

          <Route path="/view" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
