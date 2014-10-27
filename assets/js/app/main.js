;(function($angular) {
    'use strict';

    var App = $angular.module('App', ['ngResource']);


    App.factory('Invitations', ['$resource', function($resource) {
        return $resource('/invitations/:id', {id: '@id'});
    }]);


    App.controller('RootController', ['$scope', 'Invitations', function($scope, Invitations) {

        $scope.email = '';

        $scope.submission = (function SubmitEmail() {
            var invitation = new Invitations({
                email: 'test'
            });
            console.log(invitation)
            invitation.$save(function(data) {
                console.log(data);
            });
        });
    }]);


})(window.angular);