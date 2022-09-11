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

const Tasks = () => {
  const { currentUser } = auth;
  const [tasks, setTasks] = useState([]);
  const { inputs, handleChange, resetForm } = useForm({
    date: '',
    priority: '',
    status: '',
    search: '',
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
    setTasks(tasksCopy);
    const tasksRef = doc(db, 'users', currentUser?.uid, 'tasks', taskId);
    const res = await DelDocFn(tasksRef);
    if (res.status === 'error') {
      setTasks(tasksCopyOriginal);
    }
  };
  let filteredTasks = [...tasks];
  const handleFilter = (inputs, reset) => {
    const { status, priority, date } = inputs;

    if (reset) return (filteredTasks = [...tasks]);
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
  filteredTasks =
    inputs.status || inputs.priority || inputs.date
      ? handleFilter(inputs)
      : [...tasks];

  const handleSorting = (order) => {
    const tasksCopy = [...tasks];
    tasksCopy.sort((a, b) => {
      return order
        ? dateToNumber(a.dueDate) - dateToNumber(b.dueDate)
        : dateToNumber(b.dueDate) - dateToNumber(a.dueDate);
    });
    setTasks(tasksCopy);
  };
  const handleReset = () => {
    resetForm();
    handleFilter(inputs, true);
  };
  return (
    <>
      <FilterTasks
        onSort={handleSorting}
        onFilter={handleFilter}
        onReset={handleReset}
        inputs={inputs}
        onChange={handleChange}
      />
      <TasksContainer>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Added date</th>
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
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>
                    Completed:
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
                  <td>
                    {new Date(task.addedDate.seconds * 1000).toDateString()}
                  </td>
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
    </>
  );
};

export default Tasks;
