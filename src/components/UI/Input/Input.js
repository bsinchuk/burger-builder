import React from 'react';

import styles from './Input.css';

const input = (props) => {
  let errorMessage = null;
  const classes = [styles['input__element']];
  if (props.invalid && props.validated && props.touched) {
    classes.push(styles['input__element--invalid']);
    errorMessage = <p 
      className={styles['input__error']}>
        {props.errorMessage}
    </p>
  }

  let inputEl = null;
  switch (props.elementType) {
    case 'textarea':
      inputEl = <textarea 
        {...props.elementConfig}
        className={classes.join(' ')}
        value={props.value}
        onChange={props.changed} />;
      break;
    case 'select':
      inputEl = (
        <select 
          className={classes.join(' ')} 
          value={props.value}
          onChange={props.changed} >
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      )
      break;
    default:
      inputEl = <input 
        {...props.elementConfig} 
        className={classes.join(' ')}
        value={props.value}
        onChange={props.changed} />
  }

  return (
    <div className={styles.input}>
      <label className={styles['input__label']}>{props.label}</label>
      {inputEl}
      {errorMessage}
    </div>
  )
}

export default input;
