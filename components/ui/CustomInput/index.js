import React, { Component } from 'react';

export default class CustomInput extends Component {
  componentDidMount() {
    this.input.value = this.props.value;
  }
  render() {
    const {
      placeholder,
      fullWidth,
      maxWidth,
      minWidth,
      handleChange,
      type,
      autoFocus,
      secure,
      autoComplete,
      className,
      name,
      id,
    } = this.props;
    const styles = {};
    if (fullWidth) {
      styles.width = '100%';
    }
    if (typeof maxWidth === 'number') {
      styles.maxWidth = maxWidth;
    }
    if (typeof minWidth === 'number') {
      styles.minWidth = minWidth;
    }
    return (
      <input
        id={id || ''}
        ref={el => this.input = el}
        type={type || 'text'}
        autoFocus={!!autoFocus}
        style={styles}
        autoComplete={autoComplete}
        onChange={handleChange}
        name={name || ''}
        placeholder={placeholder}
        className={`custom-input ${className}`}
      />
    );
  }
}
