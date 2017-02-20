var auth = firebase.auth();
var storageRef = firebase.storage().ref();
var regRef = firebase.database().ref('registration');
var regForm = document.getElementById('regForm');
var fnameInput = document.getElementById('fname');
var lnameInput = document.getElementById('lname');
var emailAddressInput = document.getElementById('emailAdd');
var passwordInput = document.getElementById('inputPasswordConfirm');
var githubInput = document.getElementById('github');
var schoolInput = document.getElementById('school');
var majorSubInput = document.getElementById('majorSub');
var studyLevelInput = document.getElementById('studyLevel');
var resumeInput = document.getElementById('resume');
var pInterestInput = document.getElementById('pInterest');
var interestInput = document.getElementById('interest');
var dRestrictionInput = document.getElementById('dRestriction');
var shirtSizeInput = document.getElementById('shirtSize');
var beginnerInput = document.getElementById('beginner');
var linkedinInput = document.getElementById('linkedin');
var firebaseResult = document.getElementById("firebaseResult");
var resumeFile = null;
var resumeUrl;

function handleSignUp(evt) {
    // Sign in with email and pass.
    var email = emailAddressInput.value;
    var password = passwordInput.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/email-already-in-use') {
        displayResult("already registered", "alert-danger");
        return;
      }
      else {
        console.log(errorCode);
        console.log(errorMessage);
      }
    });
    handelSubmit(evt);
    // [END createwithemail]
}

function addDataToFirebase(fname, lname, email, repEmail, github, school, majorSub, studyLevel, resumeUrl, pInterest, interest, dRestriction, shirtSize, beginner, linkedin) {

  regRef.child(repEmail).set({
    first_name: fname,
    last_name: lname,
    email: email,
    github: "https://github.com/"+github,
    school: school,
    major: majorSub,
    study_level: studyLevel,
    resume_url: resumeUrl,
    professional_interest: pInterest,
    interest: interest,
    dietary_restriction: dRestriction,
    shirt_size: shirtSize,
    beginner: beginner,
    linkedin: "https://linkedin.com/in/"+linkedin,
  }, function (error) {
    if (error) {
      displayResult("unsucessful", "alert-danger");
      // console.error(error);
    }
    else {
      displayResult("successful", "alert-success");
      regForm.reset();
    }
  });
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    resumeFile = evt.target.files[0];
}

function handelSubmit(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var fname = fnameInput.value;
  var lname = lnameInput.value;
  var email = emailAddressInput.value;
  var password = passwordInput.value;
  var github = githubInput.value;
  var school = schoolInput.value;
  var majorSub = majorSubInput.value;
  var studyLevel = studyLevelInput.value;
  var pInterest = pInterestInput.value;
  var interest = interestInput.value;
  var dRestriction = dRestrictionInput.value;
  var shirtSize = shirtSizeInput.value;
  var beginner = beginnerInput.value;
  var linkedin = linkedinInput.value;

  var metadata = {
    'contentType': resumeFile.type,
  };

  var repEmail = email.replace(/[@.#\[\]&]/g,'_');

  if(resumeFile.size <= 1024*1024*2) {
    regRef.once('value', function(snapshot) {
        if (!snapshot.hasChild(repEmail)) {

              // Upload resume to firebase storage.
              storageRef.child('resumes/' + repEmail + "/" + resume.pdf).put(resumeFile, metadata).then(function(snapshot) {
                // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                // console.log(snapshot.metadata);
                resumeUrl = snapshot.downloadURL;

                addDataToFirebase(fname, lname, email, repEmail, github, school, majorSub, studyLevel, resumeUrl, pInterest, interest, dRestriction, shirtSize, beginner, linkedin);
                // console.log('File available at', resumeUrl);
              }).catch(function(error) {
                // [START onfailure]
                // console.error('Upload failed:', error);
                // [END onfailure]
              });
        }
        else {
          displayResult("already registered", "alert-danger");
        }
    });
  }
  else {
    displayResult("big file", "alert-danger");
  }

}

function displayResult(message, message_type) {
  if (message=="unsucessful") {
    var display_message = "Registration Unsuccessful. ";
  }
  else if (message == "successful") {
    var display_message = "Registration Successful. ";
  }
  else if (message == "already registered") {
    var display_message = "Looks like you are already registered. If you think it's a mistake please contact us. ";
  }
  else if (message = "big file") {
    var display_message = "Resume file size is too big. Make sure you resume file is no bigger than 2 MB. ";
  }

  firebaseResult.innerHTML = "<div class='alert " + message_type + "'>"
    + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
    + "<strong>" + display_message + "</strong>"
    + "</div>";
}

window.onload = function() {
  resumeInput.addEventListener('change', handleFileSelect, false);
  regForm.addEventListener('submit', handleSignUp, false);
}
