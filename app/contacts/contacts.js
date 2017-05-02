'use strict';

angular.module('contacts-app.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', 'initOneFire', function($scope, $firebaseArray, initOneFire) {

	var rootRef = initOneFire.getFireBaseInstance.database().ref();

	$scope.contacts = $firebaseArray(rootRef);
	$scope.addFormShow = false;
	//console.log($scope.contacts);

	$scope.showAddForm = function(){

		$scope.addFormShow = true;
	}

	$scope.showEditForm = function(contact){

		$scope.editFormShow = true;

		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.street_address = contact.address[0].street_address;
		$scope.zipcode = contact.address[0].zipcode;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;

		$scope.id = contact.$id;
	}

	$scope.hide = function(){

		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	$scope.formSubmit = function(){

		if($scope.name){var name = $scope.name} else {var name = "";}
		if($scope.email){var email = $scope.email} else {var email = "";}
		if($scope.company){var company = $scope.company} else {var company = "";}
		if($scope.work_phone){var work_phone = $scope.work_phone} else {var work_phone = "";}
		if($scope.home_phone){var home_phone = $scope.home_phone} else {var home_phone ="";}
		if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone} else {var mobile_phone = "";}
		if($scope.city){var city = $scope.city} else {var city = "";}
		if($scope.state){var state = $scope.state} else {var state = "";}
		if($scope.street_address){var street_address = $scope.street_address} else {var street_address = null;}
		if($scope.zipcode){var zipcode = $scope.zipcode} else {var zipcode = "";}

		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones: [
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
				}
			]
		}).then(function(rootRef){
			var id = rootRef.key;
			console.log('added contact with id' + id);

			clearFields();

			$scope.addFormShow = false;

			$scope.msg = "Contact added.";
		});
	}

	$scope.editFormSubmit = function(){
		console.log('updating');

		var id = $scope.id;

		console.log('fetched id: ' + id);
		var record = $scope.contacts.$getRecord(id);

		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		record.phones[0].work = $scope.work_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].mobile = $scope.mobile_phone;
		record.address[0].street_address = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;

		//save 
		// $scope.contacts.$save(record);

		$scope.contacts.$save(record).then(function(rootRef){
			console.log(rootRef.key);
		});

		clearFields();

		//hide edit form

		$scope.editFormShow = false;
		$scope.msg = "Contact Updated";
	}

	function clearFields(){
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.work_phone = '';
		$scope.home_phone = '';
		$scope.street_address = '';
		$scope.zipcode = '';
		$scope.city = '';
		$scope.state = '';
	}

	$scope.showContact = function(contact){
		// console.log('showing contact');
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.street_address = contact.address[0].street_address;
		$scope.zipcode = contact.address[0].zipcode;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;

		$scope.contactShow = true;
	}

	$scope.removeContact = function(contact){
		// console.log('removing contact');

		var answer = confirm("Are you sure you want to delete?");
		if(answer == true){	
				$scope.contacts.$remove(contact);
		
				$scope.msg = "Contact deleted";	
			}
		
	}
}])

.service('initOneFire', function(){

	var config = {
	    apiKey: "AIzaSyDX0oyT30wgFZMPgHSTyo-f4Nbn1WgMtxg",
	    authDomain: "contacts-app-2309a.firebaseapp.com",
	    databaseURL: "https://contacts-app-2309a.firebaseio.com",
	    projectId: "contacts-app-2309a",
	    storageBucket: "contacts-app-2309a.appspot.com",
	    messagingSenderId: "186740527200"
	  };
	  
	  this.getFireBaseInstance = firebase.initializeApp(config);
});
