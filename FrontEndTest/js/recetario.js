
function loadRecipes() {
  $.ajax({
    //url: 'http://localhost:3000/recipes',
    url: 'https://proy-final.herokuapp.com/recipes',
    headers: {
        'Content-Type':'application/json',
        //'Authorization': 'Bearer ' + token
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
  newHTML = `<li id="${id}">
      <img class="previewImg" src=${img}></img>
      <div>
        <div><h2 class="rTitle">${name}</h2><h4 class="rClasif">${clasifTxt}</h4></div>
        <div style=""></div>
        <h3 >Dificultad: <b class="${color}">${difficultyText}</b></h3>
        <h3>Tiempo de preparación: ${prepTime} min</h3>
        ${cookText}
      </div>
    </li>`;
  $("#recipeHolder").append(newHTML);
}

loadRecipes();

function setClick(){
  $("li").click(function(event){
    window.open("./receta.html?receta="+ this.id,"_self");
  });
}

$("#btnBuscar").click(function(event){
  
  var txtBuscar = $("#txtBuscar").val()
  var txtClasif = $("#selectClasif").val()
  if(!txtClasif || txtClasif == "Todas"){
    txtClasif=""
  }
  console.log("Buscando: "+txtBuscar + "\nClasif: "+txtClasif);
  $("#recipeHolder").html("");
  getRecipeFilter(txtBuscar,txtClasif);
})

function getRecipeFilter(txtBuscar, clasif){
  $.ajax({
    //url: 'http://localhost:3000/recipes/filter?name='+txtBuscar+"&clasif="+clasif,
    url: 'https://proy-final.herokuapp.com/recipes/filter?name='+txtBuscar+"&clasif="+clasif,
    headers: {
        'Content-Type':'application/json',
        //'Authorization': 'Bearer ' + token
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

