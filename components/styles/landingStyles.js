import React from 'react';

export default `
  .splash-lead {
    font-size: 2.8em;
    text-shadow: 0 1px 5px rgba(0,0,0,.25);
    font-weight: 700;
    text-align: center;
    color: white;
    line-height: 1.1;
    margin: 0.5rem 1rem;
  }

  .splash-alt {
    background-color: #eee;
  }

  .splash-mid-container {
    background: url(/static/images/splash_background.png) repeat-x scroll 0 0 #7FD17F;
    padding: 2rem;
  }

  .divider {
    border-bottom: 1px solid #ccc;
    margin-top: 5rem;
  }

  #splash-input {
    font-size: 1.25em;
    height: 52px;
    width: 60%;
    color: #2e7d32;
    max-width: 60rem;
    margin-right: 0;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .splash-header {
    height: calc(100vh - 75px);
    min-height: 554px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(/static/images/splash_background.png) repeat-x scroll 0 0 #7FD17F;
    /*background-attachment: fixed;*/
  }

  .signup-description {
    color: rgba(255,255,255,.8);
    font-size: 1.6em;
    margin: 0 1rem 0.5rem;
    font-weight: 600;
    padding-top: 1rem;
    text-align: center;
  }
  .error-msg-container {
    position: absolute;
    bottom: 0;
  }

  .error-msg {
    font-size: 1.2em;
    padding: 0;
    color: #ffaf99;
    font-weight: 600;
    text-align: center;
  }

  .custom-input.has-error {
    border-bottom-color: #ffaf99;
    border-left-color: #ffaf99;
    border-top-color: #ffaf99;
  }
  .splash-description-h2 {
    color: #2e7d32;
    font-size: 2em;
    margin: 0 1rem 0.5rem;
    font-weight: 600;
    padding-top: 1rem;
    text-align: center;
  }

  .splash-description-p {
    color: #777;
    font-size: 1.4em;
    margin: 0 1rem 0.5rem;
    line-height: 1.4;
    font-weight: 400;
    padding-top: 1rem;
    text-align: center;
  }

  .splash-description-p b {
    color: #555;
  }

  .side-panel-img {
    min-height: 15rem;
    width: 30%;
  }


  .signup-input-paragraph {
    margin: 1rem;
    color: #2e7d32;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signup-age-input {
    height: 35px;
    width: 40px;
    padding: 0.25rem;
    border-radius: 3px;
    margin: 0.5rem;
  }
  .signup-retired-dropdown {
    border-radius: 3px;
    border: 1px solid #7FD17F;
  }
  .signup-cta-container {
    max-width: 500px;
    margin: auto;
  }

  .splash-cta {
    font-size: 16px !important;
    font-weight: 600 !important;
    height: 60px;
    margin-left: 0;
    width: 20rem;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }

  .splash-input-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .landing-paper {
    text-align: center;
    display: inline-block;
    margin: auto;
    width: 180px;
    margin: 1.5rem 2rem;
  }

  .ceo-letter p {
    color: white;
    max-width: 80rem;
    font-size: 1.4em;
    margin: 0 1rem 0.5rem;
    font-weight: 500;
    line-height: 1.4;
    padding-top: 1rem;
    text-align: left;
    padding-left: 1rem;
  }

  .waitlist-title {
    text-align: center;
    width: 100%;
    font-size: 1em;
    letter-spacing: 0.5px;
    font-weight: 400;
  }
  .waitlist-title b {
    font-weight: 400;
  }

  .waitlist-subtitle {
    font-size: 0.9em;
    font-weight: 400;
  }

  .waitlist-description {
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .waitlist-achievements, .waitlist-description {
    flex: 1;
  }

  .referral-link {
    padding: 8px 10px;
    border: 1px solid #333;
    border-radius: 4px;
    width: 80%;
    margin: auto;
    max-width: 500px;
    word-wrap: break-word;
    background: white;
  }
  .splash-description-section {
    flex: 0.75;
    margin: auto;
  }

  @media (max-width: 600px) {
    .splash-mid-container {
      padding: 5px;
      margin: 0;
    }
    .signup-description {
      font-size: 1.2em;
    }
    .splash-description-section {
      flex: 1;
    }
    .splash-description-h2 {
      font-size: 1.4em;
      text-align: left;
    }
    .splash-description-p {
      font-size: 1.1em;
      text-align: left;
    }
    .splash-description-content {
      padding-top: 1rem;
    }
    .flex-container.m-x-1 {
      margin-left: 0px;
      margin-right: 0px;
    }
    .side-panel-img {
      width: 100%;
    }
    .splash-cta {
      width: 95%;
      height: 48px;
    }
    #splash-input {
      width: 85%;
      margin: 1rem 0;
      height: 42px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .splash-input-group {
      flex-wrap: wrap;
    }
    .splash-lead {
      font-size: 1.8em;
    }
    .landing-paper, .landing-paper.lower {
      margin-top: 1rem;
    }
  }
  `;
