import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors:{},
      user: {
        email:'',
        name:'',
        password:''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event){
    const field = event.targe.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  processForm(event){
    event.preventDefault();
    //pravim string za HTTP body poruku
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);

    const formData = `name=${name}&email=${email}&password=${password}`;
    console.log(formData);

    //pravljenje AJAX requesta
    const xhr = new XMLHttpRequest();
    xhr.open('post','/auth/signup');
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

  render(){
    return(
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}>
      </SignUpForm>
    );
  }


}
export default SignUpPage;
