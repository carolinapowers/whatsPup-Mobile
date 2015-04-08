"use strict";
angular.module('starter.services', ['ionic', 'firebase', 'ngCordova'])


.factory('Auth', function ($firebaseObject, $state) {
    var auth = new Firebase('https://whatspup.firebaseio.com');
    var currentUser = {};

    return {
        /**
         * Wrapper for `onAuth` that filters the `auth` object
         * through the `updateUser()` function
         */
        onAuth: function (creds) {
            auth.onAuth(function (data) {
                creds(updateUser(data));
            });
        },
        /**
         * Wrapper for `authWithOAuthPopup()` for each login option.
         */


        sitterlogin: function () {

            return auth.authWithOAuthRedirect("facebook", function (error, authData) {
                //                console.log(authData)
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $state.go('client');
                    console.log("Authenticated successfully with payload:", authData);
                }
            }, {
                remember: "sessionOnly"
            })
        },


        /** Wrapper for the unauth() functionality to logout
         */
        logout: function () {
            auth.unauth();
            $state.go('home');
            console.log("hello");
        },
        /** Wrapper to allow the main controller to check if a user is currently 
         * Logged in currently
         */
        loggedIn: function () {
            if (auth.getAuth()) {
                return true;
            }
        },
        /**
         *Get the current user.
         */
        getUser: function () {
            return currentUser;
        }
    };

    /**
     * Tranform the `authdUser` object from `$firebaseAuth` into a full User
     * record in the `/users` collection.
     *
     * @param {Object} authdUser from $firebaseAuth.getAuth()
     * @return {Object} from $firebase.$asObject()
     */
    function updateUser(authdUser) {
        console.log(authdUser)
        if (authdUser === null) {
            return null;
        }
        console.log("This will break if you login with anything other than FB")
            /**
             * Create a reference to the users collection within Firebase
             * Then create a child of the users collection named after the
             * authdUser's Facebook ID
//             */
        var fbUser = auth.child('petsitter').child(authdUser.facebook.id);

        console.log(fbUser);
        //            //
        //            //    // Update the authdUser's information in Firebase
        fbUser.update({
            uid: authdUser.facebook.id,
            facebook: authdUser.facebook,
            fullName: authdUser.facebook.displayName,
            firstName: authdUser.facebook.cachedUserProfile.first_name,
            lastName: authdUser.facebook.cachedUserProfile.last_name,
            avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
            gender: authdUser.facebook.cachedUserProfile.gender
        });
        //    // Set user to the object reference of authdUser
        fbUser = $firebaseObject(auth
                .child('petsitter')
                .child(authdUser.facebook.id)
            )
            //            //
            //            //    //stores the user information for use elsewhere
        currentUser = fbUser;
        //            //
        return fbUser;
    }
})

    
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
