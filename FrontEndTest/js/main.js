function loadRecipes() {
  $.ajax({
    url: 'http://localhost:3000/recipes',
    //url: 'https://exam-final.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        //'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        addRecipe(data[i]._id,"https://i.imgur.com/XsaLqi1.jpg",data[i].name,data[i].difficulty,data[i].prep_time,data[i].cook_time)
      }
      setClick();
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function addRecipe(id,img,name,difficulty, prepTime,cookTime){
  var cookText = "";
  if(cookTime){
    cookText = `<h3>Tiempo de cocción: ${cookTime} min</h3>`
  }
  newHTML = `<li id="${id}">
      <img src=${img}></img>
      <div>
        <h2>${name}</h2>
        <h3>Dificultad: ${difficulty}</h3>
        <h3>Tiempo de preparación: ${prepTime} min</h3>
        ${cookText}
      </div>
  </li>`;
  $("#recipeHolder").append(newHTML);
}

loadRecipes();

function setClick(){
  $("li").click(function(event){
    console.log(this.id)
  });
}
