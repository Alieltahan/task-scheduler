import Input from '../common/Input';
import useForm from '../lib/useForm';
import './SignUp.module.styles.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const { handleChange, inputs, resetForm } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (inputs.password1 !== inputs.password2) {
      setSubmitting(false);
      return toast.error(`Passwords doesn't match!`);
    }
    try {
      const respond = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password1
      );
      const { user } = respond;
      // Update User Profile Displayname
      updateProfile(auth.currentUser, {
        displayName: inputs.firstName,
      });
      // Create user Doc Data
      await setDoc(doc(db, `users`, `${user.uid}`), {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        uid: user.uid,
      });

      resetForm();
      if (!!user) navigate('/home');
      toast.success(`Sign up completed!`);
    } catch (err) {
      console.error(`Error--->`, err.message);
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
          label="First name"
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
          type="text"
          required={true}
        />
        <Input
          label="Last name"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
          type="text"
          required={false}
        />
        <Input
          label="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          type="email"
          required={true}
        />
        <Input
          label="Password"
          name="password1"
          value={inputs.password1}
          onChange={handleChange}
          type="password"
          required={true}
        />
        <Input
          label="Confirm password"
          name="password2"
          value={inputs.password2}
          onChange={handleChange}
          type="password"
          required={true}
        />
        <button
          type="submit"
          value="submit"
          className="form__btn"
          disabled={submitting}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
};

export default Signup;
