import { useState, ChangeEvent } from 'react';

function useInput(initialValue: string = '') {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => setValue('');

  return {
    value,
    onChange: handleChange,
    reset,
  };
}

export default useInput;
