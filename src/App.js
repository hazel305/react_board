import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import BoardList from './BoardList';
import Write from './Write';

class App extends Component{
  state={
    isModifyMode:false,
    isCompleted:true,
    boardId:0
  }

  handleModify = (checkList) => {
    if (checkList.length === 0) {
      // 모든 체크박스가 해제되었을 때만 alert 표시
      alert('수정할 게시물을 선택하세요.');
    } else if (checkList.length > 1) {
      alert('하나의 게시물만 선택하세요.');
    } else {
      this.setState({
        isModifyMode: true,
        boardId: checkList[0] // 선택한 게시물의 ID를 저장합니다.
      });
    }
  }
  

  render(){
    return(
      <div className="Container">
    <BoardList handleModify={this.handleModify}/>
    <Write/>
    
    </div>
    )
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

