import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../Firebase';
import { TasksContainer } from './Tasks.styles';
import deleteIcon from '../../media/icons/delete.svg';
import editIcon from '../../media/icons/edit.svg';
import { Link } from 'react-router-dom';
import { DelDocFn, UpdateDocFn } from '../../common/CRUD-Firebase';
import FilterTasks from './Filter/Filter';
import { dateToNumber, dateToString } from '../../lib/timeFormating';
import useForm from '../../lib/useForm';
import SearchInput from './SearchInput/SearchInput';

const Tasks = () => {
  const { currentUser } = auth;
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { inputs, handleChange, resetForm } = useForm({
    date: '',
    priority: '',
    status: '',
  });

  useEffect(() => {
    const tasksRef = collection(db, 'users', currentUser?.uid, 'tasks');
    // Real time database query which gets updated once any change happens to the Tasks Collection.
    onSnapshot(tasksRef, (snapshot) => {
      let tasksArr = [];
      snapshot.docs.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArr);
    });
  }, [currentUser]);
  // Guard Clause for sign out
  if (currentUser === null) return;

  /**
   * @param {Event} e Input Checkbox event
   * function to update Tasks Status (Completed: Yes/No)
   */
  const handleChangeStatus = async (e) => {
    const { id } = e.target;
    const tasksCopyOriginal = [...tasks];
    const tasksCopy = [...tasks];
    // Get Task's Index
    const selectedTaskIndex = tasksCopy.findIndex((task) => task.id === id);
    const selectedTask = { ...tasksCopy[selectedTaskIndex] };
    tasksCopy[selectedTaskIndex] = {
      ...selectedTask,
      status: !selectedTask.status,
    };
    // Optimistic update for Tasks
    setTasks(tasksCopy);
    const taskRef = doc(db, 'users', currentUser?.uid, 'tasks', id);
    const res = await UpdateDocFn(taskRef, { status: !selectedTask.status });
    // UI Roll back if Server Failed to update.
    if (res.status === 'error') {
      setTasks(tasksCopyOriginal);
    }
  };

  /**
   * @param {String} taskId Task ID
   * @Fn to delete a Task.
   */
  const handleDelete = async (taskId) => {
    const tasksCopyOriginal = [...tasks];
    const tasksCopy = tasks.filter((t) => t.id !== taskId);
    // Optimistic update for Tasks
    setTasks(tasksCopy);
    const tasksRef = doc(db, 'users', currentUser?.uid, 'tasks', taskId);
    const res = await DelDocFn(tasksRef);
    // UI Roll back if Server Failed to update.
    if (res.status === 'error') {
      setTasks(tasksCopyOriginal);
    }
  };

  let filteredTasks = [...tasks];

  /**
   * @param {Object} inputs
   * @param {String} inputs.status
   * @param {String} inputs.priority
   * @param {Date} inputs.date
   * @returns Array of Filtered Tasks based on inputs.
   */
  const handleFilter = (inputs) => {
    const { status, priority, date } = inputs;
    if (date) {
      filteredTasks = filteredTasks.filter((t) => {
        return dateToNumber(t.dueDate) === dateToNumber(date);
      });
    }
    if (status) {
      filteredTasks = filteredTasks.filter((t) => String(t.status) === status);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter((t) => t.priority === priority);
    }
    return filteredTasks;
  };

  /**
   * @param {String} input user Input
   * @returns update searchInput state.
   */
  const handleSearch = (input) => {
    setSearchInput(input);
  };
  // Filtering the tasks based on filter inputs
  filteredTasks =
    inputs.status || inputs.priority || inputs.date
      ? handleFilter(inputs)
      : [...tasks];

  // If there is search input, reset the filter inpust & update the tasks list.
  if (searchInput?.length > 0) {
    if (inputs.status || inputs.priority || inputs.date) resetForm();
    filteredTasks = filteredTasks.filter((t) =>
      `${t.title.toLowerCase()}`.includes(searchInput.toLowerCase())
    );
  }
  /**
   * @param {Boolean} order true/false
   * @returns asecnding / descending tasks based on Due date
   */
  const handleSorting = (order) => {
    const tasksCopy = [...tasks];
    tasksCopy.sort((a, b) => {
      return order
        ? dateToNumber(a.dueDate) - dateToNumber(b.dueDate)
        : dateToNumber(b.dueDate) - dateToNumber(a.dueDate);
    });
    setTasks(tasksCopy);
  };
  /**
   * @Fn to reset the filter form & search input.
   */
  const handleReset = () => {
    resetForm();
    setSearchInput('');
  };

  /**
   * @returns Table of tasks
   */
  let renderTasks = () => {
    return (
      <TasksContainer>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Completed</th>
              <th>Created on</th>
              <th>Due date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks?.map((task) => {
              return (
                <tr key={task.id}>
                  <td> {task.title}</td>
                  <td>{task.description === '' ? '-' : task.description}</td>
                  <td>{task.priority}</td>
                  <td>
                    <div className="button r" id="button-2">
                      <input
                        type="checkbox"
                        checked={!task.status}
                        onChange={handleChangeStatus}
                        className="checkbox"
                        id={task.id}
                      />
                      <div className="knobs"></div>
                      <div className="layer"></div>
                    </div>
                  </td>
                  <td>{dateToString(task.addedDate.seconds * 1000)}</td>
                  <td>{dateToString(task.dueDate)}</td>
                  <td>
                    <Link to={`/task/${task.id}`}>
                      <img className="edit_icon" src={editIcon} alt="edit" />
                    </Link>
                  </td>
                  <td>
                    <img
                      onClick={() => handleDelete(task.id)}
                      className="delete_icon"
                      src={deleteIcon}
                      alt="delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TasksContainer>
    );
  };

  // If no tasks added yet.
  if (tasks.length === 0) {
    renderTasks = () => <h1>There is no tasks added yet. Start now!</h1>;
  }

  // Conditional rendering if there is no result for search/filter tasks.
  if (filteredTasks.length === 0 && tasks.length > 0) {
    renderTasks = () => (
      <h1>There is no result for the filter/search criteria</h1>
    );
  }
  /**
   * @returns Card of Tasks for Small Screen
   */
  const renderTasksAsCards = () => {
    return (
      <TasksContainer>
        {filteredTasks.map((task) => {
          return (
            <div className="container__small" key={task.id}>
              <h1>
                <span className="card__label">Title:</span>
                {task.title}
              </h1>
              <div className="card__value">
                <span className="card__label">Description:</span>
                {task.description === '' ? '-' : task.description}
              </div>
              <div className="card__value">
                <span className="card__label">Priority:</span>
                {task.priority}
              </div>
              <div className="card__status">
                <span className="card__label">Completed:</span>
                <div className="button r" id="button-2">
                  <input
                    type="checkbox"
                    checked={!task.status}
                    onChange={handleChangeStatus}
                    className="checkbox"
                    id={task.id}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>

              <div className="card__value">
                <span className="card__label"> Created on: </span>
                {dateToString(task.addedDate.seconds * 1000)}
              </div>
              <div className="card__value">
                <span className="card__label">Due date:</span>
                {dateToString(task.dueDate)}
              </div>
              <div className="card__edit-del">
                <div className="card__icon-label">
                  <span className="card__label"> Edit: </span>
                  <Link to={`/task/${task.id}`}>
                    <img className="edit_icon" src={editIcon} alt="edit" />
                  </Link>
                </div>
                <div className="card__icon-label">
                  <span className="card__label"> Delete: </span>
                  <img
                    onClick={() => handleDelete(task.id)}
                    className="delete_icon"
                    src={deleteIcon}
                    alt="delete"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </TasksContainer>
    );
  };

  /**
   * @param {Event} e getting the event of Filter form to change Inputs values
   */
  const handleFilterChange = (e) => {
    if (searchInput.length > 0) setSearchInput('');
    handleChange(e);
  };

  return (
    <>
      <FilterTasks
        onSort={handleSorting}
        onFilter={handleFilter}
        onReset={handleReset}
        inputs={inputs}
        onChange={handleFilterChange}
      />
      <SearchInput onInput={searchInput} onSearch={handleSearch} />

      {renderTasks()}
      {renderTasksAsCards()}
    </>
  );
};

export default Tasks;
