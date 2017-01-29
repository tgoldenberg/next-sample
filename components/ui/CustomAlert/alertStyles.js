import React from 'react';

export default () => (
  <style jsx>{`
    .alert-content {
      padding: 1rem 1rem;
    }

    .alert-content h2 {
      display: flex;
      color: #388e3c;
      padding: 1rem 1.5rem;
    }

    .alert-description {
      background: #f2f2f2;
      padding: 1rem 1.5rem;
    }

    .alert-actions {
      background: #f2f2f2;
    }

    .linked-accounts-alert.alert-actions {
      background: white;
    }

    .alert-content p {
      padding: 0 1.5rem;
    }

    .btn-text-sm {
      font-size: 0.75rem;
      font-weight: 200;
      letter-spacing: 0.75px;
      color: white;
    }

    .custom-modal-content {
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      max-width: none !important;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
    }

    .custom-modal-body {
      height: 100vh !important;
      max-height: none !important;
      overflow-y: auto !important;
    }
  `}
  </style>
)
