    //AJAX SERVICE
    function dataFactoryService($http, $q, baseUrl) {
        
         //var baseUrl = 'http://localhost:90/angularapptraining/',
          var  dataFactory = {};
        
             
        dataFactory.getEmployee = function(){
                
            var url = baseUrl + 'api/formprocess.php/showEmp',
                request = $http.get( url );

            return( request.then( handleSuccess, handleError ) );
                        
        };
        
        
        dataFactory.deleteEmploee = function(deleteId) {
             var url = baseUrl + 'api/formprocess.php/deleteUser/'+deleteId,
                 request = $http.delete(url);
            
             return( request.then( handleSuccess, handleError ) );
        };
        
        
        dataFactory.addNewEmployee = function(EmpFormdata) {
              var url = baseUrl + 'api/formprocess.php/newUser',
                  request = $http.post(url,EmpFormdata);
            
              return( request.then( handleSuccess, handleError ) );
        };
        
        
        dataFactory.editEmployee = function(edit_id) {
             var url = baseUrl + 'api/formprocess.php/loadEditUser/'+edit_id,
                 request = $http.get(url);
            
             return( request.then( handleSuccess, handleError ) );
        };
        
        
        dataFactory.updateEmployee = function(EmpFormdata) {
              var url = baseUrl + 'api/formprocess.php/editEmp';
              var request = $http.post(url,EmpFormdata);
            
              return( request.then( handleSuccess, handleError ) );
        };
        
       
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {

            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {

                return( $q.reject( "An unknown error occurred." ) );

            }

            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );

        }


        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {

            return( response.data );

        }
        
        
        return dataFactory;
    };
    

//--------------------------------------------------------------------------------

    // SERVICE / FACTORY
    //app.factory('serviceName', function(){ return serviceObj});
    /*app.factory('factoryService', function(){
        var factoryServiceObj = {};

        factoryServiceObj.name = 'factory Service Object';
        factoryServiceObj.setName = function(newName) {
            factoryServiceObj.name = newName;
        };

        return factoryServiceObj;

    });*/


    //var app = angular.module("test",[]);

    //SERVICE
    //app.service('ServiceName', function(){ });
    /*app.service('myService', function(){
        this.name = 'My Services';
        this.setName= function(newName) {
            this.name = newName; 
            return this.name;
        }
    });*/

    //PROVIDER
    /*app.provider('configurable', function () {
         var privateName = '';
         this.setName = function (newName) {
            privateName = newName;
         };
         this.$get = function () {
            return {
                name: privateName
            };
          };
    });*/
