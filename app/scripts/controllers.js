"use strict";



angular.module('starter.controllers', ['firebase', 'starter.services'])


.controller('AuthCtrl', function ($firebaseArray, $firebaseObject, Auth) {

        var ref = new Firebase("https://whatspup.firebaseio.com/");

        this.login = Auth.sitterlogin;
    
        console.log(this.login);
})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
