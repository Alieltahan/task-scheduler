import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../../../Firebase';
import { DelDocFn, UpdateDocFn } from '../../common/CRUD-Firebase';
import Input from '../../common/Input';
import useForm from '../../lib/useForm';
import Loader from '../../Loader/loader';
import { ToggleContainer } from './EditTask.styles';

const EditTask = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const taskId = useLocation().pathname.slice(6);
  const navigate = useNavigate();
  const { currentUser } = auth;

  const { handleChange, inputs, handleEditFormInit } = useForm();
  const fetch = async () => {
    const taskRef = doc(db, 'users', currentUser.uid, 'tasks', taskId);
    try {
      const result = await getDoc(taskRef);
      handleEditFormInit(
        result.data().title,
        result.data().description,
        result.data().priority,
        result.data().status,
        result.id
      );
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetch();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    const taskRef = doc(db, 'users', currentUser.uid, 'tasks', inputs.id);
    const res = await UpdateDocFn(taskRef, inputs);
    if (res.status === 'success') navigate('/home');
  };

  const handleDelete = async (id) => {
    const taskRef = doc(db, 'users', currentUser.uid, 'tasks', inputs.id);
    const res = await DelDocFn(taskRef);
    if (res.status === 'failed') return;
    else {
      navigate('/home');
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };
  if (loading) return <Loader />;
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
          value={inputs.title || ''}
          onChange={handleChange}
          type="text"
          required={true}
        />

        <Input
          label="Description"
          name="description"
          value={inputs.description || ''}
          onChange={handleChange}
          type="text"
          required={false}
        />
        <ToggleContainer>
          <label
            className="form__label-check"
            onClick={() => console.log(`CLICKED Check--LABEL`)}
            htmlFor={inputs.id}
          >
            Completed:
          </label>
          <div className="button r" id="button-2">
            <input
              type="checkbox"
              checked={!inputs.status}
              onChange={handleChange}
              className="checkbox"
              name="status"
              id={inputs.id}
            />
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
        </ToggleContainer>
        <br />

        <div className="form__group form__select">
          <select
            value={inputs.priority}
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

        <button type="submit" value="submit" className="form__btn">
          Save
        </button>
        <button
          onClick={handleCancel}
          type="submit"
          value="submit"
          className="form__btn"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="form__btn form__btn-del"
          id="del"
        >
          Delete
        </button>
      </fieldset>
    </form>
  );
};

export default EditTask;
