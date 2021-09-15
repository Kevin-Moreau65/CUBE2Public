const queryString = window.location.search
const urlParams = new URLSearchParams( queryString )
const idMatch = urlParams.get( 'id' )
let exist = false
let alternatif = [
    false,
    false
]
$( "#BoutonGauche, #BoutonGaucheE" ).change( function () {
    let maillot;
    let cote;
    let camp;
    let i = $( this ).val()
    /*Bouton de changement d'équipe*/
    if ( $( this ).attr( 'id' ) === 'BoutonGauche' ) {
        maillot = ".MaillotD"
        cote = 'CheminMaillotDom'
        camp = 'domicile'
        $( "SwitchDOM" ).prop( 'checked', false )
        alternatif[ 0 ] = false
        $( ".CategorieDOM" ).empty()
        Selectchange( 'Dom' )
        $( "#CapDOM" ).show()
        $.when( SetMaillot( i, "MaillotD", "CategorieDOM", cote, camp ) ).done( drag() )
        RefreshMaillot( 'DOM' );
    } else {
        maillot = ".MaillotDE"
        cote = 'CheminMaillotExt'
        camp = 'exterieur'
        $( "switchEXT" ).prop( 'checked', false )
        alternatif[ 1 ] = false
        $( ".categorieEXT" ).empty()
        Selectchange( 'Ext' )
        $( "#CapEXT" ).show()
        $.when( SetMaillot( i, "MaillotDE", "categorieEXT", cote, camp ) ).done( drag() )
        RefreshMaillot( 'EXT' );
    }
} );

function SetMaillot ( value, maillot, chemin, cote, camp ) {
    $.post( "/php/joueur.php", { team: value, donnee: cote }, function ( data ) {
        let team = jQuery.parseJSON( data )
        let i = 1;
        for ( const joueur of team.attaquant ) {
            $( ".Float.Attaquant." + chemin ).append( '<div class="MaillotG ' + camp + '" >' +
                '<div id="' + maillot + '_' + joueur[ 2 ] + '" class="Image"><img src="' + team.chemin + '"/></div>' +
                '<h4 class="Nom">' + SetName( joueur[ 0 ] ) + '</h4>' +
                '<h4 class="Numero">' + joueur[ 1 ] + '</h4></div>' )
            i++
        }
        for ( const joueur of team.milieu ) {
            $( ".Float.Milieu." + chemin ).append( '<div class="MaillotG ' + camp + '" >' +
                '<div id="' + maillot + '_' + joueur[ 2 ] + '" class="Image"><img src="' + team.chemin + '"/></div>' +
                '<h4 class="Nom">' + SetName( joueur[ 0 ] ) + '</h4>' +
                '<h4 class="Numero">' + joueur[ 1 ] + '</h4></div>' )
            i++
        }
        for ( const joueur of team.defenseur ) {
            $( ".Float.Defenseur." + chemin ).append( '<div class="MaillotG ' + camp + '" >' +
                '<div id="' + maillot + '_' + joueur[ 2 ] + '" class="Image"><img src="' + team.chemin + '"/></div>' +
                '<h4 class="Nom">' + SetName( joueur[ 0 ] ) + '</h4>' +
                '<h4 class="Numero">' + joueur[ 1 ] + '</h4></div>' )
            i++
        }
        for ( const joueur of team.gardien ) {
            $( ".Float.Gardien." + chemin ).append( '<div class="MaillotG ' + camp + '" >' +
                '<div id="' + maillot + '_' + joueur[ 2 ] + '" class="Image"><img src="/Site web/img/maillot-gardien.png"/></div>' +
                '<h4 class="Nom">' + SetName( joueur[ 0 ] ) + '</h4>' +
                '<h4 class="Numero">' + joueur[ 1 ] + '</h4></div>' )
            i++
        }
    } )
}
//Création d'une classe permettant de pouvoir stocker le left et le top/bottom en une seule variable
class posmaillot {
    constructor( left, botop ) {
        this.left = left + "%";
        this.botop = botop + "%";
    }
}
let form442 = [
    //Le none est là pour que le tableau commence a l'index 1
    "none",
    //Les maillots sont dans l'ordre et ont le left puis le top/bottom
    new posmaillot( 39.5, 13 ),
    new posmaillot( 53.5, 13 ),
    new posmaillot( 28, 33 ),
    new posmaillot( 38, 33 ),
    new posmaillot( 55, 33 ),
    new posmaillot( 65, 33 ),
    new posmaillot( 28, 27 ),
    new posmaillot( 38, 27 ),
    new posmaillot( 55, 27 ),
    new posmaillot( 65, 27 ),
];
let form442los = [
    "none",
    new posmaillot( 39.5, 13 ),
    new posmaillot( 53.5, 13 ),
    new posmaillot( 46.5, 28 ),
    new posmaillot( 39, 40 ),
    new posmaillot( 54, 40 ),
    new posmaillot( 46.5, 52 ),
    new posmaillot( 29, 30 ),
    new posmaillot( 39, 17 ),
    new posmaillot( 54, 17 ),
    new posmaillot( 64, 30 ),
];
let formCDM = [
    "none",
    new posmaillot( 46.5, 13 ),
    new posmaillot( 33, 33 ),
    new posmaillot( 46.5, 33 ),
    new posmaillot( 60, 33 ),
    new posmaillot( 39, 46 ),
    new posmaillot( 54, 46 ),
    new posmaillot( 28, 27 ),
    new posmaillot( 39, 17 ),
    new posmaillot( 54, 17 ),
    new posmaillot( 65, 27 ),
];
let form532 = [
    "none",
    new posmaillot( 40, 10 ),
    new posmaillot( 53, 10 ),
    new posmaillot( 34, 30 ),
    new posmaillot( 46.5, 38 ),
    new posmaillot( 59.5, 30 ),
    new posmaillot( 28.5, 47.5 ),
    new posmaillot( 36, 23 ),
    new posmaillot( 46.5, 18 ),
    new posmaillot( 57, 23 ),
    new posmaillot( 64.5, 32.5 ),
];
//Ce tableau est la pour permettre de retrouver une formation grace a la value de la liste de Selection
let formarray = [ form442, form442los, formCDM, form532 ];
//Maillot = l'id, leftpos = left, botoppos = top/bottom, i pour identifier si il faut mettre bottom ou top
function FormationMaillot ( Maillot, leftpos, botoppos, i ) {
    if ( i <= 6 ) {
        $( Maillot ).animate( { left: leftpos, top: botoppos }, 250 );
    } else {
        $( Maillot ).animate( { left: leftpos, bottom: botoppos }, 250 );
    }
}
$( "#BoutonDroit, #BoutonDroitE" ).change( function () {
    //Si la dernière lettre de l'id de la liste est t, c'est automatiquement la formation de
    //l'équipe a domicile que l'on doit changer
    if ( $( this ).attr( "id" ).slice( -1 ) === "t" ) {
        //On retrouve la formation voulue grace a la value de la liste et le tableau contenant toute les
        //formations
        array = formarray[ $( this ).val() ];
        for ( i = 1; i <= 10; i++ ) {
            //i commence a 1 pour faciliter la Selection des maillots
            array[ i ];
            FormationMaillot( "#TerrainMaillot > #Maillot" + i, array[ i ].left, array[ i ].botop, i );
        }
    } else {
        array = formarray[ $( this ).val() ];
        for ( i = 1; i <= 10; i++ ) {
            array[ i ];
            FormationMaillot( "#TerrainMaillot > #Maillot" + i + "E", array[ i ].left, array[ i ].botop, i );
        }
    }
} );
/*-----------------------------Bouton droite et gauche-----------------------------------------------------------------------------*/
let State = 0;
//State = 0 = étape 1
//State = 1 = étape 2
//State = 2 = étape 3
function setStep ( Back, Current, Next, Step ) {
    $( "#BackStep" ).text( Back );
    $( "#SousTitre" ).text( Current );
    $( "#EtapeText" ).text( "Etape " + Step + "/3" );
    $( "#NextStep" ).text( Next );
    drag();
}
$( "#Suivant" ).click( function () {
    let valeur = $( "#BarreEtape" ).val();
    if ( State == 0 ) {
        GoForward( 1 );
        State++;
        setStep( "Paramètres du match", "Equipe domicile", "Equipe extérieur", 2 );
        move( valeur, 0.66 );
    } else if ( State == 1 ) {
        GoForward( 2 );
        State++;
        setStep( "Equipe domicile", "Equipe extérieur", "Lancement du match", 3 );
        move( valeur, 1 );
    } else {
        $( "#Sauvegarder, #Darken" ).show()
        $( "#Sauvegarder" ).css( { display: 'flex' } )
        $( "#Sauvegarder, #Darken" ).animate( { opacity: 1 }, 200 )
    }
} );
$( "#Precedent" ).click( function () {
    let valeur = $( "#BarreEtape" ).val();
    if ( State == 2 ) {
        GoBack( 3 );
        State--;
        setStep( "Paramètres du match", "Equipe domicile", "Equipe extérieur", 2 );
        move( valeur, 0.66 );
    } else if ( State == 1 ) {
        GoBack( 2 );
        State--;
        setStep( "Menu principal", "Paramètres du match", "Equipe domicile", 1 );
        move( valeur, 0.33 );
    } else if ( State == 0 ) {
        $( "#AlerteRetour, #Darken" ).show();
        $( "#AlerteRetour, #Darken" ).animate( { opacity: "1" }, 100 );
        $( "#EtapeText" ).text( "Etape 0/3" );
        move( valeur, 0 );
        return;
    }
} );

function GoBack ( i ) {
    iMoins = i--;
    $( "#Etape" + i ).toggleClass( "Passé" );
    $( "#Etape" + iMoins ).toggleClass( "PasPasse" );
}

function GoForward ( i ) {
    iPlus = i++;
    $( "#Etape" + i ).toggleClass( "PasPasse" );
    $( "#Etape" + iPlus ).toggleClass( "Passé" );
}
// 2 timer, un pour chaque flèches
let Precedent, Suivant;
let Timer = [ Precedent, Suivant ];
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
    let valeur = $( "#BarreEtape" ).val();
    $( "#AlerteRetour, #Darken" ).animate( { opacity: "0" }, 100 );
    setTimeout( function () {
        $( "#AlerteRetour, #Darken" ).hide();
    }, 100 );
    move( valeur, 0.33 );
    $( "#EtapeText" ).text( "Etape 1/3" );
} );
/*----------------------------------------------------------------------------------------------------------*/
function RefreshMaillot ( side ) {
    let target, cote, banc
    if ( side === 'DOM' ) {
        target = '#Etape2>#TerrainMaillot>'
        cote = '.domicile'
        banc = '#Etape2>.MenuDroit>#Droite>div'
    } else {
        target = '#Etape3>#TerrainMaillot>'
        cote = '.exterieur'
        banc = '#Etape3>.MenuDroit>#Droite>div'
    }
    //Cette fonction sert a reset les maillot des terrain ainsi que ceux dispo en cas de changement d'équipe
    $( target + ".MaillotT>.Image>img" ).attr( "src", "/Site web/img/maillot-blanc.png" );
    $( target + ".MaillotT>.Image>img.OnCap" ).remove()
    $( target + '.MaillotT>.Image' ).removeClass( 'Taken' )
    $( target + '.MaillotT' ).draggable( { disabled: true } )
    //On réattribut des maillot blanc aux maillots du terrain puis on les remet d'origine
    $( target + ".MaillotT>img.Capitaine" ).remove();
    //On enlève le capitaine
    $( target + ".MaillotT>h4" ).css( { opacity: "0" } );
    $( target + ".MaillotT" ).css( { opacity: "0.5" } );
    $( cote ).show();
    //On affiche tout les maillot des joueurs dispo
    $( banc ).remove();
    //On supprime tout les joueurs coté remplacant
}
let remplacant = 0, remplacantE = 0
function nombreRemplacant ( add ) {
    if ( State === 1 ) {
        if ( add ) {
            //Si oui on incrémente le nombre de remplacant
            remplacant++;
            //Puis on actualise l'affichage
            $( "#Etape2>.MenuDroit>#Droite>#ColoneBanc" ).text( "BANC (" + remplacant + "/11)" );
        } else {
            //Si le maillot qui vient d'etre drop vient de la zone remplacant c'est qu'on a enlever un remplacant
            remplacant--;
            //On décrémente puis on actualise
            $( "#Etape2>.MenuDroit>#Droite>#ColoneBanc" ).text( "BANC (" + remplacant + "/11)" );
        }
        if ( remplacant >= 6 ) {
            //Si le nombre de remplacant est supérieur ou égal a 1 on estime que l'utilisateur a pris connaissance
            //du nombre mini de remplacant nécessaire, on enlève le message
            $( "#Etape2>.MenuDroit>#Droite>#Warning" ).text( " " );
        } else {
            //Si le nombre de remplacant retombe a 0, on remet le warning
            $( "#Etape2>.MenuDroit>#Droite>#Warning" ).text( "Il faut un minimum de 6 remplacants" );
        }
    } else {
        //On vérifie si le maillot a était drop sur la zone des remplacant
        if ( add ) {
            //Si oui on incrémente le nombre de remplacant
            remplacantE++;
            //Puis on actualise l'affichage
            $( "#Etape3>.MenuDroit>#Droite>#ColoneBanc2" ).text( "BANC (" + remplacantE + "/11)" );
        } else {
            //Si le maillot qui vient d'etre drop vient de la zone remplacant c'est qu'on a enlever un remplacant
            remplacantE--;
            //On décrémente puis on actualise
            $( "#Etape3>.MenuDroit>#Droite>#ColoneBanc2" ).text( "BANC (" + remplacantE + "/11)" );
        }
        if ( remplacantE >= 6 ) {
            //Si le nombre de remplacant est supérieur ou égal a 1 on estime que l'utilisateur a pris connaissance
            //du nombre mini de remplacant nécéssaire, on enlève le message
            $( "#Etape3>.MenuDroit>#Droite>#Warning" ).text( " " );
        } else {
            //Si le nombre de remplacant retombe a 0, on remet le warning
            $( "#Etape3>.MenuDroit>#Droite>#Warning" ).text( "Il faut un minimum de 6 remplacants" );
        }
    }
}

function Selectchange ( Select ) {
    //Cette fonction permet de masquer l'équipe selectionner dans l'autre liste, ce qui empeche de
    //selectionner deux fois la meme équipe
    //Value va prendre la valeur de l'élément de la liste sélectionner
    let value;
    //On vérifie si la liste où l'élément à était selectionner viens de domicile ou exterieur
    if ( Select === "Dom" ) {
        //La liste est Domicile
        //On montre toute les valeurs de l'autre liste pour faire un "reset"
        $( "#BoutonGaucheE > option" ).show();
        value = $( "#BoutonGauche" ).val();
        //Puis on cache l'élément sélectionner dans l'autre liste
        $( '#BoutonGaucheE > option[value="' + value + '"]' ).hide();
    } else if ( Select === "Ext" ) {
        $( "#BoutonGauche > option" ).show();
        value = $( "#BoutonGaucheE" ).val();
        $( '#BoutonGauche > option[value="' + value + '"]' ).hide();
    }
}

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
                $( "#BarreEtape" ).val( value );
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
                $( "#BarreEtape" ).val( value );
            }
        }
    }
}
$( "#AddArbitre" ).click( function () {
    $( "#MenuArbitre,#Darken" ).show();
    $( "#MenuArbitre,#Darken" ).animate( { opacity: "1" }, 250 );
} );
$( "#Back" ).click( function () {
    $( "#MenuArbitre,#Darken" ).animate( { opacity: "0" }, 250 );
    setTimeout( function () {
        $( "#MenuArbitre,#Darken" ).hide();
    }, 250 );
} );
$( "#Back" ).click( function () {
    IsVoidArbitre();
} );

function IsVoid ( Input, Title ) {
    //Title = Titre de l'input et input = l'input
    // Si on veut mettre que l'input en rouge si il est vide
    if ( Title === undefined ) {
        if ( Input.val() === "" || Input.val() === null ) {
            Input.addClass( "Void" );
            return true;
        } else {
            Input.removeClass( "Void" );
            return;
        }
        //Si on veut mettre son titre
    } else {
        if ( Input.val() === "" || Input.val() === null ) {
            Title.addClass( "Red" );
            return true;
        } else {
            Title.removeClass( "Red" );
            return;
        }
    }
}

function IsVoidArbitre () {
    //On utilise 2 fois cette suite, autant en faire un fonction
    //L'array sert a stocker si oui ou non chaque input est vide (true) ou non (false)
    //Je le fait de cette sorte car un if ne s'arreterait qu'au premier true
    let array = [];
    array.push( IsVoid( $( "#NatArbitreP" ) ) );
    array.push( IsVoid( $( "#NomArbitreP" ) ) );
    array.push( IsVoid( $( "#NatArbitreSec1" ) ) );
    array.push( IsVoid( $( "#NomArbitreSec1" ) ) );
    array.push( IsVoid( $( "#NatArbitreSec2" ) ) );
    array.push( IsVoid( $( "#NomArbitreSec2" ) ) );
    //Si l'index (la position dans l'array) de true === -1 cela veut dire qu'il n'existe pas dans l'array
    //et donc que tous les champs sont remplie
    if ( array.indexOf( true ) !== -1 ) {
        //Arbitre sera en rouge ainsi que le/les champs d'arbitre vide
        $( "#Arbitres>h3" ).addClass( "Red" );
        return true;
    } else {
        //Arbitre ainsi que tt les champs d'arbitre seront normaux
        $( "#Arbitres>h3" ).removeClass( "Red" );
        return false;
    }
}
$( "#SaveFirstStep" ).click( function () {
    //Meme méthode qu'en haut mais avec tout les champs de la page
    let array = [];
    array.push( IsVoid( $( "#LieuInput" ), $( "#LieuTitre" ) ) );
    array.push( IsVoid( $( "#DatePicker" ), $( "#DateTitre" ) ) );
    array.push(
        IsVoid( $( "#BoutonGaucheE" ), $( "#BoutonGaucheE" ).parent().children( "h3" ) )
    );
    array.push(
        IsVoid( $( "#BoutonGauche" ), $( "#BoutonGauche" ).parent().children( "h3" ) )
    );
    array.push( IsVoidArbitre() );
    if ( array.indexOf( true ) !== -1 ) {
        //On affiche une alerte pour indiquer que la sauvegarde est impossible du a des champs mal remplie
        alert(
            "Pour sauvegarder la première étape il est important de remplir tout les champs."
        );
    }
} );

function SetName ( nom ) {
    let array = nom.split( " " );
    let result
    if ( array[ 1 ] !== undefined ) {
        let maj = array[ 0 ][ 0 ];
        result = maj + "." + array[ 1 ];
    } else {
        result = nom
    }
    return result
}
$( '#SwitchDOM, #switchEXT' ).change( function () {
    let check = $( this ).prop( 'checked' )
    let maillot;
    let path;
    let id;
    let alt;
    if ( $( this ).attr( 'id' ) === 'SwitchDOM' ) {
        maillot = '.domicile'
        path = 'CheminMaillotDom'
        id = $( '#BoutonGauche' ).val();
        alt = 0
    } else {
        maillot = '.exterieur'
        path = 'CheminMaillotExt'
        id = $( '#BoutonGaucheE' ).val();
        alt = 1
    }
    if ( check ) {
        $.post( '/php/SwitchMaillot.php', { type: "CheminMaillotNeutre", id: id }, function ( data ) {
            $( ".Float.Attaquant>" + maillot + ">.Image>img, .Float.Milieu>" + maillot + ">.Image>img, .Float.Defenseur>" + maillot + ">.Image>img, " + maillot + ">.Taken>img, #Droite>" + maillot + ">.Image>img" ).not( function () {
                if ( $( this ).attr( 'src' ) === '/Site web/img/maillot-gardien.png' || $( this ).attr( 'src' ) === "/Site web/img/brassard.png" ) {
                    return true
                }
            } ).attr( 'src', data )
        } )
        alternatif[ alt ] = true
    } else {
        $.post( '/php/SwitchMaillot.php', { type: path, id: id }, function ( data ) {
            $( ".Float.Attaquant>" + maillot + ">.Image>img, .Float.Milieu>" + maillot + ">.Image>img, .Float.Defenseur>" + maillot + ">.Image>img, " + maillot + ">.Taken>img, #Droite>" + maillot + ">.Image>img" ).not( function () {
                if ( $( this ).attr( 'src' ) === '/Site web/img/maillot-gardien.png' || $( this ).attr( 'src' ) === "/Site web/img/brassard.png" ) {
                    return true
                }
            } ).attr( 'src', data )
        } )
        alternatif[ alt ] = false
    }
} )
let arbitre = [ "Arbitre1", "Arbitre2", "Arbitre3" ]
$( "#Arbitre1, #Arbitre2, #Arbitre3" ).change( function () {
    hideArbitre()
} )
function hideArbitre () {
    $( "#Arbitre1 > option, #Arbitre2 > option, #Arbitre3 > option" ).show()
    for ( let i = 0; i < arbitre.length; i++ ) {
        if ( $( "#" + arbitre[ i ] ).val() !== null ) {
            let value = $( "#" + arbitre[ i ] ).val()
            for ( let x = 0; x < arbitre.length; x++ ) {
                if ( x !== i ) {
                    $( "#" + arbitre[ x ] + '> option[value="' + value + '"]' ).hide()
                }
            }
        }
    }
}
$( "#SaveFirstStep" ).click( function () {
    let stade = $( "#Stade" ).val()
    let arbitre1 = $( "#Arbitre1" ).val()
    let arbitre2 = $( "#Arbitre2" ).val()
    let arbitre3 = $( "#Arbitre3" ).val()
    let teamDOM = $( "#BoutonGauche" ).val()
    let teamEXT = $( "#BoutonGaucheE" ).val()
    let date = $( "#DatePicker" ).val()
    if ( !exist ) {
        $.post( '/php/sauvegarde.php', { stade: stade, arbitre1: arbitre1, arbitre2: arbitre2, arbitre3: arbitre3, teamDOM: teamDOM, teamEXT: teamEXT, date: date }, function ( data ) {
            location.href = '/Site web/html/CreateMatch.php?id=' + data
        } )
    } else {
        $.post( '/php/sauvegarde.php', { id: idMatch, stade: stade, arbitre1: arbitre1, arbitre2: arbitre2, arbitre3: arbitre3, teamDOM: teamDOM, teamEXT: teamEXT, date: date }, function ( data ) {
        } )
    }
} )
$( document ).ready( function () {
    if ( idMatch !== null ) {
        exist = true
        $.post( '/php/RetrieveMatch.php', { id: idMatch }, function ( data ) {
            const converted = JSON.parse( data )
            if ( converted === null || converted[ 8 ] === "1" ) {
                alert( "Le match sélectionner est déjà préparer ou n'existe pas, veuillez le lancer ou d'en selectionner un autre." )
                location.href = '/index.php'
            } else {
                $( "#BoutonGauche" ).val( converted[ 1 ] )
                $( "#BoutonGaucheE" ).val( converted[ 2 ] )
                $( "#Arbitre1" ).val( converted[ 3 ] )
                $( "#Arbitre2" ).val( converted[ 4 ] )
                $( "#Arbitre3" ).val( converted[ 5 ] )
                $( "#DatePicker" ).val( converted[ 6 ] )
                $( "#Stade" ).val( converted[ 7 ] )
                hideArbitre()
                Selectchange( "Dom" )
                Selectchange( "Ext" )
                $( "#BoutonGauche, #BoutonGaucheE" ).trigger( "change" )
                drag()
            }
        } )
    } else {
        $( "#Suivant" ).hide()
    }
} )
//SAUVEGARDE
function sauvegarde ( DOM, EXT, alt ) {
    DOM = JSON.stringify( DOM )
    EXT = JSON.stringify( EXT )
    let EquipeDOM = $( "#BoutonGauche option:selected" ).val()
    let EquipeEXT = $( "#BoutonGaucheE option:selected" ).val()
    $.post( "/php/sauvegardePrepa.php", { DOM: DOM, EXT: EXT, id: idMatch, alt: alt, EquipeDOM: EquipeDOM, EquipeEXT: EquipeEXT }, function ( data ) {
    } )
}
$( "#CancelSave" ).click( function () {
    $( "#Sauvegarder, #Darken" ).animate( { opacity: 0 }, 200 )
    setTimeout( function () {
        $( "#Sauvegarder, #Darken" ).hide()
    }, 200 )
} )
$( "#ConfirmSave" ).click( function () {
    let arrayDOM = []
    for ( let i = 1; i < 12; i++ ) {
        let maillot = $( "#Maillot" + i ).children( ".Image" ).attr( "id" )
        if ( maillot === undefined ) {
            alert( "Un maillot n'est pas placé pour l'équipe domicile !" )
            return
        }
        maillot = parseInt( maillot.split( "_" )[ 1 ] )
        if ( isNaN( maillot ) ) {
            alert( "Un problème est survenue, la page va etre recharger" )
            document.location.reload()
            return
        }
        arrayDOM.push( maillot )
    }
    let remplacantArrayDOM = []
    let remplacantDOM = $( "#Etape2 > div > #Droite > div" ).children( ".Image" )
    if ( remplacantDOM.length < 6 || remplacantDOM.length > 11 ) {
        alert( "Il n'y a pas assez de remplacant coté Domicile" )
        return
    }
    for ( let i = 0; i < remplacantDOM.length; i++ ) {
        id = $( remplacantDOM[ i ] ).attr( "id" )
        id = parseInt( id.split( "_" )[ 1 ] )
        if ( isNaN( id ) ) {
            alert( "Un problème est survenue, la page va etre recharger" )
            document.location.reload()
            return
        }
        remplacantArrayDOM.push( id )
    }
    let formationDOM = $( "#BoutonDroit option:selected" ).val()
    formationDOM = parseInt( formationDOM )
    if ( isNaN( formationDOM ) ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    let capitaineDOM = $( "#Etape2" ).find( '.OnCap' )
    if ( capitaineDOM.length === 0 ) {
        alert( "Il n'y à pas de capitaine pour l'équipe a domicile !" )
        return
    }
    if ( capitaineDOM.length > 1 ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    capitaineDOM = capitaineDOM.parent().attr( 'id' )
    if ( capitaineDOM === undefined ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    capitaineDOM = capitaineDOM.split( "_" )[ 1 ]
    if ( isNaN( capitaineDOM ) ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    arrayDOM.push( formationDOM, capitaineDOM, remplacantArrayDOM )
    let arrayEXT = []
    for ( let i = 1; i < 12; i++ ) {
        let maillot = $( "#Maillot" + i + "E" ).children( ".Image" ).attr( "id" )
        if ( maillot === undefined ) {
            alert( "Un maillot n'est pas placé pour l'équipe exterieur !" )
            return
        }
        maillot = parseInt( maillot.split( "_" )[ 1 ] )
        if ( isNaN( maillot ) ) {
            alert( "Un problème est survenue, la page va etre recharger" )
            document.location.reload()
            return
        }
        arrayEXT.push( maillot )
    }
    let remplacantArrayEXT = []
    let remplacantEXT = $( "#Etape3 > div > #Droite > div" ).children( ".Image" )
    if ( remplacantEXT.length < 6 || remplacantEXT.length > 11 ) {
        alert( "Il n'y a pas assez de remplacant coté exterieur" )
        return
    }
    for ( let i = 0; i < remplacantEXT.length; i++ ) {
        id = $( remplacantEXT[ i ] ).attr( "id" )
        id = parseInt( id.split( "_" )[ 1 ] )
        if ( isNaN( id ) ) {
            alert( "Un problème est survenue, la page va etre recharger" )
            document.location.reload()
            return
        }
        remplacantArrayEXT.push( id )
    }
    let formationEXT = $( "#BoutonDroitE option:selected" ).val()
    formationEXT = parseInt( formationEXT )
    if ( isNaN( formationEXT ) ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    let capitaineEXT = $( "#Etape3" ).find( '.OnCap' )
    if ( capitaineEXT.length === 0 ) {
        alert( "Il n'y à pas de capitaine pour l'équipe a exterieur !" )
        return
    }
    if ( capitaineEXT.length > 1 ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    capitaineEXT = capitaineEXT.parent().attr( 'id' )
    if ( capitaineEXT === undefined ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    capitaineEXT = capitaineEXT.split( "_" )[ 1 ]
    if ( isNaN( capitaineEXT ) ) {
        alert( "Un problème est survenue, la page va etre recharger" )
        document.location.reload()
        return
    }
    arrayEXT.push( formationEXT, capitaineEXT, remplacantArrayEXT )
    let alt = 0
    if ( alternatif[ 0 ] ) {
        alt++
    }
    if ( alternatif[ 1 ] ) {
        alt += 2
    }
    sauvegarde( arrayDOM, arrayEXT, alt )
} )