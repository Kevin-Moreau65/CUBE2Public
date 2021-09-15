$( "#Filter" ).click( function () {
    $( "#FilterPOPUP, #Darken" ).show()
    $( "#FilterPOPUP" ).css( { display: "flex" } )
    $( "#FilterPOPUP, #Darken" ).animate( { opacity: 1 }, 200 )
} )
$( ".Cancel" ).click( function () {
    let target = $( this ).parent().parent().attr( "id" )
    $( "#" + target + ", #Darken" ).animate( { opacity: 0 }, 200 )
    setTimeout( function () {
        $( "#" + target + ", #Darken" ).hide()
    }, 200 )
} )
$( document ).ready( function () {
    let matchAFaire = $( "#AFaire > .content" ).children().length
    let matchFait = $( "#Fait > .content" ).children().length
    if ( matchAFaire === 0 ) {
        $( "#AFaire" ).remove()
    }
    if ( matchFait === 0 ) {
        $( "#Fait" ).remove()
    }
} )
$( ".Match" ).click( function () {
    if ( $( this ).hasClass( "Prepared" ) ) {
        window.location.href = '/Site web/html/CreateMatch.php?id=' + $( this ).attr( "id" ) + ''
    } else {
        window.location.href = '/Site web/html/PlayMatch.php?id=' + $( this ).attr( "id" ) + ''
    }
} )