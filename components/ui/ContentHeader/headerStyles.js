import React from 'react';

export default `
  .logo-title {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
  }
  .appbar-logo {
    padding-top: 10px;
  }

  @media (max-width: 600px) {
    .logo-title {
      font-weight: 300;
    }
    .appbar {
      box-shadow: none !important;
    }
  }

  .navigation-close {

  }
`;
