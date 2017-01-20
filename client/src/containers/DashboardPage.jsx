import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

class  DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData:''
    };
  }

  //ovaj metod ce biti izvrsen nakon inicijalnog rendera

  componentDidMount(){
    const xhr = new XMLHttpRequest();
    xhr.open('get','/api/dashboard')
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //podesavenje autorizacije u hederu
    xhr.setRequestHeader('Authorization',`bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if(xhr.status==200){
        this.setState({
          secretData:xhr.response.message
        });
      }
    });
    xhr.send();
  }
  //renderovanje komponente
  render(){
    return(<Dashboard secretData={this.state.secretData}></Dashboard>);
  }
}

export default DashboardPage;
