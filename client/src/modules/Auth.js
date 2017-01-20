class  Auth {
//autentifikuje usera i smesta ga na lokalno skladiste

static authenticateUser(token){
  localStorage.setItem('token',token);
}
//provera da li je user autentifikovan i provera da li je smesten u lokalno skladiste

static isUserAuthenticated(){
  return localStorage.getItem('token')!==null;
}

//deautentifikuje usera i brise iz skladista

static deauthenticateUser(){
  localStorage.removeItem('token');
}

//get vrednost tokena

static getToken(){
  return localStorage.getItem('token');
}
}

export default Auth;
