import Input from '../common/Input';
import useForm from '../lib/useForm';
import './SignUp.module.styles.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { useState } from 'react';

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const { handleChange, inputs, resetForm } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
  });
  // TODO >>>
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const respond = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password1
      );
      const { user } = respond;
      console.log(`Success Signed UP!`, user);
      resetForm();
    } catch (err) {
      console.error(`Error--->`, err.message);
    }
    setSubmitting(false);
    console.log(inputs);
  };
  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmit}
        method="POST"
        id="contact-form"
      >
        <fieldset disabled={submitting} aria-busy={submitting}>
          <Input
            label="First name"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChange}
            type="text"
          />
          <Input
            label="Last name"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChange}
            type="text"
          />
          <Input
            label="Email name"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            label="Password"
            name="password1"
            value={inputs.password1}
            onChange={handleChange}
            type="password"
          />
          <Input
            label="Confirm password"
            name="password2"
            value={inputs.password2}
            onChange={handleChange}
            type="password"
          />
          <button type="submit" value="submit" className="form__btn">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
