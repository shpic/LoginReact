import React,{PropTypes} from 'react';
import {Link,IndexLink} from 'react-router';

const Base = ({children})=>(
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React logovanje</IndexLink>
      </div>
      <div className="top-bar-right">
        <IndexLink to="/login">Prijavi se</IndexLink>
        <IndexLink to="/signup">Otvori nalog</IndexLink>
      </div>
    </div>
    {children}
  </div>
);
Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
