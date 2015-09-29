//( function() {

    angular.module("testapp", [])
        .controller("ctrl", ['$scope', function($scope){
            $scope.name = "from controller";
        }]);
    
//})();