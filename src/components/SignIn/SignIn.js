import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import Input from '../common/Input';
import useForm from '../lib/useForm';

const Signin = () => {
  const [submitting, setSubmitting] = useState(false);
  const { handleChange, inputs, resetForm } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      toast.success(`Login success`);
      resetForm();
      if (user) navigate('/home');
    } catch (err) {
      console.error(`Error: Sign in --->`, err.message);
      toast.error(err.message);
    }
    setSubmitting(false);
  };
  return (
    <>
      <div className="container">
        <form
          className="form"
          onSubmit={handleSubmit}
          method="POST"
          id="contact-form"
        >
          <fieldset disabled={submitting} aria-busy={submitting}>
            <Input
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              type="email"
            />

            <Input
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              type="password"
            />
            <button type="submit" value="submit" className="form__btn">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Signin;
