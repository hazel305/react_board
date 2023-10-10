import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
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
      <td>{props.title}</td>
      <td>{props.REGISTER_ID}</td>
      <td>{props.REGISTER_DATE}</td>
    </tr>
  );
}

function BoardList(props) {
  const [boardList, setBoardList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const getList = () => {
    axios
      .get("http://localhost:4000/list")
      .then((result) => {
        const { data } = result;
        setBoardList(data);
        props.renderComplete(); // app.js에 목록 출력 완료를 알려준다.
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = () => {
    if (checkList.length === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }
    let boardIdList = "";

    checkList.forEach((item) => {
      boardIdList += `'${item}',`;
    });
    boardIdList = boardIdList.substring(0, boardIdList.length - 1);
    axios
      .post("http://localhost:4000/delete", {
        boardIdList: boardIdList,
      })
      .then(() => {
        getList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onCheckboxChange = (checked, id) => {
    const list = checkList.filter((v) => {
      return v != id;
    });
    if (checked) {
      list.push(id);
    }
    setCheckList(list);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (!props.isCompleted) {
      getList();
    }
  }, [props.isCompleted]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
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
        <Button
          variant="secondary"
          onClick={() => {
            props.handleModify(checkList);
          }}
        >
          수정
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}

export default BoardList;
