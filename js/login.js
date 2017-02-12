var loginForm = document.getElementById('loginForm');

var updateFnameInput = document.getElementById('updateFname');
var updateLnameInput = document.getElementById('updateLname');
var updateEmailAddressInput = document.getElementById('updateEmailAdd');
var updateGithubInput = document.getElementById('updateGithub');
var updateSchoolInput = document.getElementById('updateSchool');
var updateMajorSubInput = document.getElementById('updateMajorSub');
var updateStudyLevelInput = document.getElementById('updateStudyLevel');
var updatePInterestInput = document.getElementById('updatePInterest');
var updateInterestInput = document.getElementById('updateInterest');
var updateDRestrictionInput = document.getElementById('updateDRestriction');
var updateShirtSizeInput = document.getElementById('updateShirtSize');
var updateBeginnerInput = document.getElementById('updateBeginner');
var updateLinkedinInput = document.getElementById('updateLinkedin');

var emailAddressInput = document.getElementById('loginEmail');
var passwordInput = document.getElementById('loginPass');
var email;
var update_info =  false;

function handleLogin(evt) {
    evt.preventDefault();
    // Sign out current user
    if (firebase.auth().currentUser) {

        firebase.auth().signOut();

    }
    email = emailAddressInput.value;
    var password = passwordInput.value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
          return
        } else {
          console.log("error Code"+errorMessage);
          console.log("error Message"+errorMessage);
          return
        }
    });
    update_info = true;
}

function updateInfo() {

  document.getElementById('loginContainer').style.display="none";
  window.history.replaceState( {} , '#login', '#update' );

  var repEmail = email.replace(/[@.#\[\]&]/g,'_');
  var ref = firebase.database().ref('/registration/'+repEmail);
  console.log(repEmail);

  ref.once('value').then(function(snapshot) {
    var fname = snapshot.val().first_name;
    var lname = snapshot.val().last_name;
    var dbEmail = snapshot.val().email;
    var github = snapshot.val().github;
    var school = snapshot.val().school;
    var major = snapshot.val().major;
    var study_level = snapshot.val().study_level;
    var p_interest = snapshot.val().professional_interest;
    var interest = snapshot.val().interest;
    var dietary_restriction = snapshot.val().dietary_restriction;
    var shirt_size = snapshot.val().shirt_size;
    var beginner = snapshot.val().beginner;
    var linkedin = snapshot.val().linkedin;
    var linkedin = linkedin.replace("https://linkedin.com/in/",'');
    var github = github.replace("https://github.com/",'');

    updateFnameInput.value = fname;
    updateLnameInput.value = lname;
    updateEmailAddressInput.value = dbEmail;
    updateGithubInput.value = github;
    updateSchoolInput.value = school;
    updateMajorSubInput.value = major;
    updateStudyLevelInput.value = study_level;
    updatePInterestInput.value = p_interest;
    updateInterestInput.value = interest;
    updateDRestrictionInput.value = dietary_restriction;
    updateShirtSizeInput.value = shirt_size;
    updateBeginnerInput.value = beginner;
    updateLinkedinInput.value = linkedin;

  });

  document.getElementById('updateContainer').style.display="block";
}

window.onload = function() {
  loginForm.addEventListener('submit', handleLogin, false);

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User logged in");
        if (update_info) {
          updateInfo();
        }
      }
  });
}
