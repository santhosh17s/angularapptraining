    //ROUTE CONFIGURATION
    function configurationFn($routeProvider, $mdThemingProvider, $mdIconProvider){
        
        $mdThemingProvider.theme('default')
            .primaryPalette('light-green')
            .accentPalette('deep-orange');
        
        $routeProvider
            .when('/', {
                templateUrl: 'home.tmp.html',
                title : 'Home | Angularjs Training'            
                })
            .when('/todo', {
                templateUrl: 'todo.tmp.html',
                controller: 'toDoCtrl', 
                title : 'To Do App',
                resolve: {
                        //doSomething()
                    }
                })
            .when('/showEmp', {
                templateUrl: 'form.tmp.html', 
                title : 'Employee Details'            
                })  
            .when('/newEmp', {
                templateUrl: 'showEmp.tmp.html',
                controller: 'formShowCtrl',
                title: 'New Employee'
                })
            .when('/updateEmp/:eid', { 
                templateUrl : 'showEmp.tmp.html',
                controller : 'editEmpCtrl',
                title : 'Update Employee'
            })
            .when('/about', {
                templateUrl: 'about.tmp.html',
                title : 'About'
                })
            .when('/factoryService', {
                templateUrl: 'factory-service.html',
                title: 'Factory - Service'
                })
             .otherwise({
                redirectTo: '/',
                title : 'Angularjs Training'
                });  

          $mdIconProvider
              .icon('hangout', 'img/icons/sms.svg', 24)
              .icon('3drotation', 'img/icons/3d_rotation.svg', 24)
              .icon('accessibility', 'img/icons/accessibility.svg', 24)
              .icon('account_balance', 'img/icons/account_balance.svg', 24)
              .icon('shopping_cart', 'img/icons/shopping_cart.svg', 24)
              .icon('todolist', 'img/icons/ic_speaker_notes_black_24px.svg', 24)
              .icon('profile', 'img/icons/ic_account_circle_white_24px.svg', 50)
              .icon('explore', 'img/icons/ic_explore_black_24px.svg', 24)
              .icon('delete', 'img/icons/ic_delete_black_24px.svg', 24)
              .icon('setting', 'img/icons/ic_settings_black_24px.svg', 24)
              .icon('public', 'img/icons/ic_public_black_24px.svg', 24)
              .icon('morevert', 'img/icons/ic_more_vert_white_24px.svg', 24)
              .icon('reply', 'img/icons/ic_reply_white_24px.svg', 24);
        
    };


    //CHANGE PAGE TITLE BASED ON ROUTERS
    function runFn($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    };

