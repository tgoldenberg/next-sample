import React from 'react';

const ActionButton = (props) => {
  const {
    primary,
    disabled,
    secondary,
    label,
    rightIcon,
    leftIcon,
    onTouchTap,
    styles,
    hideMobile,
    alignLeft,
    className,
  } = props;
  const buttonClassName = `action-button ${primary && 'primary'} ${hideMobile && 'hidden-sm-down'} ${secondary && 'secondary'} ${className} ${disabled ? 'disabled' : ''}`;
  return (
    <button
      disabled={disabled === 'undefined' ? false : disabled}
      className={buttonClassName}
      onTouchTap={onTouchTap}
      style={styles}
    >
      <span className={alignLeft ? 'flex-container-spaced' : 'flex-container'}>
        {leftIcon}
        {label}
        {rightIcon}
      </span>
    </button>
  );
}

ActionButton.defaultProps = {
  styles: {},
};

export default ActionButton;
