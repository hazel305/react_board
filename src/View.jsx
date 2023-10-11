import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
// import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function View() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let detail = () => {
    Axios.get(`http://localhost:4000/detail?id=${id}`)
      .then((result) => {
        if (result.data.length > 0) {
          setTitle(result.data[0].BOARD_TITLE);
          setContent(result.data[0].BOARD_CONTENT);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    detail();
  }, []);
  return (
    <div>
      <h2>글 상세</h2>
      <h3>제목: {title}</h3>
      <h4>내용</h4>
      <div className="content">{content}</div>
      <Link to="/">
        <Button variant="secondary">목록</Button>
      </Link>
    </div>
  );
}

export default View;
