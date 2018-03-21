
/* global google */
PagesHomeCtrl.$inject = ['$scope', '$auth', 'User'];

function PagesHomeCtrl($scope, $auth, User) {

  const vm = this;
  vm.origin = '';
  vm.destination = '';
  vm.travelMode = '';
  vm.foodType = '';
  vm.loading = false;


  //This function sets the users walking or driving travel mode
  function setTravelMode(mode) {
    vm.travelMode = mode;
  }
  vm.setTravelMode = setTravelMode;

  // SETFOOD TYPE FUNCTION
  function setFoodType(type) {
    vm.foodType = type;
    console.log('Show ' + type + ' type of restaurants');
  }
  vm.setFoodType = setFoodType;



  //CURRENT LOCATION FUNCTION
  vm.userCurrentAddress = '';
  //This function gets the users current position and sets it as the origin
  function userCurrentPosition(){
    openNav();
    vm.loading = true;
    //The below function locates your current position in to lat and lng variables.
    var ops = {
      timeout: 10000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      const userCurrentLat = pos.coords.latitude;
      const userCurrentLng = pos.coords.longitude;
      //The below changes them in to an object ready for convering them in to an address string
      const latLng = {lat: userCurrentLat, lng: userCurrentLng};
      //The below uses the latLng object and finds the formatted_address
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            vm.userCurrentAddress = results[0].formatted_address;
            vm.origin = results[0].formatted_address;
            vm.loading = false;
            $scope.$apply();
            console.log('This is your current location:' + vm.userCurrentAddress);
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);

        }
      });
      //then I need to input the origin in the the google-maps directive
    }, err => {
      if (err.TIMEOUT) {
        vm.loading = false;
        $scope.$apply();
        console.log('TIMEOUT');
        openNav();
      }
    }, ops);

    //here I want to save the lat and lng as seperate variales.
    //then I want to save them as the value in the form with an ng-m
  }
  vm.userCurrentPosition = userCurrentPosition;

  // Home Page Navigation
  function openNav() {
    if ($scope.bottomnav === 'active-bottom-nav') {
      $scope.bottomnav = '';
      $scope.chevron = 'fas fa-chevron-up';
      console.log($scope.chevron);
    } else {
      $scope.bottomnav = 'active-bottom-nav';
      $scope.chevron = 'fas fa-chevron-up active-chevron';
      console.log($scope.chevron);
    }
  }
  this.openNav = openNav;




  //This function pulls the current users home address from database when the home button is clicked
  function pullUserHomeOrWork(place){
    vm.userPlace = '';
    if (place === 'home'){
      const payload = $auth.getPayload();
      User.findById(payload.sub)
        .then(output => {
          vm.userPlace = output.data.home;
          vm.destination = output.data.home;
          console.log(vm.userHome);
        });
    } else if (place === 'work') {
      const payload = $auth.getPayload();
      User.findById(payload.sub)
        .then(output => {
          vm.userPlace = output.data.work;
          vm.destination = output.data.work;
          console.log(vm.userPlace);
        });
    }
  }

  vm.pullUserHomeOrWork = pullUserHomeOrWork;



}




export default PagesHomeCtrl;
