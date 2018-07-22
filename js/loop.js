



var myApp = angular.module('minmax', [
'ngResource',
'infinite-scroll'




]);

myApp.config(function($httpProvider,$resourceProvider){

$httpProvider.defaults.headers.common['Authorization'] ='Token 19402a670db4050e0c43a3a12a40213ad818215f';

$resourceProvider.defaults.stripTrailingSlashes =false;

});


myApp.factory("Contact",function($resource){


return $resource("https://api.codecraft.tv/samples/v1/contact/:id/");


});






myApp.controller('PersonDetailController',function($scope,ContactService){

$scope.selectedPerson= ContactService.selectedPerson;

$scope.contacts =ContactService;

});


myApp.controller('PersonListController',function($scope,ContactService){

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



$scope.$watch('search',function(newVal,oldVal){


if (angular.isDefined(newVal)) {


	$scope.contacts.doSearch(newVal);
     }
   })



$scope.$watch('order',function(newVal,oldVal){


if (angular.isDefined(newVal)) {


	$scope.contacts.doOrder(newVal);
     }
   })




});

   


myApp.service('ContactService',function(Contact){



var self =  {

'addPerson':function(person){
this.persons.push(person);
},

'page':1,
'hasMore':true,
'isLoading':false,
'selectedPerson': null,
'persons' : [],
'search' :null,
'doSearch':function(search){
  self.hasMore =true;
  self.page=1;
  self.persons=[];
  self.search=search;
  self.loadContacts();
},
'doOrder':function(order){
  self.hasMore =true;
  self.page=1;
  self.persons=[];
  self.ordering=order;
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

}




};


self.loadContacts();

return self;


});






