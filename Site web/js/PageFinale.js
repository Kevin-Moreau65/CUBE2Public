let State = 0;
//State = 0 = étape 1
//State = 1 = étape 2
//State = 2 = étape 3
function setStep ( Back, Current, Next, Step ) {
  $( "#BackStep" ).text( Back );
  $( "#SousTitre" ).text( Current );
  $( "#Etapetext" ).text( "Etape " + Step + "/3" );
  $( "#NextStep" ).text( Next );
}
$( "#Suivant" ).click( function () {
  let valeur = $( "#Barreetape" ).val();
  if ( State == 0 ) {
    GoForward( 1 );
    State++;
    setStep( "Paramètres de l'équipe", "Saisie des joueurs", "Apperçu", 2 );
    move( valeur, 0.66 );
  } else if ( State == 1 ) {
    GoForward( 2 );
    State++;
    setStep( "Saisie des joueurs", "Apperçu", "Valider", 3 );
    move( valeur, 1 );
  }
} );
$( "#Precedent" ).click( function () {
  let valeur = $( "#Barreetape" ).val();
  if ( State == 2 ) {
    GoBack( 3 );
    State--;
    setStep( "Paramètres de l'équipe", "Saisie des joueurs", "Apperçu", 2 );
    move( valeur, 0.66 );
  } else if ( State == 1 ) {
    GoBack( 2 );
    State--;
    setStep( "Menu Principal", "Paramètres de l'équipe", "Saisie des joueurs", 1 );
    move( valeur, 0.33 );
  } else if ( State == 0 ) {
    $( "#AlerteRetour, #Darken" ).show();
    $( "#AlerteRetour, #Darken" ).animate( { opacity: "1" }, 100 );
    $( "#Etapetext" ).text( "Etape 0/3" );
    move( valeur, 0 );
    return;
  }
} );

function GoBack ( i ) {
  iMoins = i--;
  $( "#Etape" + i ).toggleClass( "Passé" );
  $( "#Etape" + iMoins ).toggleClass( "PasPassé" );
}
function GoForward ( i ) {
  iPlus = i++;
  $( "#Etape" + i ).toggleClass( "PasPassé" );
  $( "#Etape" + iPlus ).toggleClass( "Passé" );
}

// 2 timer, un pour chaque flèches
var Precedent, Suivant;
var Timer = [ Precedent, Suivant ];
// Quand la souris passe sur les flèches
$( "#Suivant, #Precedent" ).hover(
  function () {
    // reset le timer de l'animation
    clearTimeout( Timer[ Timer.indexOf( $( this ).attr( "id" ) ) ] );
    // animation
    $( this ).animate( { width: "9.5em" }, 200 );
  },
  function () {
    // Délai de désactivation de l'animation
    DelayHover( this, $( this ).attr( "id" ) );
  }
);
function DelayHover ( Element, i ) {
  clearTimeout( Timer[ Timer.indexOf( i ) ] );
  // active le timer de la flèche correspondante
  Timer[ Timer.indexOf( i ) ] = setTimeout( function () {
    // remet la flèche dans sa taille d'origine
    $( Element ).animate( { width: "1.2em" }, 200 );
    return;
  }, 800 );
}
$( "#RetourMenu" ).click( function () {
  window.location.href = "/Site web/index.html";
} );
$( "#RetourPage" ).click( function () {
  $( "#AlerteRetour, #Darken" ).animate( { opacity: "0" }, 100 );
  setTimeout( function () {
    $( "#AlerteRetour, #Darken" ).hide();
  }, 100 );
} );




// INPUT TYPE FILE AFFICHER APPERCU AVANT ENVOI ////////////////////////////////////////

// BARRE DE CHARGEMENT -------------------------------------------------
function move ( value, nextvalue ) {
  //Cette fonction fait l'animation de la barre de progrès
  //value = valeur de la barre, nextvalue = valeur que doit prendre la barre
  //On vérifie d'abord si la valeur que doit prendre la barre est plus petite ou plus grande que
  //la valeur actuelle
  //Ici value est plus petit que nextvalue donc la barre doit monter
  if ( value < nextvalue ) {
    //On initialise un interval : la fonction frame sera appeller tout les 22 millième de seconde
    //tant que value ne sera pas égal a next value
    let int = setInterval( frame, 22 );
    function frame () {
      if ( value >= nextvalue ) {
        //Si la condition est remplie l'interval se stop
        clearInterval( int );
      } else {
        //sinon value s'incrémente de 0.01 puis envoie cette value a la barre de progression
        //Vu que l'intervalle est trés petit, cela donne une impression d'animation de la barre
        value += 0.01;
        $( "#Barreetape" ).val( value );
      }
    }
  } else {
    //Meme chose qu'en haut, hors vu que value est plus grand que nextvalue, la barre doit descendre
    let int = setInterval( frame, 22 );
    function frame () {
      if ( value <= nextvalue ) {
        clearInterval( int );
      } else {
        value -= 0.01;
        $( "#Barreetape" ).val( value );
      }
    }
  }
}

function remove ( ligne ) {
  $( ligne ).parent().parent().remove()
  console.log( ligne )
}




//   1-identifier tous les inputs
//   2- les afficher, mais sur le format d'un ligne du tableau  
//  Mais ne déclencher l'affichage des inputs que si l'user clique sur "Ajouter"

var ligne = 0

$( "#ajouter_joueur" ).click( function () {
  let numero
  numero = $( "#numero" ).val()

  if ( $( "#nom" ).val() == "" || $( "#prenom" ).val() == "" || $( "#numero" ).val() == "" || $( "#poste-select" ).val() == "--Choisisser un poste--" ) {
    alert( "veuillez remplir tous les champs" );
    console.log( $( ".case_form" ).val() )
    return;
  }
  else if ( numero < 1 ) {
    alert( "rentrez un numéro compris entre 1 et 44" );
    return;
  }
  else if ( numero > 44 ) {
    alert( "rentrez un numéro compris entre 1 et 44" );
    return;
  }
  else {
    $( "#Tableau" ).append(
      '<tr id= "joueur' + ligne + '" class="joueur" >' +
      '<td class="nom">' + $( "#nom" ).val() + "</td>" +
      '<td class="prenom">' + $( "#prenom" ).val() + "</td>" +
      '<td class="numero">' + $( "#numero" ).val() + "</td>" +
      '<td class="poste">' + $( "#poste-select" ).val() + "</td>" +
      '<input type="image" src="../img/icons8-supprimer-24.png" onclick="remove(this)"></tr>' )

    $( "#nom" ).val( "" );
    $( "#prenom" ).val( "" );
    $( "#numero" ).val( "" );
    ligne++

    $( '#poste-select option' ).prop( 'selected', function () { return this.defaultSelected; } );
  }

} );

// TRIER PAR POSTE --------------------------------------------------------

// marche à suivre : 1 identifier tous les id commencants par "joueur"



$( "#recap" ).click( function () {

  $( ".element_1 > .liste_joueurs" ).empty();

  var NBR_joueurs = 0
  
  for ( const [ key, value ] of Object.entries( $( ".joueur" ) ) ) {
    if ($(value).hasClass("joueur")) {
    NBR_joueurs++
    switch ( $( value ).children( ".poste" ).text() ) {
      case 'Attaquant':
        $( ".element_1 >#liste_attaquants" ).append(
          $( value ).children( ".nom" ).text() + " " + $( value ).children( ".prenom" ).text() + $( value ).children( ".numero" ).text() )
        break
      case 'Defenseur':
        $( ".element_1 > #liste_defenseurs" ).append(
          $( value ).children( ".nom" ).text() + " " + $( value ).children( ".prenom" ).text() + $( value ).children( ".numero" ).text() )
        break
      case 'Milieu':
        $( ".element_1 > #liste_milieux" ).append(
          $( value ).children( ".nom" ).text() + " " + $( value ).children( ".prenom" ).text() + $( value ).children( ".numero" ).text() )
        break
      case 'Gardien':
        $( ".element_1 > #liste_gardiens" ).append(
          $( value ).children( ".nom" ).text() + " " + $( value ).children( ".prenom" ).text() + $( value ).children( ".numero" ).text() )
        break
    }
  }}
  if ( NBR_joueurs < 17 ) {
    let joueurs_enmoins = 17 - NBR_joueurs
    alert( "veuillez rentrer" + joueurs_enmoins + "joueur(s) supplémentaire(s)" )
  }
  else if ( NBR_joueurs > 17 ) {
    let joueurs_enplus = NBR_joueurs - 17
    alert( "Veuillez retirer" + joueurs_enplus + "joueur(s)" )
  }



} )














// INPUT TYPE FILE AFFICHER APPERCU AVANT ENVOI ////////////////////////////////////////


$( document ).ready( function ( e ) {
  $( 'input[id="embleme"]' ).on( 'change', ( e ) => {
    console.log( 'change file' );
    let that = e.currentTarget
    if ( that.files && that.files[ 0 ] ) {
      $( that ).next( '.embleme' ).html( that.files[ 0 ].name )
      let reader = new FileReader()
      reader.onload = ( e ) => {
        $( '#imgembleme' ).attr( 'src', e.target.result )
        $( '#imgembleme' ).attr( 'class', 'logo' )
      }
      reader.readAsDataURL( that.files[ 0 ] )
    }
  } )
} );

$( document ).ready( function ( e ) {
  $( 'input[id="maillot_domicile"]' ).on( 'change', ( e ) => {
    console.log( 'change file' );
    let that = e.currentTarget
    if ( that.files && that.files[ 0 ] ) {
      $( that ).next( '.maillot_domicile' ).html( that.files[ 0 ].name )
      let reader = new FileReader()
      reader.onload = ( e ) => {
        $( '#imgMD' ).attr( 'src', e.target.result )
        $( '#imgMD' ).attr( 'class', 'mdomicile' )
      }
      reader.readAsDataURL( that.files[ 0 ] )
    }
  } )
} );

$( document ).ready( function emblemeIMG ( e ) {
  $( 'input[id="maillot_exterieur"]' ).on( 'change', ( e ) => {
    console.log( 'change file' );
    let that = e.currentTarget
    if ( that.files && that.files[ 0 ] ) {
      $( that ).next( '.maillot_exterieur' ).html( that.files[ 0 ].name )
      let reader = new FileReader()
      reader.onload = ( e ) => {
        $( '#imgME' ).attr( 'src', e.target.result )
        $( '#imgME' ).attr( 'class', 'mexterieur' )
      }
      reader.readAsDataURL( that.files[ 0 ] )
    }
  } )
} );

$( document ).ready( function ( e ) {
  $( 'input[id="maillot_alternatif"]' ).on( 'change', ( e ) => {
    console.log( 'change file' );
    let that = e.currentTarget
    if ( that.files && that.files[ 0 ] ) {
      $( that ).next( '.maillot_alternatif' ).html( that.files[ 0 ].name )
      let reader = new FileReader()
      reader.onload = ( e ) => {
        $( '#imgMA' ).attr( 'src', e.target.result )
        $( '#imgMA' ).attr( 'class', 'malternatif' )
      }
      reader.readAsDataURL( that.files[ 0 ] )
    }
  } )
} );


// Nom de l'équipe : 
$( document ).ready( function () {
  $( "#nom_equipe" ).on( "input", function () {
    $( "#print_NE" ).text( $( this ).val() );
  } );
} );
// Emblême:

$( document ).ready( function () {
  $( "#embleme" ).on( "input", function () {
    $( "#print_E" ).text( $( this ).val() );
  } );
} );

// Maillot domicile : 

$( document ).ready( function () {
  $( "#maillot_domicile" ).on( "input", function () {
    $( "#print_MD" ).text( $( this ).val() );
  } );
} );

// Maillot Extérieur : 

$( document ).ready( function () {
  $( "#maillot_exterieur" ).on( "input", function () {
    $( "#print_ME" ).text( $( this ).val() );
  } );
} );

// maillot Alternatif :

$( document ).ready( function () {
  $( "#maillot_alternatif" ).on( "input", function () {
    $( "#print_MA" ).text( $( this ).val() );
  } );
} );


function standardNom ( string ) {
  let array = string.split( " " )
  let modified = []
  array.forEach( nom => {
    nom = nom[ 0 ].toUpperCase() + nom.slice( 1 ).toLowerCase();
    modified.push( nom )
  } );
  return modified.join( " " )
}
//Pour standardiser les nom : kyLLyan MBAPPe => Kyllyan Mbappe
$( "#Sendtodb" ).click( function () {

  let joueursTAB = []
  // let JoueurPrenom = []
  // let JoueurNumero = []
  // let JoueurPoste = []

  for ( const [ key, value ] of Object.entries( $( ".joueur" ) ) ) {
    if ( $( value ).hasClass( "joueur" ) ) {
      let TMPjoueurNom = $( value ).children( ".prenom" ).text() + " " + $( value ).children( ".nom" ).text()
      TMPjoueurNom = standardNom( TMPjoueurNom )
      let TMPJoueurNumero = $( value ).children( ".numero" ).text()
      let TMPJoueurPoste = $( value ).children( ".poste" ).text()
      joueursTAB.push( [ TMPjoueurNom, TMPJoueurNumero, TMPJoueurPoste ] )
    }
  }


  let joueursTABstring = JSON.stringify( joueursTAB )   //json Tableau
  let team = $( "#print_NE" ).text()
  team = standardNom( team )


  $.post( "/php/addteam.php", { joueursTAB: joueursTABstring, team: team }, function ( data ) {
    console.log( data )
  } )




} )

