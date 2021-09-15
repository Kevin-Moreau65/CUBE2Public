function trclick(Id)
{ 
    document.location.href="/Site web/html/SeeTeam3.php?id="+Id
};

$("#valider").click(function(){

    let poste = $("#poste-select")
    alert(poste);
  $.post( "/Site web/php/mofi_joueur.php", { newposte : poste }, function ( data ) {
    console.log( data )
    document.location.href ="/Site web/php/mofi_joueur.php"
  } )
})