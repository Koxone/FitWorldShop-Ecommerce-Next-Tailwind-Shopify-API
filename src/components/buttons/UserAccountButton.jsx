import React from 'react';
import { UserIcon } from '../icons/Icons';

function UserAccountButton() {
  return (
    <button
      onClick={() => {
        // Simple fallback - redirect to account page
        window.location.href =
          'https://account.fitworldshop.com/?return_url=https://www.fitworldshop.com/';
      }}
      className="cursor-pointer rounded text-gray-300 transition hover:text-white"
    >
      <UserIcon />
    </button>
  );
}

export default UserAccountButton;
