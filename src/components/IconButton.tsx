import React from 'react';

type Props = {
  icon: React.ReactElement<any, any>;
  label: string;
};

const IconButton = ({ icon, label }: Props) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
