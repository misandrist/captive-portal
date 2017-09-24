// function checkEmail() {
//       var email = document.getElementById('email-address');
//       var button = document.getElementById('enter');
//       var filter = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
//       button.addEventListener("click", function(e){
//         e.preventDefault();
//         validator.isEmail(email.value, {allow_utf8_local_part: true, require_tld: true}) = true; 
//         if (!filter.test(email.value)) {
//           alert('Please provide a valid email address.');
//           email.focus;
//           return false;
//         }
//       if(filter.test(email.value)){
//           form.submit();
//           parent.location.href="next.html";
//        }
//       })
//     }
  