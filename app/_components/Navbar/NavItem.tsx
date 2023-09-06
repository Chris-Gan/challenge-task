import React, { FC } from 'react';

interface Props {
  label: string;
  url: string;
}
const NavItem: FC<Props> = ({ label, url }) => {
  return (
    <div className='navItem'>
      <a
        className='p-0 text-white transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
        href={url}
      >
        {label}
      </a>
    </div>
  );
};

export default NavItem;
