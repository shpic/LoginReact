import React,{PropTypes} from 'react';
import {Link,IndexLink} from 'react-router';
import Auth from '../modules/Auth';

const Base = ({children})=>(
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React logovanje</IndexLink>
      </div>
      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Odjava</Link>
        </div>
      ) : (
      <div className="top-bar-right">
        <IndexLink to="/login">Prijavi se</IndexLink>
        <IndexLink to="/signup">Otvori nalog</IndexLink>
      </div>
      )}
    </div>
    {children}
  </div>
);
Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
