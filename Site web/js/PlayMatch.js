let DOM = false, EXT = false, MOD = false, indexAction = 0
const getID = new URLSearchParams( window.location.search )
const id = getID.get( 'id' )
$( "#btnDOM" ).click( () => {
    $( "#PopupDOM, #Darken" ).show()
    $( "#PopupDOM" ).css( { display: "flex" } )
    $( "#PopupDOM, #Darken" ).animate( { opacity: 1 }, 200 )
    DOM = true
} )
function IsEnd ( time, end ) {
    if ( end === undefined ) {
        let target = array.findIndex( i => i.actionValue === "4" )
        if ( target !== -1 ) {
            if ( array[ target ].temps < time ) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        let last = $( ".Scroller" ).children().last().children( ".Temps" ).text()
        last = parseInt( last )
        if ( time < last ) {
            return true
        } else {
            return false
        }

    }
}
class action {
    constructor( joueur, action, temps, cote, joueurValue, actionValue, remplaceJoueur, remplaceValue ) {
        this.joueur = joueur
        this.action = action
        this.temps = parseFloat( temps )
        this.cote = cote
        this.joueurValue = joueurValue
        this.actionValue = actionValue
        this.remplaceJoueur = remplaceJoueur
        this.remplaceValue = remplaceValue
    }
    write ( parent, i ) {
        $( parent ).append( '<div class="' + this.cote + ( this.actionValue == "4" ? " End" : "" ) + '" id="Action' + i + '"><h4 class="Temps">' + this.temps + '"</h4>' +
            '<h4 class="Action">' + this.action + '</h4>' +
            ( this.actionValue !== "4" ? '<h4 class="Joueur">' + ( this.actionValue === "2" ? this.remplaceJoueur + " -> " + this.joueur : this.joueur ) + '</h4>' +
                '</div > ' : "" ) )
    }
}
$( document ).ready( function () {
    $.post( '/php/action.php', { id: id }, function ( data ) {
        output = JSON.parse( data )
        for ( const [ key, value ] of Object.entries( output.DOM.but ) ) {
            let joueur = value.Id_Joueurs
            let Temps = value.Date
            let joueurNOM = $( '#PopupDOM > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, "But", Temps, "ActionDomicile", joueur, "0" ) )
        }
        for ( const [ key, value ] of Object.entries( output.DOM.sortie ) ) {
            let joueur = value.Joueur_sortant
            let Temps = value.Temps_du_match
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupDOM > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionDomicile", joueur, "3" ) )
        }
        for ( const [ key, value ] of Object.entries( output.DOM.remplacement ) ) {
            let joueur = value.Joueur_sortant
            let joueurNew = value.Joueur_rentrant
            let Temps = value.Temps_du_match
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupDOM > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            let joueurNOMNew = $( '#PopupDOM > div > .DivPlayer > div:first > select option[value="' + joueurNew + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionDomicile", joueur, "2", joueurNOMNew, joueurNew ) )
        }
        for ( const [ key, value ] of Object.entries( output.DOM.faute ) ) {
            let joueur = value.Id_Joueurs
            let Temps = value.Temps
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupDOM > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionDomicile", joueur, "1" ) )
        }
        for ( const [ key, value ] of Object.entries( output.EXT.but ) ) {
            let joueur = value.Id_Joueurs
            let Temps = value.Date
            let joueurNOM = $( '#PopupEXT > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, "But", Temps, "ActionExterieur", joueur, "0" ) )
        }
        for ( const [ key, value ] of Object.entries( output.EXT.sortie ) ) {
            let joueur = value.Joueur_sortant
            let Temps = value.Temps_du_match
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupEXT > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionExterieur", joueur, "3" ) )
        }
        for ( const [ key, value ] of Object.entries( output.EXT.remplacement ) ) {
            let joueur = value.Joueur_sortant
            let joueurNew = value.Joueur_rentrant
            let Temps = value.Temps_du_match
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupEXT > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            let joueurNOMNew = $( '#PopupEXT > div > .DivPlayer > div:first > select option[value="' + joueurNew + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionExterieur", joueur, "2", joueurNOMNew, joueurNew ) )
        }
        for ( const [ key, value ] of Object.entries( output.EXT.faute ) ) {
            let joueur = value.Id_Joueurs
            let Temps = value.Temps
            let categorie = value.Catégorie
            let joueurNOM = $( '#PopupEXT > div > .DivPlayer > div:first > select option[value="' + joueur + '"]' ).text()
            array.push( new action( joueurNOM, categorie, Temps, "ActionExterieur", joueur, "1" ) )
        }
        if ( output.fin[ 0 ].Duree !== 0 ) {
            array.push( new action( 0, "Fin du match", output.fin[ 0 ].Duree, "ActionDomicile", 0, "4" ) )
            $( '.ListAction option[value="4"]' ).hide()
        }
        SortAction()
    } )
} )
$( "#btnEXT" ).click( () => {
    $( "#PopupEXT, #Darken" ).show()
    $( "#PopupEXT" ).css( { display: "flex" } )
    $( "#PopupEXT, #Darken" ).animate( { opacity: 1 }, 200 )
    EXT = true
} )
$( ".Cancel" ).click( () => {
    if ( DOM ) {
        $( "#PopupDOM, #Darken" ).animate( { opacity: 0 }, 200 )
        setTimeout( () => {
            $( "#PopupDOM, #Darken" ).hide()
        }, 200 )
        DOM = false
    } else if ( EXT ) {
        $( "#PopupEXT, #Darken" ).animate( { opacity: 0 }, 200 )
        setTimeout( () => {
            $( "#PopupEXT, #Darken" ).hide()
        }, 200 )
        EXT = false
    } else {
        $( "#PopupMOD, #Darken" ).animate( { opacity: 0 }, 200 )
        setTimeout( () => {
            $( "#PopupMOD, #Darken" ).hide()
        }, 200 )
        MOD = false
    }
} )
$( ".Add" ).click( () => {
    let time, player, oAction, cote, playerValue, oActionValue, remplaceJoueur, remplaceValue
    if ( DOM ) {
        time = $( "#PopupDOM > div > .InputNumber " ).val()
        oActionValue = $( "#PopupDOM > div > div > .ListAction option:selected" ).val()
        player = $( "#PopupDOM > div > div > div:first >.ListPlayer option:selected" ).text()
        if ( oActionValue === "1" ) {
            oAction = $( "#PopupDOM > div > .ListActionDIV > select option:selected" ).last().text()
        } else {
            oAction = $( "#PopupDOM > div > div > .ListAction option:selected" ).text()
        }
        cote = 'ActionDomicile'
        playerValue = $( "#PopupDOM > div > div > div:first > .ListPlayer option:selected" ).val()
        if ( oActionValue === "2" ) {
            remplaceJoueur = $( "#PopupDOM > div > div > div:last >.ListPlayer option:selected" ).text()
            remplaceValue = $( "#PopupDOM > div > div > div:last >.ListPlayer option:selected" ).val()
        }
    } else {
        time = $( "#PopupEXT > div > .InputNumber " ).val()
        oActionValue = $( "#PopupEXT > div > div > .ListAction option:selected" ).val()
        player = $( "#PopupEXT > div > div > div:first >.ListPlayer option:selected" ).text()
        if ( oActionValue === "1" ) {
            oAction = $( "#PopupEXT > div > .ListActionDIV > select option:selected" ).last().text()
        } else {
            oAction = $( "#PopupEXT > div > div > .ListAction option:selected" ).text()
        }
        playerValue = $( "#PopupEXT > div > div > div:first >.ListPlayer option:selected" ).val()
        cote = 'ActionExterieur'
        if ( oActionValue === "2" ) {
            remplaceJoueur = $( "#PopupEXT > div > div > div:last >.ListPlayer option:selected" ).text()
            remplaceValue = $( "#PopupEXT > div > div > div:last >.ListPlayer option:selected" ).val()
        }
    }
    if ( oActionValue === "4" && IsEnd( time, true ) ) {
        alert( "La fin du match ne peut pas etre avant un action" )
        return
    }
    if ( oActionValue !== "4" && IsEnd( time ) ) {
        alert( "Une action ne peut pas se passer après la fin du match" )
        return
    }
    if ( time === '' || player === '' || oAction === '' ) {
        alert( 'Il manque une information !' )
        return
    }
    if ( oActionValue == "4" ) {
        $( '#PopupDOM > div > div > .ListAction option[value="4"]' ).hide()
        $( '#PopupEXT > div > div > .ListAction option[value="4"]' ).hide()
        $( '#PopupMOD > div > div > .ListAction option[value="4"]' ).hide()
        $( '#PopupDOM > div > div > .ListAction' ).val( '0' )
        $( '#PopupEXT > div > div > .ListAction' ).val( '0' )
        $( '#PopupMOD > div > div > .ListAction' ).val( '0' )
        $( '#PopupDOM > div > .DivPlayer > div ' ).first().show()
        $( '.ListAction' ).parent().children( 'div' ).children( 'div' ).first().show()
    }
    DOM = false
    EXT = false
    array.push( new action( player, oAction, time, cote, playerValue, oActionValue, remplaceJoueur, remplaceValue ) )
    $( "#PopupDOM, #Darken, #PopupEXT" ).animate( { opacity: 0 }, 200 )
    setTimeout( () => {
        $( "#PopupDOM, #Darken, #PopupEXT" ).hide()
    }, 200 )
    SortAction()
} )
let array = []
let sortables = []
function SortAction () {
    $( '.Scroller' ).empty()
    sortables = []
    array.forEach( action => {
        sortables.push( [ action, action.temps ] )
        sortables.sort( function ( a, b ) {
            return a[ 1 ] - b[ 1 ]
        } )
    } )
    let i = 0
    let actionDOM = [ 0, 0, 0, 0 ]
    let actionEXT = [ 0, 0, 0, 0 ]
    sortables.forEach( action => {
        action[ 0 ].write( ".Scroller", i )
        let x = action[ 0 ].actionValue
        if ( x !== "4" ) {
            if ( action[ 0 ].cote === 'ActionDomicile' ) {
                actionDOM[ x ] += 1
            } else {
                actionEXT[ x ] += 1
            }
            i++
        }
    } )
    $( "#StatDOM > .Faute" ).text( "Fautes : " + actionDOM[ 1 ] )
    $( "#StatDOM > .Remplacement" ).text( "Remplacement : " + actionDOM[ 2 ] + "/3" )
    $( "#StatDOM > .Sortie" ).text( "Sortie : " + actionDOM[ 3 ] )
    $( "#StatEXT > .Faute" ).text( "Fautes : " + actionEXT[ 1 ] )
    $( "#StatEXT > .Remplacement" ).text( "Remplacement : " + actionEXT[ 2 ] + "/3" )
    $( "#StatEXT > .Sortie" ).text( "Sortie : " + actionEXT[ 3 ] )
    $( "#ScoreDOM" ).text( actionDOM[ 0 ] )
    $( "#ScoreEXT" ).text( actionEXT[ 0 ] )
}
$( document ).on( "click", ".ActionDomicile, .ActionExterieur", ( e ) => {
    MOD = true
    $( "#PopupMOD, #Darken" ).show()
    $( "#PopupMOD" ).css( { display: "flex" } )
    $( "#PopupMOD, #Darken" ).animate( { opacity: 1 }, 200 )
    let actionTarget = e.target
    if ( !$( actionTarget ).hasClass( 'ActionDomicile' ) && !$( actionTarget ).hasClass( 'ActionExterieur' ) ) {
        actionTarget = $( actionTarget ).parent()
    }
    $( "#PopupMOD > div > div > div:first > .ListPlayer" ).empty()
    $( "#PopupMOD > div > div > div:last > .ListPlayer" ).empty()
    $( "#PopupMOD > div > .ListPlayer" ).empty()
    if ( $( actionTarget ).hasClass( 'ActionDomicile' ) ) {
        $( "#PopupMOD > div > div > div:first > .ListPlayer" ).append( $( "#PopupDOM > div > div > div:first .ListPlayer > option" ).clone() )
        $( "#PopupMOD > div > div > div:last > .ListPlayer" ).append( $( "#PopupDOM > div > div > div:last .ListPlayer > option" ).clone() )
    } else {
        $( "#PopupMOD > div > div > div:first > .ListPlayer" ).append( $( "#PopupEXT > div > div > div:first .ListPlayer > option" ).clone() )
        $( "#PopupMOD > div > div > div:last > .ListPlayer" ).append( $( "#PopupEXT > div > div > div:last .ListPlayer > option" ).clone() )
    }
    actionTarget = $( actionTarget ).attr( 'id' ).split( 'n' )[ 1 ]
    actionTarget = sortables[ actionTarget ][ 0 ]
    indexAction = array.indexOf( actionTarget )
    $( "#PopupMOD > div > .InputNumber " ).val( actionTarget.temps )
    $( "#PopupMOD > div > div > div:first > .ListPlayer" ).val( actionTarget.joueurValue )
    $( "#PopupMOD > div > div > .ListAction" ).val( actionTarget.actionValue )
    $( "#PopupMOD > div > div > .ListAction" ).parent().parent().children( 'div' ).children( 'div' ).first().show()
    $( "#PopupMOD > div > div > .ListAction" ).parent().parent().children( 'div' ).children( 'div' ).last().hide()
    $( "#PopupMOD > div > div > .ListAction" ).parent().children( 'select' ).last().hide()
    if ( actionTarget.actionValue === "2" ) {
        $( "#PopupMOD > div > div > div:last" ).show()
        $( "#PopupMOD > div > div > div:last" ).val( actionTarget.remplaceValue )
    } else if ( actionTarget.actionValue === "4" ) {
        $( "#PopupMOD > div > div > div" ).hide()
        $( '#PopupMOD > div > div > .ListAction option[value="4"]' ).show()
    } else if ( actionTarget.actionValue === "1" ) {
        $( "#PopupMOD > div > .ListActionDIV " ).children( 'select' ).last().show()
    }
} )
$( ".Delete" ).click( () => {
    if ( array[ indexAction ].actionValue == "4" ) {
        $( '#PopupDOM > div > div > .ListAction option[value="4"]' ).show()
        $( '#PopupEXT > div > div > .ListAction option[value="4"]' ).show()
        $( '#PopupMOD > div > div > .ListAction option[value="4"]' ).show()
    }
    array.splice( indexAction, 1 )
    SortAction()
    $( "#PopupMOD, #Darken" ).animate( { opacity: 0 }, 200 )
    setTimeout( () => {
        $( "#PopupMOD, #Darken" ).hide()
    }, 200 )
    MOD = false
} )
$( ".Modify" ).click( () => {
    let time, player, oAction, playerValue, oActionValue, cote, remplaceJoueur, remplaceValue
    cote = array[ indexAction ].cote
    time = $( "#PopupMOD > div > .InputNumber " ).val()
    player = $( "#PopupMOD > div > div > div:first >.ListPlayer option:selected" ).text()
    oActionValue = $( "#PopupMOD > div > div > .ListAction option:selected" ).val()
    if ( oActionValue === "1" ) {
        oAction = $( "#PopupMOD > div > .ListActionDIV > select option:selected" ).last().text()
    } else {
        oAction = $( "#PopupMOD > div > div > .ListAction option:selected" ).text()
    }
    playerValue = $( "#PopupMOD > div > div > div:first >.ListPlayer option:selected" ).val()
    if ( oActionValue === "3" ) {
        remplaceJoueur = $( "#PopupMOD > div > div > div:last >.ListPlayer option:selected" ).text()
        remplaceValue = $( "#PopupMOD > div > div > div:last >.ListPlayer option:selected" ).val()
    }
    if ( oActionValue === "4" && IsEnd( time, true ) ) {
        alert( "La fin du match ne peut pas etre avant un action" )
        return
    }
    if ( oActionValue !== "4" && IsEnd( time ) ) {
        alert( "Une action ne peut pas se passer après la fin du match" )
        return
    }
    array.push( new action( player, oAction, time, cote, playerValue, oActionValue, remplaceJoueur, remplaceValue ) )
    array.splice( indexAction, 1 )
    SortAction()
    $( "#PopupMOD, #Darken" ).animate( { opacity: 0 }, 200 )
    setTimeout( () => {
        $( "#PopupMOD, #Darken" ).hide()
    }, 200 )
} )
$( ".ListPlayer" ).change( ( e ) => {
    if ( DOM ) {
        $( '#PopupDOM > div > div > div >.ListPlayer option' ).not( e.target ).show()
        $( '#PopupDOM > div > div > div >.ListPlayer option[value="' + $( e.target ).val() + '"]' ).not( e.target ).hide()
    } else if ( EXT ) {
        $( '#PopupEXT > div > div > div >.ListPlayer option' ).not( e.target ).show()
        $( '#PopupEXT > div > div > div >.ListPlayer option[value="' + $( e.target ).val() + '"]' ).not( e.target ).hide()
    } else {
        $( '#PopupMOD > div > div > div >.ListPlayer option' ).not( e.target ).show()
        $( '#PopupMOD > div > div > div >.ListPlayer option[value="' + $( e.target ).val() + '"]' ).not( e.target ).hide()
    }
} )
$( ".ListAction" ).change( ( e ) => {
    $( e.target ).parent().parent().children( 'div' ).children( 'div' ).first().show()
    $( e.target ).parent().parent().children( 'div' ).children( 'div' ).last().hide()
    $( e.target ).parent().children( 'select' ).last().hide()
    if ( $( e.target ).val() === "2" ) {
        $( e.target ).parent().parent().children( 'div' ).children( 'div' ).last().show()
    } else if ( $( e.target ).val() === "4" ) {
        $( e.target ).parent().parent().children( 'div' ).children( 'div' ).hide()
    } else if ( $( e.target ).val() === "1" ) {
        $( e.target ).parent().children( 'select' ).last().show()
    }
} )
let arrayMODE = [
    'StatBTN',
    'DeroulementBTN',
    'FormationBTN'
]
let arrayDISPLAY = [
    '.Stat',
    '.Deroulement',
    '.Formation'
]
$( ".Mode" ).click( function () {
    if ( $( this ).hasClass( "Selected" ) ) {
        return
    }
    $( ".Selected" ).removeClass( "Selected" )
    $( this ).addClass( "Selected" )
    let show = arrayMODE.indexOf( $( this ).attr( 'id' ) )
    arrayDISPLAY.forEach( element => {
        if ( arrayDISPLAY.indexOf( element ) === show ) {
            $( element ).css( { display: 'flex' } )
        } else {
            $( element ).hide()
        }
    } );
} )
$( "#Save" ).click( function () {
    let json = { array: array }
    json = JSON.stringify( json )
    $.post( '/php/sauvegardeMatch.php', { donnee: json, id: id }, function ( data ) {
        location.href = "/Site web/html/SeeMatch.php"
    } )
} )