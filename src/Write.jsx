import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class Write extends Component {
  state = {
    isModifyMode: false,
    boardId: 0,
    title: "",
    content: "",
  };

  write = () => {
    axios
      .post("http://localhost:4000/insert", {
        title: this.state.title,
        content: this.state.content,
      })
      .then((result) => {
        // const { data } = result;
        // this.setState({
        //   boardList: data,
        // });
        if (result.data.length > 0) {
          this.setState({
            title: "",
            content: "",
          });
        }
        // this.props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  update = () => {
    axios
      .post("http://localhost:4000/update", {
        title: this.state.title,
        content: this.state.content,
        id: this.props.boardId,
      })
      .then(() => {
        // const { data } = result;
        // this.setState({
        //   boardList: data,
        // });
        this.setState({
          title: "",
          content: "",
        });
        this.props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  detail = () => {
    axios
      .get(`http://localhost:4000/detail?id=${this.props.boardId}`)
      .then((result) => {
        // const { data } = result;
        // this.setState({
        //   boardList: data,
        // });

        if (result.data.length > 0) {
          this.setState({
            title: result.data[0].BOARD_TITLE,
            content: result.data[0].BOARD_CONTENT,
            isModifyMode: true,
          });
        }
        // this.props.handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //지금 보드아이디
  componentDidUpdate = (prevProps) => {
    if (this.props.isModifyMode && this.props.boardId != prevProps.boardId) {
      this.detail(); //수정모드이고 새번호가 왔다면 새번호의 글을 조회
    }
  };
  // componentDidUpdate(prevProps) {
  //   if (this.props.boardId !== prevProps.boardId) {
  //     // 새로운 boardId가 전달되면 isModifyMode를 설정합니다.
  //     const isModifyMode = this.props.boardId !== 0;
  //     this.setState({ isModifyMode }, () => {
  //       // isModifyMode를 업데이트한 후에 detail 메서드를 호출합니다.
  //       if (isModifyMode) {
  //         this.detail();
  //       }
  //     });
  //   }
  // }

  render() {
    console.log(this.state.isModifyMode);
    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="글 제목을 입력하세요"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              onChange={this.handleChange}
              value={this.state.content}
            />
          </Form.Group>
        </Form>
        <div className="d-flex gap-3">
          <Button
            variant="info"
            onClick={this.state.isModifyMode ? this.update : this.write}
          >
            작성완료
          </Button>
          <Button variant="secondary" onClick={this.props.handleCancel}>
            취소
          </Button>
        </div>
      </>
    );
  }
}

export default Write;
