import { Timestamp, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../../Firebase';
import { addDocFn } from '../../common/CRUD-Firebase';
import Input from '../../common/Input';
import useForm from '../../lib/useForm';

const AddTask = () => {
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { handleChange, inputs, resetForm } = useForm({
    title: '',
    description: '',
    priority: 'High',
    dueDate: '',
  });

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const { currentUser } = auth;

    const taskRef = collection(db, 'users', `${currentUser.uid}`, 'tasks');
    const res = await addDocFn(taskRef, {
      title: inputs.title,
      description: inputs.description,
      priority: inputs.priority,
      dueDate: inputs.dueDate,
      addedDate: Timestamp.now(),
      status: false,
    });
    if (res.status === 'success') {
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <>
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="form__btn"
        >
          Add New Task
        </button>
      )}
      {showForm && (
        <form className="form" onSubmit={handleSubmit} method="POST">
          <fieldset disabled={submitting} aria-busy={submitting}>
            <Input
              label="Title"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              type="text"
              required={true}
            />

            <Input
              label="Description"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              type="text"
              required={false}
            />
            <div className="form__group form__select">
              <select
                onChange={handleChange}
                className="form__input"
                name="priority"
                id="priority"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <label className="form__label" htmlFor="priority">
                Please select priority:
              </label>
            </div>

            <Input
              label="Due Date"
              name="dueDate"
              value={inputs.dueDate}
              onChange={handleChange}
              type="date"
              required={true}
            />
            <button type="submit" value="submit" className="form__btn">
              Add Task
            </button>
            <button
              onClick={() => setShowForm(false)}
              type="submit"
              value="cancel"
              className="form__btn"
            >
              Cancel
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default AddTask;
