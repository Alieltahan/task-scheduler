import arrowUp from '../../../media/icons/arrow-up2.svg';
import arrowDown from '../../../media/icons/arrow-down2.svg';
import { useState } from 'react';
import './Filter.styles.scss';
const FilterTasks = ({ onSort, onFilter, onReset, inputs, onChange }) => {
  const [sort, setSort] = useState(true);
  const handleSort = () => {
    onSort(sort);
    setSort(!sort);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(inputs);
  };

  const handleReset = () => {
    onReset();
  };
  return (
    <>
      <div className="filter__container">
        <form className="filter__form" onSubmit={handleSubmit}>
          <fieldset>
            <legend> Filter Tasks by: </legend>
            {/* Task Status */}
            <div className="filter__form__row">
              <label className="filter__form__label">Status: </label>
              <span>
                <input
                  className="filter__form_input"
                  onChange={onChange}
                  name="status"
                  type="radio"
                  checked={inputs?.status === 'true'}
                  value={true}
                />
                <label htmlFor="done">Completed</label>
              </span>
              <span>
                <input
                  className="filter__form_input"
                  onChange={onChange}
                  name="status"
                  type="radio"
                  checked={inputs?.status === 'false'}
                  value={false}
                />
                <label htmlFor="pending">Pending</label>
              </span>
            </div>
            <br />
            {/* Priority radio filter */}
            <div className="filter__form__row">
              <label className="filter__form__label">Priority: </label>
              <span>
                <input
                  className="filter__form_input"
                  onChange={onChange}
                  name="priority"
                  type="radio"
                  value="High"
                  checked={inputs?.priority === 'High'}
                  id="high"
                />
                <label htmlFor="high">High</label>
              </span>
              <span>
                <input
                  className="filter__form_input"
                  onChange={onChange}
                  name="priority"
                  type="radio"
                  value="Medium"
                  checked={inputs?.priority === 'Medium'}
                  id="medium"
                />
                <label htmlFor="medium">Medium</label>
              </span>
              <span>
                <input
                  className="filter__form_input"
                  onChange={onChange}
                  name="priority"
                  type="radio"
                  value="Low"
                  checked={inputs?.priority === 'Low'}
                  id="low"
                />
                <label htmlFor="low">Low</label>
              </span>
            </div>
            {/* Filter by Certain Date*/}
            <br />
            <label className="filter__form__label" htmlFor="date">
              Certain date:{' '}
            </label>
            <input
              onChange={onChange}
              type="date"
              name="date"
              id="date"
              value={inputs?.date}
            />
            <br />
            <br />

            <div className="filter__form__submit-container">
              <button
                className="form__btn filter__form__submit"
                type="button"
                value="reset"
                onClick={handleReset}
              >
                Reset
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
