import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    // CheckBox special value for Boolean
    if (type === 'checkbox') {
      value = !inputs.status;
    }
    setInputs((prevState) => ({
      // copy the existing state
      ...prevState,
      [name]: value,
    }));
  }

  function handleEditFormInit(title, description, priority, status, id) {
    setInputs({
      title,
      description,
      priority,
      status,
      id,
    });
  }
  function resetForm() {
    setInputs(initial);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    handleEditFormInit,
  };
}
