const errorMessages = {
  required: 'Enter something meaningful!',
  minLength: 'Min length is: ',
  maxLength: 'Max length is: '
}

export const validate = (value, rules) => {
  let isValid = true;
  let message = '';
  value = value.trim();

  if (rules.required) {
    if (value === '') {
      isValid = false;
      message = errorMessages.required;
    }
  }

  if (rules.minLength) {
    if (value.length < rules.minLength) {
      isValid = false;
      message = errorMessages.minLength + rules.minLength;
    }
  }

  if (rules.maxLength) {
    if (value.length > rules.maxLength) {
      isValid = false;
      message = errorMessages.maxLength + rules.maxLength;
    }
  }
  return [isValid, message];
}