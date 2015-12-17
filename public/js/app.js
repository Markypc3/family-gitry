angular.module('familygitry',[])
  .controller('usersController', usersController)
  //.controller('treesController', treesController)
  //.controller('peopleController', peopleController)
  .factory('User', function(){
    return {
      currentUser: {},
      token: ''
    }
  })

usersController.$inject = ['$http', 'User']
