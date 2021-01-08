import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, label, className, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    singleValue: (provided: any) => ({
      ...provided,
      color: '#11273a',
    }),
  };

  return (
    <Container className={className}>
      <label>{label}</label>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={customStyles}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
};

export default Select;
