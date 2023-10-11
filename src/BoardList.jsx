import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Link } from "react-router-dom";

function Board(props) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={props.id}
          onChange={(e) => {
            props.onCheckboxChange(e.target.checked, e.target.value);
          }}
        />
      </td>
      <td>{props.id}</td>
      <td>
        <Link to={`/view?id=${props.id}`}>{props.title}</Link>
      </td>
      <td>{props.REGISTER_ID}</td>
      <td>{props.REGISTER_DATE}</td>
    </tr>
  );
}

function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  let getList = () => {
    Axios.get("http://localhost:4000/list")
      .then((result) => {
        const { data } = result;
        setBoardList(data);
        props.renderComplete(); //App.js에 목록 출력 완료 알려준다.
      })
      .catch((error) => {
        // 에러 핸들링
        console.log(error);
      });
  };
  let handleDelete = () => {
    if (checkList.length === 0) {
      alert("삭세할 게시글을 선택하세요");
      return;
    }
    let boardIdList = "";
    checkList.forEach((item) => {
      boardIdList += `'${item}',`;
    });

    boardIdList = boardIdList.substring(0, boardIdList.length - 1);

    Axios.post("http://localhost:4000/delete", {
      boardIdList: boardIdList,
    })
      .then(() => {
        getList();
        setCheckList([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    //componentDidMount 처음 화면 출력한 이후
    getList();
  });
  useEffect(() => {
    //componentDidUpdate isComplete 변경때
    if (!props.isCompleted) {
      getList();
    }
  }, [props.isCompleted]);

  let onCheckboxChange = (checked, id) => {
    const list = checkList.filter((v) => {
      return v != id;
    });
    if (checked) {
      list.push(id);
    }
    setCheckList(list);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>#</th>
            <th>Title</th>
            <th>Wirter Id</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((item) => {
            return (
              <Board
                key={item.BOARD_ID}
                id={item.BOARD_ID}
                title={item.BOARD_TITLE}
                REGISTER_ID={item.REGISTER_ID}
                REGISTER_DATE={item.REGISTER_DATE}
                onCheckboxChange={onCheckboxChange}
              />
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex gap-3">
        <Link to="/write">
          <Button variant="info">글쓰기</Button>
        </Link>
        <Link to="/write">
          <Button
            variant="secondary"
            onClick={() => {
              props.handleModify(checkList);
            }}
          >
            수정
          </Button>
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}

export default BoardList;
