var url_string = window.location.href
var url = new URL(url_string);
var recetaId = url.searchParams.get("receta");

loadRecipe()

function loadRecipe() {
  $.ajax({
    url: 'http://localhost:3000/recipes/'+recetaId,
    //url: 'https://exam-final.herokuapp.com/todos',
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
      	$("#cook_time").html(data.cook_time + " mins")
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
		$("#difficulty").html(difficultyText)
		$("#difficulty").addClass(color)
		$("#porciones").html(" "+data.servings)

		for (var i = data.ingredients.length - 1; i >= 0; i--) {
			$("#ingredients").append(`<li>${data.ingredients[i]}</li>`)
		}

		for (var i = data.steps.length - 1; i >= 0; i--) {
			$("#steps").append(`<li>${data.ste[i]}</li>`)
		}
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}