import React, { useRef, useEffect } from "react";

export default function withClickOutside(WrappedComponent) {
  return (props) => {
    const ref = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        const { onClose } = props;
        if (ref.current && !ref.current.contains(event.target)) {
          onClose()
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
    return <WrappedComponent {...props} ref={ref} />;
  };
}