import React, {PropTypes} from 'react';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors:{},
      user:{
        email:'',
        password:''
      }
    };
    this.processForm=this.processForm.bind(this);
    this.changeUser=this.changeUser.bind(this);
  }

  processForm(event){
    event.preventDefault();
    //pravim string za HTTP body poruku
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);

    const formData = `email=${email}&password=${password}`;
    console.log(formData);

    //pravljenje AJAX requesta
    const xhr = new XMLHttpRequest();
    xhr.open('post','/auth/login');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if(xhr.status==200){
        //uspesno
        //menjamo stanje (state) componente
        this.setState({
          errors:{}
        });
        console.log('Forma je validna');
      }else {
        //neuspeh
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);

  }

  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render(){
    return(
    <LoginForm
      onSubmit = {this.processForm}
      onChange = {this.changeUser}
      errors = {this.state.errors}
      user = {this.state.user}
      ></LoginForm>
    );
  }
}

export default LoginPage;
