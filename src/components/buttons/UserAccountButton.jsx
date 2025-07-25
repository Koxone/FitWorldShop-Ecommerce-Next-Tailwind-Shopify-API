import React from 'react';
import { UserIcon } from '../icons/Icons';
import { User } from '@clerk/backend';

function UserAccountButton() {
  return (
    <button
      onClick={() => {
        window.location.href =
          'https://account.fitworldshop.com/?return_url=https://www.fitworldshop.com/user-profile';
      }}
      className="cursor-pointer rounded text-gray-300 transition hover:text-white"
    >
      <UserIcon />
    </button>
  );
}

export default UserAccountButton;
