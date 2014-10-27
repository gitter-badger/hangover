;(function($angular) {
    'use strict';

    var App = $angular.module('App', ['ngResource']);

    App.factory('resourceInterceptor', ['$rootScope', function($rootScope) {
        $rootScope.http = {};
        return {
            request: function() {
                $rootScope.http.load = true;
            },
            response: function() {
                $rootScope.http.load = false;
                $rootScope.http.success = true;
            },
            responseError: function(e) {
                $rootScope.http.load = false;
                $rootScope.http.success = false;
                $rootScope.http.error = e;
            }
        };
    }])

    App.factory('Invitations', ['$resource', 'resourceInterceptor', function($resource, resourceInterceptor) {
        return $resource('/invitations/:id', {id: '@id'}, {
            save: {
                method: 'POST',
                interceptor: resourceInterceptor
            }
        });
    }]);

    App.directive('httpcallback', ['$rootScope', function($rootScope) {
        return {
            restrict: 'EA',
            template: [
                '<div>',
                    '<div ng-show="state.load">Chargement en cours</div>',
                    '<div ng-show="!state.load">',
                        '<div ng-show="state.success">Insertion reussie</div>',
                        '<div ng-show="state.success === false">',
                            '<div>Une erreur est survenue, détails ci-dessous</div>',
                            '<pre>{{state.error|json}}</pre>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''),
            link: function($scope) {
                $scope.state = $rootScope.http;
            }
        }
    }]);

    App.controller('RootController', ['$scope', 'Invitations', function($scope, Invitations) {

        $scope.httpResponse = null;
        $scope.email = '';

        $scope.submission = (function SubmitEmail() {
            var invitation = new Invitations({
                email: $scope.email
            });

            invitation.$save(function(data) {
                console.log(invitation);
                $scope.httpResponse = data;
            });
        });
    }]);


})(window.angular);