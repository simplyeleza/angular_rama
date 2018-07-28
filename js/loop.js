



var myApp = angular.module('minmax', [
'ngResource',
'infinite-scroll',
'angularSpinner',
'jcs-autoValidate',
'angular-ladda',
'mgcrea.ngStrap',
'toaster', 
'ngAnimate',
'ui.router'

]);


myApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('list', {
			url: "/",
			views:{
               'main':{
                  templateUrl:'templates/list.html',
			      controller: 'PersonListController'

               },
				'search': {
					templateUrl: 'templates/searchform.html',
					controller: 'PersonListController'
				}
			}
			
		})
	.state('edit', {
			url: "/edit/:email",
			views: {
				'main': {
					templateUrl: 'templates/edit.html',
					controller: 'PersonDetailController'
				}
			}
		})
		.state('create', {
			url: "/create",
			views: {
				'main': {
					templateUrl: 'templates/edit.html',
					controller: 'PersonCreateController'
				}
			}
		});

$urlRouterProvider.otherwise('/');
});


myApp.config(function($httpProvider,$resourceProvider,laddaProvider,$datepickerProvider){

$httpProvider.defaults.headers.common['Authorization'] ='Token 19402a670db4050e0c43a3a12a40213ad818215f';

$resourceProvider.defaults.stripTrailingSlashes =false;
laddaProvider.setOption({
style:'expand-right'

   });

angular.extend($datepickerProvider.defaults, {
		dateFormat: 'd/M/yyyy',
		autoclose: true
	});

});


myApp.factory("Contact",function($resource){


return $resource("https://api.codecraft.tv/samples/v1/contact/:id/",{id:'@id'},{

update:{

method:'PUT'	
  }
});


});




myApp.directive('ccSpinner',function(){


return {

'transclude':true,
'restrict' :'E',
'templateUrl':'templates/spinner.html',
'scope':{
	'isLoading':'=',
	'message':'@'

}


}

});





myApp.filter('defaultImage', function () {

	return function (input, param) {
		//console.log(input);
		//console.log(param);
		if (!input) {
			return 'images/avatar.png';
		}
		return input;
	};

});



myApp.controller('PersonDetailController',function($scope,$stateParams,$state,ContactService){

$scope.mode = "Edit" ;

console.log($stateParams);

$scope.contacts =ContactService;

$scope.selectedPerson= ContactService.selectedPerson;

$scope.contacts.selectedPerson = $scope.contacts.getPerson($stateParams.email);


$scope.save = function(){

$scope.contacts.updateContact($scope.contacts.selectedPerson).then(function(){
   $state.go("list");
});


}



$scope.remove = function(){

$scope.contacts.removeContact($scope.contacts.selectedPerson).then(function(){
   $state.go("list");
});

}


});


myApp.controller('PersonCreateController', function ($scope, $state, ContactService) {
	$scope.mode = "Create";

	$scope.contacts = ContactService;

	$scope.save = function () {
		console.log("createContact");
		$scope.contacts.createContact($scope.contacts.selectedPerson)
			.then(function () {
				$state.go("list");
			})
	};
});







myApp.controller('PersonListController',function($scope,$modal,ContactService){

$scope.search = "";

$scope.order ="email";

$scope.contacts =ContactService;




//$scope.persons =ContactService.persons;
$scope.selectedPerson= ContactService.selectedPerson;

//$scope.selectedIndex =null;
//$rootScope.selectedPerson= null;

/**
$scope.selectPerson =function(person,index){

//$scope.selectedIndex= index;
$scope.selectedPerson= person;


}; **/


$scope.loadMore = function(){

console.log("Load more!!!");
$scope.contacts.loadMore();


};



$scope.showCreateModal = function() {


$scope.contacts.selectedPerson = {};

$scope.createModal = $modal ({

scope:$scope,
template:'templates/modal.create.tpl.html',
show:true


});

};




/**
$scope.createContact =function(){

console.log("create Contact ");

$scope.contacts.createContact($scope.contacts.selectedPerson)
.then(function (){

 $scope.createModal.hide();
});

};   **/










});

   


myApp.service('ContactService',function(Contact,$rootScope,$q,toaster){



var self =  {

'getPerson': function (email) {
			console.log(email);
			for (var i = 0; i < self.persons.length; i++) {
				var obj = self.persons[i];
				if (obj.email == email) {
					return obj;
				}

			}
 },

'page':1,
'hasMore':true,
'isLoading':false,
'isSaving':false,
'selectedPerson': null,
'persons' : [],
'search' :null,
'ordering' :'name',
'doSearch':function(search){
  self.hasMore =true;
  self.page=1;
  self.persons=[];
  self.loadContacts();
},
'doOrder':function(){
  self.hasMore =true;
  self.page=1;
  self.persons=[];
  self.loadContacts();
},
'loadContacts': function(){

     if(self.hasMore && !self.isLoading){

     self.isLoading =true;

     var params ={

     	'page':self.page,
     	'search':self.search,
     	'ordering':self.ordering
     };

     Contact.get(params,function (data){
     console.log(data);
     angular.forEach(data.results,function(person){

     	self.persons.push(new Contact(person));

     });


     if(!data.next){

     	self.hasMore =false;
     }

     self.isLoading =false;


    });	

     }
 
},

'loadMore':function(){
if(self.hasMore && !self.isLoading){

self.page += 1;
self.loadContacts();	
}

},

'updateContact': function(person){
     var d= $q.defer();
	console.log("service called update");
	self.isSaving=true;
	person.$update().then(function(){
		self.isSaving =false;
		toaster.pop('success','Update ' + person.name);
		d.resolve();
	});
return d.promise;
},



'removeContact': function(person){
     var d= $q.defer();
	console.log("Contact has been removed");
	self.isDelete=true;
	person.$remove().then(function(){
		self.isDeleting =false;
		var index=self.persons.indexOf(person);
		self.persons.splice(index,1);
		self.selectedPerson=null;
		toaster.pop('success','Deleted ' +person.name);
		d.resolve();
	});
	return d.promise;
},


'createContact':function(person){

var d= $q.defer();

self.isSaving=true;
Contact.save(person).$promise.then(function (){
		self.isSaving =false;
		self.selectedPerson =null ;
		self.hasMore = true;
		self.page= 1;
		self.persons= [];
		self.loadContacts();
		toaster.pop('success','Created ' +person.name);
		d.resolve();
	});
return d.promise;

},

'watchFilters': function () {
			$rootScope.$watch(function () {
				return self.search;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doSearch();
				}
			});

			$rootScope.$watch(function () {
				return self.ordering;
			}, function (newVal) {
				if (angular.isDefined(newVal)) {
					self.doOrder();
				}
			});
		}


};


self.loadContacts();
self.watchFilters();

return self;


});






