import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { auth, db } from '../../../Firebase';
import Input from '../../common/Input';
import useForm from '../../lib/useForm';

const AddTask = () => {
  const [submitting, setSubmitting] = useState(false);
  const { handleChange, inputs, resetForm } = useForm({
    title: '',
    description: '',
    priority: 'high',
    dueDate: '',
  });

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const { currentUser } = auth;

      await addDoc(collection(db, 'users', `${currentUser.uid}`, 'tasks'), {
        title: inputs.title,
        description: inputs.description,
        priority: inputs.priority,
        dueDate: inputs.dueDate,
        addedDate: Timestamp.now(),
        status: false,
      });
      toast.success(`Task has been added`);
      resetForm();
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }

    setSubmitting(false);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      method="POST"
      id="contact-form"
    >
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
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
      </fieldset>
    </form>
  );
};

export default AddTask;
