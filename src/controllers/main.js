
MainCtrl.$inject = ['$rootScope','User','$auth', '$state', '$timeout', '$scope'];

function MainCtrl($rootScope, User,$auth, $state, $timeout, $scope) {

  // $scope.navigatebuttons
  const vm = this;
  vm.flashMessage = null;
  vm.isAuthenticated = $auth.isAuthenticated;

  vm.formattedOrigin = '';

  // This changeClass function enables the mobile burger menu in index.html
  $scope.class = '';
  $scope.bottomnav = '';
  $scope.chevron = '';

  $scope.changeClass = function(){
    if ($scope.class === 'is-active') {
      $scope.class = '';
      console.log($scope.class);
    } else {
      $scope.class = 'is-active';
      console.log($scope.class);
    }

  };

  //function runs when the user clicks log out.
  function logout(){
    //run the flash message with the bulma style of 'warning - which is red'
    $rootScope.$broadcast('flashMessage', {
      type: 'warning',
      content: 'Come back soon!'
    });
    //after user is logged out with token deleted then send the user to the craveIndex route
    $auth.logout();
    $state.go('craveIndex');
  }

  $rootScope.$on('flashMessage', (e, data) => {
    vm.flashMessage = data;
    $timeout(() => vm.flashMessage = null, 4000);
  });
  vm.logout = logout;


}


export default MainCtrl;
