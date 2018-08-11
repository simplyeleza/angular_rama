

var app = angular.module('myApp', []);

app.run(function($rootScope) {
    $rootScope.color = 'blue';
});


app.controller('myCtrl', function($scope,$location,$http,hexafy) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.myCol="green";
    $scope.quantity=1;
    $scope.price=5;
    $scope.myText="";

    $scope.count = 0;

    $scope.showMe = false;

    $scope.myFunc2 = function() {
        $scope.showMe = true;
    };

    $scope.myUrl = $location.absUrl();

    $http.get("welcome.html").then(function(response){

            $scope.myWelcome =response.data;

    });



    $http.get("customers.php").then(function(response){

        $scope.myData =response.data.records;

    });


    $scope.hex =hexafy.myFunc(255);

    $scope.fullName= function(){
       return $scope.firstName + " " + $scope.lastName;
    };
    $scope.person= {
    	firstName:'John',lastName:'Doe'
    };


    $scope.names=['Jani','Hege','Kai','Margareth','Joe','Gustav','Birgit','Mary'];

    $scope.fullNames= [ {name:'Jani',country:'Norway'},
                        {name:'Hege',country:'Sweden'},
                        {name:'Kai',country:'Denmark'},
                        {name:'Joe',country:'Denmark'},
                        {name:'Gustav',country:'Sweden'},
                        {name:'Birgit',country:'Denmark'},
                        {name:'Mary',country:'England'},
                        {name:'Kai',country:'Norway'}
                       ];

    


    $scope.cars = [
    {model : "Ford Mustang", color : "red"},
    {model : "Fiat 500", color : "white"},
    {model : "Volvo XC90", color : "black"}
     ];


  $scope.orderByMe =function(x) {

  	$scope.myOrderBy =x;
  }


});


app.directive("rama",function(){


return {
   restrict : "A",
   template:"<h3>This is a Rama directive</h3>"
};

})



app.filter('myFormat', function() {
    return function(x) {
        var i, c, txt = "";
        for (i = 0; i < x.length; i++) {
            c = x[i];
            if (i % 2 == 0) {
                c = c.toUpperCase();
            }
            txt += c;
        }
        return txt;
    };
});





app.service('hexafy',function(){

this.myFunc =function(x){

	return x.toString(16);
}



});


