window.onload = function() {

    firebase.firestore().collection("coupons").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().file_name}`);

             document.getElementById(
              "main-table-body").innerHTML += `<tr class="table-primary"> <td>${ doc.data().title}</td>
                              
                    <td> ${ doc.data().validTill } </td>
                          <td >  <button  onclick="deleteCoupon('${doc.id}')" class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent">
                <i class="material-icons">delete_forever</i>
              </button>
               </td>
                  </tr>`;
    });
});}

function deleteCoupon(doc_id){
  
    firebase.firestore().collection("coupons").doc(doc_id).delete().then((doc) => {
    alert("Document successfully deleted!");
    location.reload();
}).catch((error) => {
    alert("Error removing document: ", error);
});
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
           dialoglogin.close();
           $(".login-cover").hide();
            $(".signdail").hide();
             $(".signupdail").hide();
            $(".signin").show();
    $(".signup").show();
    $(".ldng").hide();
    } else {
        // No user is signed in.
        $(".login-cover").show();
        $(".signupdail").show();
dialoglogin.showModal();  
    }
});

function logout() {
    $("#signdail").show(); 
    firebase.auth().signOut();
}






$(".login-cover").hide();

var dialoglogin = document.querySelector('#signdail');
var dialogsignup = document.querySelector('#signupdail');


dialoglogin.showModal();  





function SignUp(){

    var userEmail = document.getElementById("email_field").value;
   


    $(".signin").hide();
    $(".signup").hide();
    $(".ldng").show();


    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert('Error in Signup' + errorMessage);
        $(".signin").show();
    $(".signup").show();
    $(".ldng").hide();


        // ...
      });


}



function login() {

    var userEmail1 = document.getElementById("email_field1").value;
    var userPass1 = document.getElementById("password_field1").value;


    $(".signin").hide();
    $(".signup").hide();
    $(".ldng").show();

    firebase.auth().signInWithEmailAndPassword(userEmail1, userPass1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });




}




function signTolog(){




var dialoglogin = document.querySelector('#signdail');
var dialogsignup = document.querySelector('#signupdail');
 dialoglogin.showModal();

dialogsignup.close();  
 

}



function logToSign(){

    var dialogsignup = document.querySelector('#signupdail');
    var dialoglogin = document.querySelector('#signdail');


     dialoglogin.close();
    dialogsignup.showModal();  


}




function tabledel(id){
    alert(id);
}








var files = [];
document.getElementById("files").addEventListener("change", function(e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

document.getElementById("send").addEventListener("click", function() {

    var coupon_title = document.getElementById("coupon_title").value
     var coupon_id = document.getElementById("coupon_id").value
      var coupon_location = document.getElementById("coupon_location").value
       var coupon_story_description = document.getElementById("coupon_story_description").value
        var coupon_story_title = document.getElementById("coupon_story_title").value
         var coupon_valid = document.getElementById("coupon_valid").value



  //checks if files are selected
  if (files.length != 0 && coupon_title.length != 0 && coupon_id.length != 0 && coupon_location.length != 0 && coupon_story_description.length != 0 && coupon_story_title.length != 0 && coupon_valid.length != 0 ) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference
      var storage = firebase.storage().ref('ads');

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },

        function complete() {
        
          upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);

       document.getElementById(
            "uploading"
          ).innerHTML += `${downloadURL} available here <br />`;





        firebase.firestore().collection("coupons").add({
                title: coupon_title,
                id: coupon_id,
                location: coupon_location,
                storyDescription: coupon_story_description,
                storyTitle: coupon_story_title,
                validTill: coupon_valid,
                image: downloadURL,
                uploaded_at: Date().valueOf(),
                time_stamp:Date.now(),


                
            })
            .then((docRef) => {
                alert("Coupon Uploaded ");
                   document.getElementById("files").value = null;
                    document.getElementById("coupon_title").value = null;
 document.getElementById("coupon_id").value = null;
       document.getElementById("coupon_location").value = null;
       document.getElementById("coupon_story_description").value = null;
         document.getElementById("coupon_story_title").value = null;
      document.getElementById("coupon_valid").value = null;

                location.reload();
            })
            .catch((error) => {

                alert("Error adding document: ", error);
            });

    });

        }
      );
    }
  } else {
    alert("please provide all details");
  }
})