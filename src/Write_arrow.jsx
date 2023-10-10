import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Write(props) {
  // const [isModifyMode, setIsModifyMode] = useState(false);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");


  const [form, setForm] = useState({
    isModifyMode:false,
    title:'',
    content:''
  })

  const {isModifyMode, title, content} = form;

  const navigate = useNavigate();

  useEffect(() => {
    if (props.isModifyMode && props.boardId) {
      detail();
    }
  }, [props.isModifyMode, props.boardId]);

  let write = () => {
    axios
      .post("http://localhost:4000/insert", {
        title: title,
        content: content,
      })
      .then(() => {
        setForm({
          isModifyMode: false,
          title: "",
          content: "",
        });
        navigate("/");
        props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let update = () => {
    axios
      .post("http://localhost:4000/update", {
        title: title,
        content: content,
        id: props.boardId,
      })
      .then(() => {
        setForm({
          isModifyMode: false,
          title: "",
          content: "",
        });
        navigate("/");
        props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let detail = () => {
    axios
      .get(`http://localhost:4000/detail?id=${props.boardId}`)
      .then((result) => {
        if (result.data.length > 0) {
          setForm({
            isModifyMode: true,
            title: result.data[0].BOARD_TITLE,
            content: result.data[0].BOARD_CONTENT,
          });
        }
        // this.props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };



  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="글 제목을 입력하세요"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            onChange={handleChange}
            value={content}
          />
        </Form.Group>
      </Form>
      <div className="d-flex gap-3">
        <Button
          variant="info"
          //onClick={() => navigate("/")}
          onClick={isModifyMode ? update : write}
        >
          작성완료
        </Button>
        <Link to="/">
          <Button variant="secondary">취소</Button>
        </Link>
      </div>
    </>
  );
}

export default Write;
