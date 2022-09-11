import arrowUp from '../../../media/icons/arrow-up2.svg';
import arrowDown from '../../../media/icons/arrow-down2.svg';
import { useState } from 'react';
import useForm from '../../../lib/useForm';
import './Filter.styles.scss';
const FilterTasks = ({ tasks, onSort, onFilter }) => {
  const { inputs, handleChange } = useForm();
  const [sort, setSort] = useState(true);
  const handleSort = () => {
    onSort(sort);
    setSort(!sort);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ inputs });
    onFilter(inputs);
  };
  return (
    <>
      <div className="filter__container">
        <form className="filter__form" onSubmit={handleSubmit}>
          <fieldset>
            <legend> Filter Tasks by: </legend>
            {/* Task Status */}
            <div>
              <label className="filter__form__label">Status: </label>
              <input
                className="filter__form_input"
                onChange={handleChange}
                name="status"
                type="radio"
                value={true}
              />
              <label htmlFor="done">Completed</label>
              <input
                className="filter__form_input"
                onChange={handleChange}
                name="status"
                type="radio"
                value={false}
              />
              <label htmlFor="pending">Pending</label>
            </div>
            {/* Priority radio filter */}
            <div>
              <label className="filter__form__label">Priority: </label>
              <input
                className="filter__form_input"
                onChange={handleChange}
                name="priority"
                type="radio"
                value="High"
                id="high"
              />
              <label htmlFor="high">High</label>
              <input
                className="filter__form_input"
                onChange={handleChange}
                name="priority"
                type="radio"
                value="Medium"
                id="medium"
              />
              <label htmlFor="medium">Medium</label>
              <input
                className="filter__form_input"
                onChange={handleChange}
                name="priority"
                type="radio"
                value="Low"
                id="low"
              />
              <label htmlFor="low">Low</label>
            </div>
            {/* Filter by Certain Date*/}
            <label className="filter__form__label" htmlFor="date">
              Filter by certain date:{' '}
            </label>
            <input onChange={handleChange} type="date" name="date" id="date" />
            <br />
            <div className="filter__form__submit-container">
              <button
                className="form__btn filter__form__submit"
                type="submit"
                value="Submit"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
        <div className="filter__form__sortByDate">
          <span>Sort by due date: </span>
          <button
            type="button"
            className="filter__form__img-bg"
            onClick={handleSort}
          >
            <img
              className="filter__form__img"
              src={sort ? arrowUp : arrowDown}
              alt="arrow"
            />{' '}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterTasks;
