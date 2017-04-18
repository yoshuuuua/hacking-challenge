
var emailGlobal ="";
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyALkeZp4ZtXwtfd3B_4NWmL3Wqi9pw7gfw",
    authDomain: "hackchallenge-51780.firebaseapp.com",
    databaseURL: "https://hackchallenge-51780.firebaseio.com",
    projectId: "hackchallenge-51780",
    storageBucket: "hackchallenge-51780.appspot.com",
    messagingSenderId: "478439874744"
  };
  firebase.initializeApp(config);

    /**
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]

    
    function toggleSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GithubAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('repo');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        window.location = "http://ec2-35-164-188-83.us-west-2.compute.amazonaws.com:31337/";
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    function initApp() {
      // Result from Redirect auth flow.
      // [START getidptoken]
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // [START_EXCLUDE]
          //document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
          //document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END getidptoken]
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          emailGlobal = email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('email').textContent = email;
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          findUser(email);
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in with GitHub';
          document.getElementById('quickstart-account-details').textContent = 'null';

          //document.getElementById('quickstart-oauthtoken').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    window.onload = function() {
      initApp();
    };

    function findUser(email) {
      $.getJSON('../user/'+email, function(data) {
        console.log(data);
        everything ="";
        for (number in data)
        {
          for (link in data[number])
          {
          console.log(data[number][link])
          everything+=data[number][link];
        }
        }
        $("#challenges").html(everything);

              })
    }

   
