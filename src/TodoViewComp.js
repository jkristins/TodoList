import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faCheck,
  faCircleMinus,
  faTrashCanArrowUp,
  faFloppyDisk,
  faArrowRotateBack,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const arrayObjects = [
  {
    id: 1,
    text: "Apliet puķes un kaktus",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 2,
    text: "Notīrīt palodzes",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 3,
    text: "Izpildīt mājasdarbus",
    completed: false,
    deleted: false,
    isEdit: false,
  },
  {
    id: 4,
    text: "Uzprogrammēt aplikāciju",
    completed: false,
    deleted: false,
    isEdit: false,
  },
];

export default function TodoViewComp() {
  const [todoList, setTodoList] = useState(arrayObjects);
  const [viewType, setViewType] = useState(0);
  const [editText, setEditText] = useState("");
  const [inputText, setInputText] = useState("");

  function RemoveAll() {
    setTodoList([]);
  }

  function RemoveDeleted() {
    let newTodoList = todoList.filter((todo) => todo.deleted === false);
    setTodoList(newTodoList);
  }

  function RemoveCompleted() {
    let newTodoList = todoList.filter((todo) => todo.completed === false);
    setTodoList(newTodoList);
  }

  function completeTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function delteTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function restoreTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: false, completed: false, isEdit: false };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function changeViewType(viewType) {
    setViewType(viewType);
  }

  function editTodoItem(itemId) {
    setEditText("");

    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        setEditText(todo.text);
        return { ...todo, isEdit: true };
      } else {
        return { ...todo, isEdit: false };
      }
    });

    setTodoList(newTodoList);
  }

  function saveTodoItem(itemId) {
    if (editText.length === 0) return;

    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdit: false, text: editText };
      }
      return todo;
    });

    setTodoList(newTodoList);
    setEditText("");
  }

  function getNewId() {
    let maxId = 0;
    todoList.map((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    return maxId + 1;
  }

  function addTodoItem() {
    if (inputText.length === 0) return;

    let todoId = getNewId();

    let newTodoItem = {
      id: todoId,
      text: inputText,
      completed: false,
      deleted: false,
      isEdit: false,
    };

    const items = todoList;
    setTodoList([...items, newTodoItem]);
    setInputText("");
  }

  let newList = [];
  if (viewType === 0) {
    newList = todoList;
  } else if (viewType === 1) {
    newList = todoList.filter((todo) => todo.deleted === true);
  } else if (viewType === 2) {
    newList = todoList.filter((todo) => todo.completed === true);
  } else if (viewType === 3) {
    newList = todoList.filter(
      (todo) => todo.completed === false && todo.deleted === false
    );
  }

  return (
    <div>
      <div className="RowStyle">
        <button className="BtnStyle2" onClick={() => changeViewType(0)}>
          Attēlot visus
        </button>
        <button className="BtnStyle2" onClick={() => changeViewType(1)}>
          Attēlot dzēstos
        </button>
        <button className="BtnStyle2" onClick={() => changeViewType(2)}>
          Attēlot pabeigtos
        </button>
        <button className="BtnStyle2" onClick={() => changeViewType(3)}>
          Attēlot aktīvos
        </button>
      </div>
      <div className="RowInputStyle">
        <div className="RowInputStyle1st">
          <input
            className="InputText"
            type="text"
            value={inputText}
            placeholder="Pievienot darbiņu"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="ButtonStyle"
            onClick={addTodoItem}
            title="Pievienot"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </div>
        <div className="RowInputStyle2st">
          <button
            className="ButtonStyle"
            onClick={RemoveAll}
            title="Izdzēst visus ierakstus"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button
            className="ButtonStyle"
            onClick={RemoveDeleted}
            title="Noņemt dzēstos"
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
          <button
            className="ButtonStyle"
            onClick={RemoveCompleted}
            title="Dzēst pabeigtos"
          >
            <FontAwesomeIcon icon={faTrashCanArrowUp} />
          </button>
        </div>
      </div>
      <div className="RowStyle">
        {newList.map((item) => {
          let spanClassName = "TodoItemText";
          if (item.completed) spanClassName = "TodoItemTextCompleted";
          if (item.deleted) spanClassName = "TodoItemTextDeleted";

          return (
            <div key={item.id} className="RowItemStyle">
              <div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <div className="RowItemStyleText">
                {!item.isEdit && (
                  <span className={spanClassName}>{item.text}</span>
                )}
                {item.isEdit && (
                  <input
                    type="text"
                    className="RowItemStyleInput"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                )}
              </div>
              <div>
                {!item.completed && !item.deleted && !item.isEdit && (
                  <>
                    <button
                      onClick={() => completeTodoItem(item.id)}
                      title="Pabeigt"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => editTodoItem(item.id)} title="Labot">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      onClick={() => delteTodoItem(item.id)}
                      title="Dzēst"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </>
                )}
                {item.isEdit && (
                  <button
                    onClick={() => saveTodoItem(item.id)}
                    title="Saglabāt"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                )}
                {(item.completed || item.deleted || item.isEdit) && (
                  <button
                    onClick={() => restoreTodoItem(item.id)}
                    title="Atjaunot"
                  >
                    <FontAwesomeIcon icon={faArrowRotateBack} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
