import React from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

const Icon = ({ icon, fontSize, color }) => {
  return (
    <>
      <IconContext.Provider value={{ style: { fontSize, color } }}>
        <span>{icon}</span>
      </IconContext.Provider>
    </>
  );
};

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  fontSize: '20px',
  color: '#888',
};

export default Icon;