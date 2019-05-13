
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}
console.log(token)

var url_string = window.location.href
var url = new URL(url_string);
var recetaId = url.searchParams.get("receta");

loadRecipe()

function loadRecipe() {
  $.ajax({
    //url: 'http://localhost:3000/recipes/'+recetaId,
    url: 'https://proy-final.herokuapp.com/recipes/'+recetaId,
    headers: {
        'Content-Type':'application/json',
        //'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
    	var difficultyText = "";
      	$("#nombre").html(data.name)
      	$("#prep_time").html(data.prep_time + " mins")
      	tiempoCocina = data.cook_time
      	if(data.cook_time == null) tiempoCocina = 0
      	$("#cook_time").html(tiempoCocina + " mins")
      	switch(data.difficulty){
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
		$("#imgReceta").attr("src",data.photo_url);
		$("#difficulty").html(difficultyText)
		$("#difficulty").addClass(color)
		$("#porciones").html(" "+data.servings)

		 var clasifTxt = "";
		 data.clasif.forEach(function(name)
		 {
		 	clasifTxt += " "+name+" /";
		 })
		 clasifTxt = clasifTxt.substring(0,clasifTxt.length-1);
		 $("#clasificaciones").html(clasifTxt);


		for (var i = data.ingredients.length - 1; i >= 0; i--) {
			$("#ingredients").append(`<li>${data.ingredients[i]}</li>`)
		}

		for (var i = data.steps.length - 1; i >= 0; i--) {
			$("#steps").append(`<li>${data.steps[data.steps.length -i -1]}</li>`)
		}

		 $("#calorias").html(data.nutrition.kcal);
		 $("#grasas").html(data.nutrition.fat + " g");
		 $("#saturadas").html(data.nutrition.saturates + " g");
		 $("#azucar").html(data.nutrition.sugar + " g");
		 $("#sal").html(data.nutrition.salt + " g");
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}