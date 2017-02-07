var auth = firebase.auth();
var storageRef = firebase.storage().ref();
var regForm = document.getElementById('regForm');
var fnameInput = document.getElementById('fname');
var lnameInput = document.getElementById('lname');
var emailAddressInput = document.getElementById('emailAdd');
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
var resumeFile = null;

function addDataToFirebase(fname, lname, email, github, school, majorSub, studyLevel, pInterest, interest, dRestriction, shirtSize, beginner, linkedin) {
  var repEmail = email.replace(/[@.#\[\]&]/g,'_');
  var ref = firebase.database().ref('registration');
  ref.once('value', function(snapshot) {
        if (!snapshot.hasChild(repEmail)) {
            ref.child(repEmail).set({
              first_name: fname,
              last_name: lname,
              email: email,
              github: github,
              school: school,
              major: majorSub,
              study_level: studyLevel,
              professional_interest: pInterest,
              interest: interest,
              dietary_restriction: dRestriction,
              shirt_size: shirtSize,
              beginner: beginner,
              linkedin: linkedin,
            }, function (error) {
              if (error) {
                var firebaseSuccess = document.getElementById("firebaseSuccess");
                firebaseSuccess.innerHTML = "<div class='alert alert-danger'>"
                  + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
                  + "<strong>Registration Unsuccessful. </strong>"
                  + "</div>";
                regForm.reset();
                console.error(error);
              }
              else {
                var firebaseSuccess = document.getElementById("firebaseSuccess");
                firebaseSuccess.innerHTML = "<div class='alert alert-success'>"
                  + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
                  + "<strong>Registration Successful. </strong>"
                  + "</div>";
                regForm.reset();
              }
            });
        }
        else {
          var firebaseSuccess = document.getElementById("firebaseSuccess");
          firebaseSuccess.innerHTML = "<div class='alert alert-success'>"
            + "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            + "<strong>Looks like you are already registered. If you think it's a mistake contact us.</strong>"
            + "</div>";
          regForm.reset();
        }
    });
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    resumeFile = evt.target.files[0];
    console.log(resumeFile.metadata);
}

function handelSubmit(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  // var metadata = {
  //   'contentType': resumeFile.type,
  // };

  var fname = fnameInput.value;
  var lname = lnameInput.value;
  var email = emailAddressInput.value;
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

  // // Upload resume to firebase storage.
  // storageRef.child('resumes/' + resumeFile.name).put(resumeFile, metadata).then(function(snapshot) {
  //   console.log('Uploaded', snapshot.totalBytes, 'bytes.');
  //   console.log(snapshot.metadata);
  //   var resumeUrl = snapshot.downloadURL;
  //   console.log('File available at', url);
  // }).catch(function(error) {
  //   // [START onfailure]
  //   console.error('Upload failed:', error);
  //   // [END onfailure]
  // });

  addDataToFirebase(fname, lname, email, github, school, majorSub, studyLevel, pInterest, interest, dRestriction, shirtSize, beginner, linkedin);
}
window.onload = function() {
  // resumeInput.addEventListener('change', handleFileSelect, false);
  regForm.addEventListener('submit', handelSubmit, false);
  resume.disabled = true;
  auth.onAuthStateChanged(function(user) {
    if (user) {
      resume.disabled = false;
    } else {
      console.log('There was firebase session. Creating a new session.');
      // Sign the user in anonymously since accessing Storage requires the user to be authorized.
      auth.signInAnonymously();
    }
  });
}
