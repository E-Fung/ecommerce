import React from 'react';
import ReactDom from 'react-dom';

type Props = { children: any };

const MenuDropModal: React.FC<Props> = ({ children }) => {
  const topbarHeight = document.getElementById('topBar');

  return ReactDom.createPortal(
    <div style={{ paddingTop: `${topbarHeight?.clientHeight}px` }} className='fixed top-0 right-0 z-50'>
      {children}
    </div>,
    document.getElementById('portal')!
  );
};

export default MenuDropModal;
