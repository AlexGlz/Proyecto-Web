var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

console.log(token)

if(token != "" && token != null){
  $("#btnUser").removeAttr("hidden");
  $("#btnLogIn").attr("hidden","");
  $("#btnLogOut").removeAttr("hidden");
}

$("#logo").click(function(){
  window.location = './index.html'
})

$("#btnUser").click(function(){
  window.location = './user.html'
})

$("#btnLogOut").click(function(){
 	dbLogOut();
})

$("#btnLogIn").click(function(){
  window.location = './login.html'
})

function dbLogOut(){
	$.ajax({
    url: 'http://localhost:3000/users/logout',
    //url: 'https://proy-final.herokuapp.com//users/login',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', "")
      window.location = './index.html'
    },
    error: function(error_msg) {
    	console.log(error_msg)
      alert((error_msg["responseText"]));
    }
  });
}

	