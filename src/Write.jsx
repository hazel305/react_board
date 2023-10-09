import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class Write extends Component{
  state={
    isModifyMode:false,
    title:'',
    content:''
  }

  write = ()=>{
    axios.post('http://localhost:4000/insert',{
      title:this.state.title,
      content:this.state.content
    })
    .then((result)=>{
      const {data} = result;
      this.setState({
        boardList:data
      })
     
    })
    .catch(function(error){
        console.log(error)
    })
  }

  update = ()=>{
    axios.post('http://localhost:4000/update',{
      title:this.state.title,
      content:this.state.content,
      id:this.props.boardId
    })
    .then((result)=>{
      const {data} = result;
      this.setState({
        boardList:data
      })
     
    })
    .catch(function(error){
        console.log(error)
    })
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
    render(){
      // console.log(this.state.content);
      return (
        <>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>제목</Form.Label>
              <Form.Control 
              type="text"
               placeholder="글 제목을 입력하세요" 
               name="title"
               onChange={
                this.handleChange
               }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control
               as="textarea"
                rows={3} 
                name="content"
                onChange={
                 this.handleChange
                }/>
            </Form.Group>
          </Form>
          <div className='d-flex gap-3'>
            <Button variant="info" onClick={this.state.isModifyMode ? this.update:this.write}>작성완료</Button>
            <Button variant="secondary">취소</Button>
          </div>
        </>
       
      )
    }
  }

  export default Write;