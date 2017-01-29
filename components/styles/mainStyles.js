import React from 'react';

/*
brand: green700, // #388e3c
brandDark: green800, // #2e7d32
brandDarker: green900, // #1b5e20
brandLight: green300, // #7FD17F
darkBlue: blue900, // #1B75BC
midBlue: blue700, // #3AADDF
lightBlack 'rgba(0, 0, 0, 0.54)'
*/

export default `
    @font-face {
      font-family: EJRoundedBook;
      src: url(/static/fonts/EJRoundedBook.otf);
    }

    body, div, p, span {
      margin: 0;
      padding: 0;
      font-family: Roboto, sans-serif;
    }

    * {
      /*height: 100%;*/
      /*width: 100%;*/
      font-family: EJRoundedBook;
      margin: 0;
      padding: 0;
      /*color: rgba(0, 0, 0, 0.54);*/
    }

    body, html {
      overflow-x: hidden;
    }

    h1, h2, h3, h4 {
      font-weight: 400;
    }

    h2, h3 {
      letter-spacing: 1px;
    }

    h2.light, h3.light {
      color: #7FD17F;
    }

    h3 {

    }

    p {
      font-weight: 300;
    }

    a {
      text-decoration: none;
    }

    .flex-column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .flex-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .flex-container-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .flex-container-spaced {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .align-start: {
      align-items: flex-start;
    }

    .p-t-1 {
      padding-top: 1rem;
    }

    .p-b-1 {
      padding-bottom: 1rem;
    }

    .p-x-1 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    p-y-1 {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .m-t-0 {
      margin-top: 0 !important;
    }

    .m-l-0 {
      margin-left: 0 !important;
    }

    .m-l-1 {
      margin-left: 1rem;
    }

    .m-r-1 {
      margin-right: 1rem;
    }

    .m-x-1 {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .m-y-1 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .m-a-1 {
      margin: 1rem;
    }

    .m-t-1 {
      margin-top: 1rem;
    }

    .m-t-2 {
      margin-top: 2rem;
    }

    .m-b-1 {
      margin-bottom: 1rem;
    }

    .custom-input {
      border: 1px solid #7FD17F;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      color: #7FD17F;
      line-height: 1.8rem;
      font-size: 1rem;
      padding: 0.2rem 1rem;
      border-radius: 3px;
      margin: 0.25rem 0.5rem;
      min-width: 100px;
    }

    .input-flex-container {
      display: flex;
      justify-content: stretch;
      align-items: center;
    }

    @media (max-width: 600px) {
      .input-flex-container {
        flex-wrap: wrap;
      }
    }

    .overflow-text {
      overflow-x: auto;
    }

    .custom-radio-input {
      display: flex;
      align-items: center;
      color: #388e3c;
    }

    .custom-radio-input section {
      display: flex;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-right: 0.5rem;
      /*margin-top: 0.5rem;*/
      align-items: center;
      cursor: pointer;
      min-height: 110px;
    }
    .custom-radio-input section.selected {
      background: rgb(220, 239, 220);
      border-radius: 3px;
    }

    .custom-radio-input section h3 {
      color: rgba(0, 0, 0, 0.54);
    }

    .custom-radio-input section.selected h3 {
      color: #7FD17F;
    }

    @media (max-width: 600px) {
      .custom-radio-input {
        min-height: 40px;
      }
      .custom-radio-input section {
        padding-right: 0;
        min-height: 40px;
      }
    }

    @media (max-width: 600px) {
      .hidden-sm-down {
        display: none !important;
      }
    }

    @media (min-width: 601px) {
      .hidden-sm-up {
        display: none !important;
      }
    }

    .error {
      color: #FF5526;
    }

    .react-select-input {
      width: 100%;
    }
    /*#plaid-link-container .overlay-view {
      opacity: 0.9;
      background: black;
    }*/

    input:hover {
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    }
    input:focus {
      outline: none;
      border-color: #7FD17F;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
    }

    .lead {
      color: #2e7d32;
    }
`
