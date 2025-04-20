import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

// ---------------------Import Internes -----------------------------

import { Alert, AlertTitle } from './ui/alert';

const AlertMessage = ({
  message,
  type,
}: {
  message: string;
  type: 'error' | 'success';
}) => {
  // -------------------------- Return -----------------------------------
  return (
    <Alert
      className={`rounded-none ${
        type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      } flex flex-row items-center justify-start`}
    >
      <FaInfoCircle className="mr-2" />
      <AlertTitle className="min-h-[20px] max-h-[40px] h-full flex flex-wrap">
        {message}
      </AlertTitle>
    </Alert>
  );
};

export default AlertMessage;
