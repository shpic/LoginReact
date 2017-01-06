import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Prijava</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="filed-line">
        <TextField
           floatingLabelText="E-posta"
           name="email"
           errorText={errors.email}
           onChange={onChange}
           value={user.email} />
      </div>
      <div className="filed-line">
        <TextField
           floatingLabelText="Sifra"
           type="password"
           name="password"
           errorText={errors.password}
           onChange={onChange}
           value={user.password} />
      </div>
      <div className="button-line">
        <RaisedButton type="submit" label="Prijava" primary ></RaisedButton>
      </div>
      <CardText>Nemate nalog?<Link to={'/signup'}>Napravite jedan</Link>.</CardText>
    </form>
  </Card>
);
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
