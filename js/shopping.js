



var app =angular.module("myShoppingList",[]);

app.controller("myCtrl",function($scope){

	$scope.products =["Milk","Bread","Cheese"];

	$scope.addItem =function(){

        $scope.errorText ="";
        if (!$scope.addMe) {
            console.log("Nothing inserted");
        	return;

        } 

        if($scope.products.indexOf($scope.addMe) == -1){
        	$scope.products.push($scope.addMe);
        } else {
        	$scope.errorText ="This item already exists in our Shopping List";
        }
		

	}

	$scope.removeItem =function (x){
        $scope.errortext = ""; 
		$scope.products.splice(x,1);

	}

});



