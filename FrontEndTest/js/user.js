var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

console.log(token)


function loadRecipes() {
  $.ajax({
    url: 'http://localhost:3000/recipes/userRecipes',
    //url: 'https://exam-final.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        addRecipe(data[i]._id,data[i].photo_url,data[i].name,data[i].difficulty,data[i].prep_time,data[i].cook_time,data[i].clasif)
      }
      setClick();
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function addRecipe(id,img,name,difficulty, prepTime,cookTime,clasif){
  var cookText = "";
  var difficultyText;
  var clasifTxt = "";
  clasif.forEach(function(name){
    clasifTxt += " "+name+" /";
  })
  clasifTxt = clasifTxt.substring(0,clasifTxt.length-1)
  if(cookTime){
    cookText = `<h3>Tiempo de cocción: ${cookTime} min</h3>`
  }
  switch(difficulty){
    case 1: 
      difficultyText = "Fácil"
      color = "green";
      break;
    case 2:
      difficultyText = "Intermedio"
      color = "orange";
      break;
    case 3:
      difficultyText = "Difícil"
      color = "red";
      break;
  }
  newHTML = `<li id="${id}" style="margin-bottom:0px">
      <img class="previewImg" src=${img}></img>
      <div>
        <div><h2 class="rTitle">${name}</h2><h4 class="rClasif">${clasifTxt}</h4></div>
        <div style=""></div>
        <h3 >Dificultad: <b class="${color}">${difficultyText}</b></h3>
        <h3>Tiempo de preparación: ${prepTime} min</h3>
        ${cookText}
      </div>
      <div style="clear:both"></div>
  </li>
    <div class="btnContainer">
          <button class="btnMenu btnView" value="${id}">Ver</button><button class="btnMenu btnEdit" value="${id}">Editar</button><button class="btnMenu btnDelete" value="${id}">Eliminar</button>
    </div> `;
  $("#recipeHolder").append(newHTML);
}

loadRecipes();


function clickedView(event){
	window.open("./receta.html?receta="+ this.value,"_self");
}


function setClick(){
	$(".btnView").click(clickedView)
}
