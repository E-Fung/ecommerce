import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useOutsideAlerter = (ref: any, onClickEvent: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickEvent(event);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

type Props = { children: any; onClickEvent: any };
const OutsideAlerter: React.FC<Props> = ({ children, onClickEvent }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickEvent);

  return <div ref={wrapperRef}>{children}</div>;
};

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
