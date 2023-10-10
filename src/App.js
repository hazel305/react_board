import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "./BoardList";
import Write from "./Write";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  state = {
    isModifyMode: false,
    isCompleted: true,
    boardId: 0,
  };

  handleModify = (checkList) => {
    if (checkList.length === 0) {
      // 모든 체크박스가 해제되었을 때만 alert 표시
      alert("수정할 게시물을 선택하세요.");
    } else if (checkList.length > 1) {
      alert("하나의 게시물만 선택하세요.");
    }
    this.setState({
      isModifyMode: checkList.length === 1,
      boardId: checkList[0],
    });
  };

  handleCancel = () => {
    this.setState({
      isModifyMode: false,
      isCompleted: false,
      boardId: 0,
    });
  };

  renderComplete = () => {
    //목록 출력 완료하면
    this.setState({
      isModifyMode: true,
    });
  };

  render() {
    return (
      <div className="Container">
        <h1>React BBS</h1>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <BoardList
                  handleModify={this.handleModify}
                  renderComplete={this.renderComplete}
                  isCompleted={this.state.isCompleted}
                />
              }
            ></Route>
            <Route
              path="/write"
              element={
                <Write
                  isModifyMode={this.state.isModifyMode}
                  boardId={this.state.boardId}
                  handleCancel={this.handleCancel}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="Container">
//     <BoardList/>
//     <Write/>

//     </div>
//   );
// }

export default App;
