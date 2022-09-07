import './Input.module.styles.scss';

const Input = ({ label, name, type, value, onChange, required }) => {
  return (
    <div className="form__group">
      <input
        className="form__input"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={
          name === 'lastName' || name === 'description'
            ? `${label} (optional)`
            : `${label}`
        }
        required={required}
      />
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Input;
