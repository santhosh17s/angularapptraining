(function(){
    
    'use strict'
  
    //APPLICATION CONTROLLER
    function appCtrlFn($scope, $mdSidenav, $http, $mdBottomSheet){ 

        $scope.title = "from Parent Scope";
        
       // console.log(scope);    
        var ac = this;
        ac.cdName = 'From outside';
        
       //Service/Factory
       /* factoryService.setName("Factory - santhosh");
        $scope.factoryName = factoryService.name;
        $scope.serviceName = myService.setName("SAnthosh - service");
        $scope.providerName = configurable.name;*/

        //SideNav
        ac.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
        };
       

        ac.menu = [ { link : '#todo',
                          title: 'To Do List',
                          icon: 'todolist'
                        },
                        {
                          link : '#showEmp',
                          title: 'Employee CRUD',
                          icon: 'explore'
                        },
                        {
                          link : '#about',
                          title: 'About',
                          icon: 'public'
                        }
                      ];
        ac.admin = [{
                          link : '',
                          title: 'Trash',
                          icon: 'delete'
                        },
                        {
                          link : 'showListBottomSheet($event)',
                          title: 'Settings',
                          icon: 'setting'
                        }
                      ];

        //BOTTOM SHOW GRID
        ac.showGridBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
              templateUrl: 'bottom-sheet-grid-template.html',
              controller: 'GridBottomSheetCtrl',
              targetEvent: $event
            }).then(function(clickedItem) {
              $scope.alert = clickedItem.name + ' clicked!';
            });
          };
        
        
    };

    
    //TODO APP CONTRL
    function toDoCtrlFn($scope, $mdDialog){
        
            
        var tdc = this;
        tdc.toDoItems = [  {text:'Assignments Need to Do', done: false}, 
                            {text:'To Do App',done: true},
                            {text:'CRUD Operation', done:true},
                            {text:'Factory/Service', done:true},
                            {text:'Filters', done:true},
                            {text:'Custom Directive', done:false}];

        $scope.addItem = function() {
            tdc.toDoItems.unshift({text:tdc.todoText, done:false});
            tdc.todoText = '';
        };
        
       $scope.deleteItem = function(index,event) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Would you like to delete your toDo?')
              .content('Means your toDo task is already done.')
              .ariaLabel('Delete toDo')
              .ok('Done!')
              .cancel("Don't")
              .targetEvent(event);
            $mdDialog.show(confirm).then(function() {
               tdc.toDoItems.splice(index,1); //delete in the list
            }, function() {
             // $scope.alert = 'ok';
            });
          };
        
    };
    

    //FORM CONTROLLER
    function formCtrlFn($scope, dataFactory, $http, baseUrl, $mdDialog){

        var el = this,
            deleteId;
        
        dataFactory.getEmployee()
                    .then(function(data){
                            el.empData = data;
                        }, function(errorMessage){
                            console.warn(errorMessage);
                        });
        
   
        //EMPLOYEE DELETE CONFIRM
        $scope.deleteEmpItem = function(empid) {
            deleteId = empid;
            var confirm = $mdDialog.confirm()
              .parent(angular.element(document.body))
              .title('Would you like to delete Employee?')
              .content('Employee Left the company.')
              .ariaLabel('Delete toDo')
              .ok('Delete!')
              .cancel("Don't")
              .targetEvent(event);
             $mdDialog.show(confirm).then(deleteEmpItemFn, function() {
             // $scope.alert = 'ok';
            });
          };
        
        
        //EMPLOYEE DELETE
        function deleteEmpItemFn(){
            //alert(deleteId);
             dataFactory.deleteEmploee(deleteId)
                        .then(function(data){
                                el.empData = data;
                            }, function(errorMessage){
                                console.warn(errorMessage);
                            });
        
        }
        
 
    };

    
    //NEW EMPLOYEE
    function formShowCtrlFn($scope, dataFactory,  $http, $location, baseUrl){

        $scope.EmpBtn = "Add New Employee";
        $scope.submitForm = function () {	
            
            var empFormData = {
                                'id':$scope.id,
                                'name': $scope.name,
                                'dob':$scope.dob,
                                'dept':$scope.dept,
                                'email':$scope.email,
                                'phone':$scope.phone,
                                'address':$scope.address };
            
           dataFactory.addNewEmployee(empFormData)
                        .then(function(data){
                                if(data.status) 
                                    $location.path('/showEmp');			
                            }, function(errorMessage){
                                console.warn(errorMessage);
                            });
            
            };
        
    };

    //EDIT EMPL CONTROLLER
    function editEmpCtrlFn($scope, dataFactory, $routeParams, $location, baseUrl){

        $scope.EmpBtn = "Update Employee";
        var edit_id = +($routeParams.eid);	
        
        dataFactory.editEmployee(edit_id)
                        .then(function(data){
                                $scope.id = data[0].id;
                                $scope.name = data[0].name;
                                $scope.dob = data[0].dob;
                                $scope.dept = data[0].dept;
                                $scope.email = data[0].email;
                                $scope.phone = +(data[0].phone);
                                $scope.address = data[0].address;	
                            }, function(errorMessage){
                                console.warn(errorMessage);
                            });
        
        
      
        $scope.submitForm = function () {	
            
            var empFormData = {'id':edit_id, 
                               'name': $scope.name,
                               'dob':$scope.dob,
                               'dept':$scope.dept,
                               'email':$scope.email,
                               'phone':$scope.phone,
                               'address':$scope.address };
            
             dataFactory.updateEmployee(empFormData)
                        .then(function(data){
                                if(data.status) 
                                    $location.path('/showEmp');			
                            }, function(errorMessage){
                                console.warn(errorMessage);
                            });
            
        };

    };


    //GRID-BOTTOM-SHEET Ctrl
    function GridBottomSheetCtrlFn($scope, $mdBottomSheet) {
          $scope.bottomItems = [
            { name: 'Hangout', icon: 'hangout' },
            { name: '3d Rotation', icon: '3drotation' },
            { name: 'Accessibility', icon: 'accessibility' },
            { name: 'Balance', icon: 'account_balance' },
            { name: 'Cart', icon: 'shopping_cart' },
          ];
          $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
          };
    };

//CUSTOM DIRECTIVE
function testDirectFn(){
     return {
        restrict: 'EA',
        transclude: false,
        scope: {
            title: '@'
        }, 
        controllerAs: 'td',
        controller: function($scope){
            //$scope.cdName = "from controller inside";
            $scope.pclick = function(){
                 alert('paragraph clicked')
             };
        }, //controller function
        //require: 'foo', //include other controller
        template: ['<div >',
                   '<span >{{ title }}</span>',
                   '<h1  >Test Directive</h1>',
                   ' <ul><li ng-repeat= "item in ac.menu" > {{item}}</li></ul>',
                  '<p ng-click="td.pclick">How is this directive coming... </p>',
                   'Custom Directive Name: {{cdName}}',
                   '</div>'].join(''),
         link: function(scope, element, attr){
             //console.log(scope);
             console.log(attr.newAtt);
             scope.pclick = function(){
                 alert('paragraph clicked')
             }
             scope.cdName = 'From Inside';
             
         }
    };
}   

    
    
 angular.module('angularAppTraining', ['ngRoute','ngMaterial'])
        .value('baseUrl', 'http://localhost:90/angularapptraining/')
        .config(configurationFn)
        .run(runFn)
        .factory('dataFactory',dataFactoryService)
        .directive('testDirect', testDirectFn)
        .controller('AppCtrl', ['$scope', '$mdSidenav', '$http', '$mdBottomSheet',  appCtrlFn])
        .controller('toDoCtrl', toDoCtrlFn)
        .controller('formCtrl', formCtrlFn)
        .controller('formShowCtrl', formShowCtrlFn)
        .controller('editEmpCtrl', editEmpCtrlFn)
        .controller('GridBottomSheetCtrl', GridBottomSheetCtrlFn);

    
})(); //end of IIFA