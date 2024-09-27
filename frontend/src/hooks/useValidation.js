import { useState } from "react";

const useValidation = (validationRules) => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors = validationRules(values);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
