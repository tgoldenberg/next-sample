import React from 'react';

/*
darkBlue: #1B75BC
midBlue: #3AADDF
*/

export default `
  .appbar-alternate {
    background: #FFF !important;
  }
  .action-button {
    -webkit-appearance: button;
    font-weight: 400;
    letter-spacing: 1px;
    border: 1px solid transparent;
    border-color: #3AADDF;
    color: #3AADDF;
    background: white;
    padding: .5rem 1rem;
    font-size: 1rem;
    border-radius: .25rem;
    touch-action: manipulation;
    text-transform: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    display: inline-block;
  }

  .action-button.primary {
    transition: background-image 0.5s ease;
    background: #1B75BC;
    color: white;
    background-image: linear-gradient(to bottom, #3AADDF, #1B75BC);
  }

  .action-button.secondary {
    background: #7FD17F;
    border-color: #2e7d32;
    color: white;
    background-image: -webkit-linear-gradient(top, #7FD17F, #2e7d32);
    background-image: -moz-linear-gradient(top, #7FD17F, #2e7d32);
    background-image: -ms-linear-gradient(top, #7FD17F, #2e7d32);
    background-image: -o-linear-gradient(top, #7FD17F, #2e7d32);
    background-image: linear-gradient(to bottom, #7FD17F, #2e7d32);
  }

  .action-button.primary span, .action-button.secondary span {
    color: white;
  }



  .action-button.primary:hover, .action-button.primary:active, .action-button.primary:focus {
    transition: background-image 0.5s ease;
    background: #135486;
    background-image: linear-gradient(180deg,#1B75BC,#135486);
  }

  .action-button.primary.disabled {
    opacity: 0.6;
    transition: background-image 0.5s ease;
    background: #1B75BC;
    color: white;
    background-image: linear-gradient(to bottom, #3AADDF, #1B75BC);
  }
`;
