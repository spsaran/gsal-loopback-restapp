'use strict';

angular.module('egarsalApp')

.controller('SalesController', ['$scope', '$rootScope', '$state', 'Items', 'Favorites', function ($scope, $rootScope, $state, Items, Favorites) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    $scope.myitem = {
        "name": "",
        "description": "",
        "category": "Other",
        "price": ""
    };
    
    Items.find()
        .$promise.then(
        function (response) {
            $scope.items = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "Car";
        } else if (setTab === 3) {
            $scope.filtText = "Cloths";
        } else if (setTab === 4) {
            $scope.filtText = "Toys";
        } else if (setTab === 5) {
            $scope.filtText = "Furniture";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(itemid) {
        Favorites.create({customerId: $rootScope.currentUser.id, itemsId: itemid});
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.submitItem = function () {
        
        if ($rootScope.currentUser)
            $scope.myitem.customerId = $rootScope.currentUser.id;

        Items.create(this.myitem);

        $state.go($state.current, {}, {reload: true});
        
        this.itemForm.$setPristine();

        $scope.myitem = {
            "name": "",
            "description": "",
            "category": "Other",
            "price": ""
        };
    };
    
}])

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            // feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('ItemDetailController', ['$scope', '$rootScope', '$state', '$stateParams', 'Items', 'Comments', function ($scope, $rootScope, $state, $stateParams, Items, Comments) {

    $scope.item = {};
    $scope.showItem = false;
    $scope.message = "Loading ...";

    $scope.item = Items.findById({id: $stateParams.id})
        .$promise.then(
            function (response) {
                $scope.item = response;
                $scope.showItem = true;
                $scope.item.comments = Items.comments({
                    id: $stateParams.id,
                    "filter":{"include":["customer"]}});
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: "",
        itemsId: $stateParams.id,
    };

    $scope.submitComment = function () {
        
        if ($rootScope.currentUser)
            $scope.mycomment.customerId = $rootScope.currentUser.id;

        Comments.create($scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: "",
            itemsId: $stateParams.id,
        };
    };
        
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', 'Items', 'Leaders', 'Promotions', function ($scope, Items, Leaders, Promotions) {
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMenu = false;
    $scope.showItem = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.switchView = false;
    $scope.message = "Loading ...";
    
    var leaders = Leaders.findOne({"filter":{"where":{
            "featured": "true"
        }}})
        .$promise.then(
            function (response) {
                $scope.leader = response;
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    Items.find()
        .$promise.then(
        function (response) {
            $scope.items = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "Car";
        } else if (setTab === 3) {
            $scope.filtText = "Cloths";
        } else if (setTab === 4) {
            $scope.filtText = "Toys";
        } else if (setTab === 5) {
            $scope.filtText = "Furniture";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.toggleSwichView = function () {
        $scope.switchView = !$scope.switchView;
    };
    
    $scope.addToFavorites = function(itemid) {
        Favorites.create({customerId: $rootScope.currentUser.id, itemsId: itemid});
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    if (!$scope.switchView) {
        var link = function(scope, element, attrs) {
            var map, infoWindow;
            var markers = [];

            // map config
            var mapOptions = {
                center: new google.maps.LatLng(50, 2),
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            // init the map
            function initMap() {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }    

            // place a marker
            function setMarker(map, position, title, content) {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker); // add marker to array

                google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            // show the map and place some markers
            initMap();

            setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
            setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
            setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };        
    };
    
    
}])

.controller('AboutController', ['$scope', 'Leaders', function ($scope, Leaders) {

    $scope.leaders = Leaders.find();

}])

.controller('FavoriteController', ['$scope', '$rootScope', '$state', 'Favorites', 'Customer', function ($scope, $rootScope, $state, Favorites, Customer) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    if ($rootScope.currentUser) {
    Customer.favorites({id:$rootScope.currentUser.id, "filter":
        {"include":["items"]}
        })
        .$promise.then(
        function (response) {
            $scope.favorites = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    }
    else{
        $scope.message = "You are not logged in"
    }

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "Car";
        } else if (setTab === 3) {
            $scope.filtText = "Cloths";
        } else if (setTab === 4) {
            $scope.filtText = "Toys";
        } else if (setTab === 5) {
            $scope.filtText = "Furniture";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };
    
    $scope.deleteFavorite = function(favoriteid) {
        Favorites.deleteById({id: favoriteid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthService', function ($scope, $state, $rootScope, ngDialog, AuthService) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthService', function ($scope, ngDialog, $localStorage, AuthService) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthService.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthService', function ($scope, ngDialog, $localStorage, AuthService) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {

        AuthService.register($scope.registration);
        
        ngDialog.close();

    };
}])
;