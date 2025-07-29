import React from 'react';
import { GiGhost } from 'react-icons/gi';

function NoData({ className }) {
  return (
    <div>
      <GiGhost className={className} />
    </div>
  );
}

export default NoData;
