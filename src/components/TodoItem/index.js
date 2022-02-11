import {MdDeleteForever} from 'react-icons/md'
import './index.css'

const TodoItem = props => {
  const {todoItemContent, onClickDeleteTodo} = props

  const onClickDelete = () => {
    onClickDeleteTodo(todoItemContent)
  }

  return (
    <li className="todo-list-item">
      <p className="todo-para">{todoItemContent}</p>
      <button type="button" className="todo-delete" onClick={onClickDelete}>
        <MdDeleteForever size={20} color="#4ce0d2" />
      </button>
    </li>
  )
}

export default TodoItem
