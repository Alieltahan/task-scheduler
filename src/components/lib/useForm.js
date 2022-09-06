import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name } = e.target;
    // will get executed if we are selecting category @ Pricing Page (STEP 3).

    setInputs((prevState) => ({
      // copy the existing state
      ...prevState,
      [name]: value,
    }));
  }

  function resetForm() {
    setInputs(initial);
  }

  return {
    inputs,
    handleChange,
    resetForm,
  };
}
