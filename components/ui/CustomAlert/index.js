import React from 'react';
import ActionButton from '../ActionButton';
import { Dialog } from 'material-ui';
import Header from '../ContentHeader';
// import AlternateHeader from 'components/layout/AlternateHeader';
import Colors from '../../styles/colors';

const styles = {
  headerUnderline: { height: '1rem', backgroundColor: Colors.brandLight },
  buttonText: { fontWeight: '300', paddingRight: '2rem' },
};

const CustomAlert = (props) => {
  const {
    handleClose,
    open,
    title,
    description,
    errorMessages,
    buttonLabel,
    hideButtons,
    contentClassName,
    bodyStyle,
    className,
    overlayClassName,
    bodyClassName,
    hasAlternateHeader,
  } = props;
  const actions = hideButtons ? [] : [
    <ActionButton
      styles={styles.buttonText}
      label={buttonLabel}
      primary={true}
      onTouchTap={handleClose}
    />,
  ];
  return (
    <Dialog
      modal={false}
      open={open}
      contentClassName={contentClassName}
      contentStyle={{ height: '100%' }}
      className={className}
      hasAlternateHeader={hasAlternateHeader}
      bodyClassName={bodyClassName}
      bodyStyle={bodyStyle}
      overlayClassName={overlayClassName}
      onRequestClose={handleClose}
      contentStyle={{ padding: 0 }}
      style={{ padding: 0 }}
      bodyStyle={{ padding: 0 }}
      actionsContainerClassName="alert-actions"
      actions={actions}
    >
      <div className="alert-container">
        <Header handleClose={handleClose} />
        {!hasAlternateHeader && <div style={styles.headerUnderline} />}
        <section className="alert-content">
          <h2>{title}</h2>
        </section>
        <section className="alert-description">
          {typeof description === 'string' ?
            <p>{description}</p>
            :
            <div>{description}</div>
          }
          <br />
          {errorMessages.map((msg, idx) => (
            <p key={idx}>* {msg}</p>
          ))}
        </section>
      </div>
    </Dialog>
  );
};

export default CustomAlert;
