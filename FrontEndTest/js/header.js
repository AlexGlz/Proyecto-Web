var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

console.log(token)

if(token != ""){
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
  localStorage.setItem('token', "")
  window.location = './index.html'
})

$("#login").click(function(){
  window.location = './login.html'
})