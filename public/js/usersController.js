'use strict';

function usersController($http, User){
    let self = this;
    self.loginMode = true;
    self.newUser = {};
    self.loginUser = {};
    self.loginSuccess = function (data) {
      console.log(data);
      User.currentUser = data.data.currentUser;
      User.token = data.data.token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + User.token;
      self.loggedin = true;
      self.loginMode = false;
      self.loginUser = {};
    }
    self.signIn = function(){
      $http.post('/users/auth',self.loginUser).then(function(data){
        self.loginSuccess(data);
      });
    }
    self.logout = function() {
      $http.get('/users/logout', User.currentUser).then(function(data){
        console.log(data);
        User.currentUser = {};
        User.token = '';
        $http.defaults.headers.common.Authorization = undefined;
        self.loggedin = false;
        self.loginMode = true;
      });
    }
    self.signup = function(){
      if(self.newUser.email == '' || self.newUser.password== '') { return alert('can\'t leave any fields blank'); }
      console.log(self.newUser);
      $http.post('/users/signup', self.newUser).then(function(data){
        self.loginSuccess(data);
      });
    }
}
