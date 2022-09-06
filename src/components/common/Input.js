import './Input.module.styles.scss';

const Input = ({ label, name, type, value, onChange }) => {
  return (
    <div className="container">
      <div className="form__group">
        <input
          className="form__input"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={name === 'lastName' ? `${label} (optional)` : `${label}`}
          required={name !== 'lastName'}
        />
        <label className="form__label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
