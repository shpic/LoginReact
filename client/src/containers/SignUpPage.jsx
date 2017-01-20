import React,{PropTypes} from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }



  processForm(event){
    event.preventDefault();
    //pravim string za HTTP body poruku
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);

    const formData = `name=${name}&email=${email}&password=${password}`;
    //  console.log(formData);

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
        //setujemo poruku
        localStorage.setItem('successMessage',xhr.response.message);
        //pravimo redirekciju
        this.context.router.replace('/login');

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
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}>
      </SignUpForm>
    );
  }


}
SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
