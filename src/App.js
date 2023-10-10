import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "./BoardList";
import Write from "./Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [boardId, setBoardId] = useState(0);

  const handleModify = (checkList) => {
    if (checkList.length === 0) {
      // 모든 체크박스가 해제되었을 때만 alert 표시
      alert("수정할 게시물을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시물만 선택하세요.");
    }
    setIsModifyMode(checkList.length === 1);
    setBoardId(checkList[0]);
  };

  const handleCancel = () => {
    setIsModifyMode(false);
    setIsCompleted(false);
    setBoardId(0);
  };

  const renderComplete = () => {
    // 목록 출력 완료하면
    setIsModifyMode(true);
  };

  return (
    <div className="Container">
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
