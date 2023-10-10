import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "./BoardList";
import Write from "./Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [boardState, setBoardState] = useState({
    isModifyMode: false,
    isCompleted: true,
    boardId: 0,
  });

  const handleModify = (checkList) => {
    if (checkList.length === 0) {
      // 모든 체크박스가 해제되었을 때만 alert 표시
      alert("수정할 게시물을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시물만 선택하세요.");
    }
    setBoardState({
      isModifyMode: checkList.length === 1,
      boardId: checkList[0],
      // 나머지 상태는 변경하지 않음
      ...boardState,
    });
  };

  const handleCancel = () => {
    setBoardState({
      isModifyMode: false,
      isCompleted: false,
      boardId: 0,
    });
  };

  const renderComplete = () => {
    // 목록 출력 완료하면
    setBoardState({
      isModifyMode: true,
      // 나머지 상태는 변경하지 않음
      ...boardState,
    });
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
                isCompleted={boardState.isCompleted}
              />
            }
          ></Route>
          <Route
            path="/write"
            element={
              <Write
                isModifyMode={boardState.isModifyMode}
                boardId={boardState.boardId}
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
