import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import {Card,CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Otvaranje naloga</h2>
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <div className="filed-line">
        <TextField
           floatingLabelText="Ime"
           name="name"
           errorText={errors.name}
           onChange={onChange}
           value={user.name} />
      </div>
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
        <RaisedButton type="submit" label="Napravite novi nalog" primary ></RaisedButton>
      </div>
      <CardText>Vec imate nalog?<Link to={'/login'}>Prijavite se</Link></CardText>
    </form>
  </Card>
);
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
