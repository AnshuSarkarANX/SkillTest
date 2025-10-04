import React from 'react'
import { topBar } from '../state/store';

const TopBar = () => {
    const useTopBar = topBar((state) => state);
    const { hasBackButton, logo, home } = useTopBar;
  return (
    <div className="grid grid-cols-5 justify-between items-center H-12 sticky top-0 bg-gradient-to-b from-secondary from-20%  to-white to-80% py-[15px] px-[10px]">
      {hasBackButton && <div className="col-span-1">Back button</div>}
      {logo && <h1 className="font-heading text-primary H-20 font-bold col-span-3 col-start-2">LearnSnap.in</h1>}
      {home ? <div className="col-span-1 col-start-4">menu, profile</div> : <div></div>}
    </div>
  );
}

export default TopBar