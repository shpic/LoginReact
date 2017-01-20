import React,{PropTypes} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

const Dashboard = ({secretData})=>(
  <Card className = "container">
    <CardTitle title = "Dashboard" subtitle = "imatcete pristup ovoj strani samo nakon autentifikacije. "></CardTitle>
    {secretData && <CardText style={{fontSize:'16px', color:'green'}}>{secretData}</CardText>}
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
