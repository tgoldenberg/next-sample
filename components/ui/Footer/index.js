import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <section className="footer">
        <div className="footer-section">
          <p>Want to work with us?</p>
          <a href="mailto:hiring@commandiv.com">hiring@commandiv.com</a>
        </div>
        <div className="footer-section">
          <p>Commandiv Financial Inc.</p>
          <p>43 W 23rd St, Fl 6, NYC, NY 10010 </p>
          <p>© 2017</p>
        </div>
        <div className="footer-section">
          <p>Need to contact us?</p>
          <a href="mailto:hello@commandiv.com">hello@commandiv.com</a>
        </div>
      </section>
    );
  }
}
