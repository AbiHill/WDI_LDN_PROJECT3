/* global google */
PagesHomeCtrl.$inject = ['$scope', '$auth', 'User', '$timeout'];

function PagesHomeCtrl($scope, $auth, User, $timeout) {

  const vm = this;
  vm.origin = '123 Oxford St, Soho, London W1D 2LT, UK';
  vm.destination = '116 Whitechapel Rd, London E1 1JE, UK';
  vm.travelMode = '';
  vm.bottomnav = null;
  vm.foodType = null;
  vm.loading = false;
  vm.navigationStep = '0';
  // vm.gestureHandling ='cooperative';


  //This function sets the users walking or driving travel mode
  function setTravelMode(mode) {
    vm.travelMode = mode;
    openNav();
  }
  vm.setTravelMode = setTravelMode;

  // SETFOOD TYPE FUNCTION
  function setFoodType(type) {
    console.log('Show ' + type + ' type of restaurants');
    if(type === 'kebab') {
      $scope.hammered = 'chosen-emotion';
      $scope.hungover = '';
      $scope.hangry = '';
      $scope.hardworking = '';
    } else if(type === 'cafe') {
      $scope.hammered = '';
      $scope.hungover = 'chosen-emotion';
      $scope.hangry = '';
      $scope.hardworking = '';
    } else if(type === 'fastfood') {
      $scope.hammered = '';
      $scope.hungover = '';
      $scope.hangry = 'chosen-emotion';
      $scope.hardworking = '';
    } else {
      $scope.hammered = '';
      $scope.hungover = '';
      $scope.hangry = '';
      $scope.hardworking = 'chosen-emotion';
    }
    vm.foodType = type;
  }

  vm.setFoodType = setFoodType;

  //Abi's Function
  //----------CURRENT LOCATION FUNCTION------------//

  //setting all of the messaging on the page as an empty string initially
  vm.userCurrentAddress = '';
  vm.unsuccessfulLocateMessage = '';
  vm.successfulLocateMessage = '';

  function userCurrentPosition(){
    //run the nav function whilst this function is running - the below closes the nav
    openNav();
    //run the modal
    vm.loading = true;
    //setting options for the geolacte function, it will time out in 10 seconds if it hasnt located you
    //maximumAge of 0 means that we will not use a cached postition and will use the actual current location of the device
    var ops = {
      timeout: 10000,
      maximumAge: 0
    };

    //The below function locates your current position in to lat and lng variables.
    navigator.geolocation.getCurrentPosition(pos => {
    //saved the users current lat and lon in to variables
      const userCurrentLat = pos.coords.latitude;
      const userCurrentLng = pos.coords.longitude;
      //The below changes them in to an object ready for converting them in to an address string
      const latLng = {lat: userCurrentLat, lng: userCurrentLng};
      //The below uses the latLng object and finds the formatted_address which is what we need for the field and google maps
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latLng}, function(results, status) {
        //when the geocodar runs it will send back "ok" if it's located your formatted_address from the lat and lng
        if (status === 'OK') {
          //if successful located then display 'weve located you'
          vm.successfulLocateMessage = 'We\'ve located you!';
          //...and open the nav again
          openNav();

          if (results[0]) {
            //if we've received a result then set the first index as the users current address
            vm.userCurrentAddress = results[0].formatted_address;
            //also set this as the origin for google maps
            vm.origin = results[0].formatted_address;
            //set the modal to false and therefore hide it
            vm.loading = false;
            //apply this to scope which is neccessary for angular
            $scope.$apply();
            //log the users current location, i used this for testing
            console.log('This is your current location:' + vm.userCurrentAddress);
          } else {
            //else log no results found
            console.log('No results found');
          }
          //if the status was now 'OK' log the geolocate error
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
      //the below is if there was an error,
    }, err => {
      //if the error was that it timed out, via our options that we previously set in opps which was 10 seconds
      if (err.TIMEOUT) {
        //hide the loading modal
        vm.loading = false;
        //open the nav
        openNav();
        //log that it's timeout
        console.log('TIMEOUT');
        //set the message to be displayed to indicate that we havent located the user
        vm.unsuccessfulLocateMessage = 'Sorry, we couldn\'t locate you this time.';
        //apply this to scope so the message is displayed. needed with angular because it hasnt picked up a change
        $scope.$apply();
      }
      //passed in the options as the third argument
    }, ops);
  }
  vm.userCurrentPosition = userCurrentPosition;

  // Home Page navigation open and close toggle function
  function openNav() {
    $scope.navigatebuttons = '';
    console.log('clicked');
    if ($scope.bottomnav === 'active-bottom-nav') {
      console.log('if');
      $scope.bottomnav = '';
      $scope.chevron = 'chevron-image';
      $scope.navigatebuttons = 'navigationhidden';
      console.log($scope.navigatebuttons);
    } else {
      console.log('else');
      $scope.bottomnav = 'active-bottom-nav';
      $scope.navigatebuttons = 'navigationshown';
      $scope.chevron = 'chevron-image active-chevron';
      console.log($scope.navigatebuttons);
    }
  }
  vm.openNav = openNav;


  //Abi's Function - This function pulls the current users home address from database when the home button is clicked
  function pullUserHomeOrWork(place){
    vm.userPlace = '';
    if (place === 'home'){
      const payload = $auth.getPayload();
      User.findById(payload.sub)
        .then(output => {
          vm.userPlace = output.data.home;
          vm.destination = output.data.home;
          console.log(vm.userPlace);
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

  // Change steps in the navigation
  function originNextStep() {
    console.log('Clicked');
    $scope.originStep = 'navigationhidden';
    $scope.destinationStep = 'navigationshown';
    $scope.geosuccess = 'navigationhidden';
  }

  function destinationNextStep() {
    console.log('Clicked');
    $scope.destinationStep = 'navigationhidden';
    $scope.emotionStep = 'navigationshown';
  }

  function emotionNextStep() {
    console.log('Clicked');
    $scope.emotionStep = 'navigationhidden';
    $scope.travelStep = 'navigationshown';
  }

  vm.originNextStep = originNextStep;
  vm.destinationNextStep = destinationNextStep;
  vm.emotionNextStep = emotionNextStep;


  // Bounce menu when page loads
  $timeout(() => vm.bottomnav = 'bottom-nav animated infinite bounce', 1500);
  $timeout(() => vm.bottomnav = 'bottom-nav', 3500);

}
export default PagesHomeCtrl;
