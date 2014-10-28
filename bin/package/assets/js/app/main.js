;(function($angular) {
    'use strict';

    var App = $angular.module('App', ['ngResource']);

    // resource HTTPVideos
    App.factory('HTTPVideos', ['$resource', function($resource) {
        return $resource('/api/videos/:id', {id: '@id'});
    }]);

    // resource HTTPVideosReviews
    App.factory('HTTPVideosReviews', ['$resource', function($resource) {
        return $resource('/api/videos/:id/reviews', {id: '@id'});
    }]);

    // hang-video directive
    App.directive('hangVideo', ['$rootScope', 'HTTPVideos', function($rootScope, HTTPVideos) {
        return {
            restrict: 'EA',
            template: [
                '<div class="hang-video">',
                    '<div class="overlay"></div>',
                    '<span>{{video.title}}</span>',
                    '<img ng-src="{{video.poster}}">',
                    '<a ng-click="launch()">play video</a>',
                '</div>'
            ].join(''),
            link: function($scope) {
                $scope.video = HTTPVideos.get({id: '12345'});
                $scope.launch = function() {
                    alert("Go go ! Sorry.. noop function :-)");
                };
            }
        }
    }]);

    // hang-video directive
    App.directive('hangVideoReviews', ['$rootScope', 'HTTPVideosReviews', function($rootScope, HTTPVideosReviews) {
        return {
            restrict: 'EA',
            template: [
                '<div class="hang-reviews">',
                    '<ul>',
                        '<li ng-repeat="review in reviews">',
                            '<span class="author">{{review.author}}</span>',
                            '<div class="comment">{{review.comment}}</div>',
                            '<span class="review">{{review.review}}/5</span>',
                        '</li>',
                    '</ul>',
                '</div>'
            ].join(''),
            link: function($scope) {
                $scope.reviews = HTTPVideosReviews.query({id: '12345'});
            }
        }
    }]);

})(window.angular);