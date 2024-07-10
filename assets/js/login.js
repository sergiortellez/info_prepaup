
function onSignIn(googleUser) {
    
    var profile = googleUser.getBasicProfile();
    let users = [
      "jmartine@up.edu.mx",
      "rlira@up.edu.mx",
      "dgarciap@up.edu.mx",
      "nmosqueda@up.edu.mx",
      "jgbarrios@up.edu.mx",
      "mcarreon@up.edu.mx",
      "bhikichi@up.edu.mx",
      "mfernandez@up.edu.mx",
      "jlbetancourt@up.edu.mx",
      "jgomezt@up.edu.mx",
      "sergio@huin.mx"
    ];
    let admins = [
      "obarajas@up.edu.mx",
      "jofierro@up.edu.mx",
      "syamal@up.edu.mx",
      "stellez@up.edu.mx",
      "forduno@up.edu.mx",
      "agperez@up.edu.mx"
    ];

    if(admins.includes(profile.getEmail())){
      window.open("portal.html","_self");
    }else if(users.includes(profile.getEmail())){
      window.open("portal.html","_self");
    }else{
      const errorSelector = document.querySelector('#error');
      errorSelector.style.visibility = 'visible';
    }
  }

  function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      const errorSelector = document.querySelector('#error');
      errorSelector.style.visibility = 'hidden';
    });
}