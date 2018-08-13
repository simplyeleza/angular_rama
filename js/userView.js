var app = angular.module('myApp', ['ui.router']);




app.config(function($stateProvider,$urlRouterProvider){

  //$urlRouterProvider.otherwise('/');


  $urlRouterProvider.when('', '/');

  $stateProvider
  .state('main',{

  url:'/main',
  templateUrl:'templates/main.html'
})


.state('red',{

  url:'/red',
  templateUrl:'templates/red.html'
})


.state('green',{

  url:'/green',
  templateUrl:'templates/green.html'
})


.state('blue',{

  url:'/blue',
  templateUrl:'templates/blue.html'
});






});
















/**

app.config(function ($stateProvider, $urlRouterProvider) {
$stateProvider

.state('main',{
        url:"/main",
 
        views:{
        	'main':{
              templateUrl:'templates/main.html',
        	}
        }    


     })
.state('red',{

       url:"/red",
        views:{
        	'red':{
              templateUrl:'templates/red.html',
        	}
        }    
})

.state('green',{

       url:"/green",
        views:{
        	'green':{
              templateUrl:'templates/green.html',
        	}
        }    
})

.state('blue',{

       url:"/blue",
        views:{
        	'blue':{
              templateUrl:'templates/blue.html',
        	}
        }    
});


urlRouterProvider.otherwise('/routerUview.html');



});


**/