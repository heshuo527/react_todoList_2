import React, { useState, useEffect } from 'react';
import { Button, Input, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import './App.css';

interface TodoType {
  key: number
  id: number
  time: number
  content: string
  done: boolean
}

function App() {

  const [inpValue, setInpValue] = useState('')
  const [todoList, setTodoList] = useState<Array<TodoType>>([])

  const getTime = (time: number | Date) => {
    const d = new Date(time)
    const year = d.getFullYear()
    const mont = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    return year + '-' + mont + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }

  const saveTodoList = (arrTodoList: Array<TodoType>) => {
    localStorage.todoList = JSON.stringify(arrTodoList)
  }

  const loadTodoInit = () => {
    const todoListStr = localStorage.getItem('todoList')
    if (todoListStr) {
      setTodoList(JSON.parse(todoListStr))
    }
  }

  useEffect(() => {
    loadTodoInit()
  })

  const columns: ColumnsType<TodoType> = [
    {
      title: '事项',
      dataIndex: 'name',
      key: 'name',
      render: (_, todo) => {
        return (
          <>
            <div className={todo.done ? 'antd-done' : 'done'}>{todo.content}</div>
          </>
        )
      }
    },
    {
      title: '时间',
      dataIndex: 'address',
      key: 'address',
      render: (_, todo) => {
        return (
          <span className='antd-time'>{getTime(todo.time)}</span>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, todo) => (
        <>
          <Button onClick={() => todoDone(todo.id)} type='primary'>完成</Button>
          <Button onClick={() => todoDelete(todo.id)} type='primary' danger>删除</Button>
        </>
      ),
    },
  ];

  /**
   * 增加一个todoList
   */
  const addTodo = () => {
    if (inpValue === '') {
      message.error('请输入内容')
      return
    }
    const time: number = new Date().getTime()
    const todo = {
      key: time,
      id: time,
      time: time,
      content: inpValue,
      done: false
    }
    message.success('添加成功')
    setTodoList([...todoList, todo])
    saveTodoList([...todoList, todo])
  }

  /**
   * 更新一个todoList
   */
  const todoDone = (Id: number | Date) => {
    const todos = [...todoList]
    todos.forEach(todo => {
      if (todo.id === Id) {
        if (todo.done === false) {
          message.warning('已完成')
          todo.done = true
        } else {
          todo.done = false
        }
      }
    })
    setTodoList(todos)
    saveTodoList(todos)
  }
  /**
   * 删除一个todoList
   */
  const todoDelete = (Id: number | Date) => {
    const todos = [...todoList]
    const newTodo = todos.filter(todo => todo.id !== Id)
    message.error('已删除')
    setTodoList(newTodo)
    saveTodoList(newTodo)
  }

  return (
    <>
      <Input className='antd-inp' placeholder="请输入内容" onChange={(e) => setInpValue(e.target.value)} />
      <Button onClick={() => addTodo()} type="primary">addTodo</Button>
      {
        <Table columns={columns} dataSource={todoList} />
      }
    </>
  );
}

export default App;
