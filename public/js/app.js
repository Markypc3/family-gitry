angular.module('familygitry',[])
  .controller('usersController', usersController)
  .controller('treesController', treesController)
  .controller('peopleController', peopleController)
  .factory('User', function(){
    return {
      currentUser: {},
      token: ''
    }
  })
  .factory('Tree', function(){
    return {
      currentTree: {},
      newlyLoggedIn: false
    }
  })
  .factory('Person', function(){
    return {
      currentPerson: {},
      newlyViewingPeople: true
    }
  })

usersController.$inject = ['$http', 'User', 'Tree'];
treesController.$inject = ['$http', 'User', 'Tree', 'Person'];
peopleController.$inject = ['$http', 'User', 'Tree', 'Person'];
