let clone, img, nom, number, dropped = false,
    original, droite, gauche = false, milieu = false, id,
    origin, nocap = false, end, originpos, taken, pos, capitaine = false
function drag () {
    $( '.MaillotG' ).draggable( {
        helper: function ( e ) {
            var original = $( e.target ).hasClass( "ui-draggable" ) ? $( e.target ) : $( e.target ).closest( ".ui-draggable" )
            return original.clone().css( {
                width: original.width(), zIndex: 999
            } )
        },
        tolerance: "pointer",
        scroll: false,
        start: function ( event, ui ) {
            clone = $( this ).clone()
            id = $( clone ).children( '.Image' ).attr( 'id' )
            img = $( this ).children( '.Image' ).children( 'img' ).attr( 'src' )
            nom = $( this ).children( '.Nom' ).text()
            number = $( this ).children( '.Numero' ).text()
            origin = this
            original = this
            pos = $( original ).offset()
            $( this ).hide()
            $( clone ).show()
        },
        stop: ( event, ui ) => {
            if ( !dropped ) {
                let double = clone
                $( double ).addClass( 'dragclone' )
                let posclone = $( '.ui-draggable-dragging' ).offset()
                $( double ).css( { left: posclone.left, top: posclone.top } )
                $( 'body' ).append( double )
                $( original ).css( { opacity: 0 } )
                $( original ).show()
                $( double ).animate( { left: pos.left, top: pos.top }, 250 )
                setTimeout( () => {
                    $( original ).show()
                    $( double ).remove()
                    $( original ).css( { opacity: 1 } )
                }, 250 )
            } else {
                if ( $( origin ).parent().hasClass( 'Banc' ) ) {
                    $( origin ).remove()
                    nombreRemplacant( false )
                }
                if ( milieu ) {
                    $( original ).parent().draggable( "enable" )
                    milieu = false
                }
            }
            dropped = false
            gauche = false
        }
    } )
    $( '.MaillotM' ).draggable( {
        helper: function ( e ) {
            var original = $( e.target ).hasClass( "ui-draggable" ) ? $( e.target ) : $( e.target ).closest( ".ui-draggable" )
            return original.clone().css( {
                width: original.width(), zIndex: 999
            } )
        },
        tolerance: "pointer",
        scroll: false,
        start: function ( event, ui ) {
            if ( $( this ).children( '.Image' ).children().hasClass( "OnCap" ) ) {
                capitaine = true
            }
            origin = this
            clone = $( this ).clone()
            img = $( this ).children( '.Image' ).children( 'img' ).attr( 'src' )
            nom = $( this ).children( '.Nom' ).text()
            number = $( this ).children( '.Numero' ).text()
            original = this
            id = $( original ).children( 'div' ).attr( 'id' )
            targetpos = $( original ).offset()
            pos = $( original ).offset()
            $( this ).children( '.Image' ).children( 'img:first-child' ).attr( 'src', '/Site web/img/maillot-blanc.png' )
            $( this ).children( '.Image' ).children( 'img.OnCap' ).hide()
            $( this ).children( 'h4' ).css( { opacity: '0' } )
            $( clone ).show()
        },
        stop: ( event, ui ) => {
            if ( !dropped ) {
                let double = clone
                $( double ).addClass( 'dragclone' )
                let posclone = $( '.ui-draggable-dragging' ).offset()
                $( double ).css( { left: posclone.left, top: posclone.top } )
                $( 'body' ).append( double )
                $( double ).animate( { left: pos.left, top: pos.top }, 250 )
                setTimeout( () => {
                    $( double ).remove()
                    $( original ).children( 'div' ).children( 'img:first-child' ).attr( 'src', img )
                    $( original ).children( '.Image' ).children( 'img.OnCap' ).show()
                    $( original ).children( 'h4' ).css( { opacity: '1' } )
                    $( original ).css( { opacity: 1 } )
                }, 250 )
            } else {
                $( origin ).children( '.Image' ).removeClass( 'Taken' )
                if ( !taken ) {
                    $( origin ).css( { opacity: '0.5' } )
                    $( origin ).removeClass( 'MaillotM' )
                    $( origin ).draggable( "disable" )
                }
                if ( $( origin ).parent().hasClass( 'Banc' ) ) {
                    $( origin ).remove()
                    nombreRemplacant( false )
                }
            }
            taken = false
            dropped = false
            gauche = false
        }
    } )
    $( '.MaillotT >.Image' ).droppable( {
        tolerance: "pointer",
        drop: function ( event, ui ) {
            if ( $( original ).hasClass( "Capitaine" ) ) {
                if ( $( this ).hasClass( 'Taken' ) ) {
                    dropped = true
                    $( original ).hide()
                    $( this ).append( '<img src="/Site web/img/brassard.png" class="OnCap" style="top:-100%">' )
                } else {
                    nocap = true
                }
                return
            }
            if ( $( this ).hasClass( 'Taken' ) && $( original ).children( 'div' ).hasClass( 'Taken' ) ) {
                id = undefined
                let target = $( this ).parent()
                let text = $( target ).children( '.Nom' ).text()
                let repnum = $( target ).children( '.Numero' ).text()
                let clone = $( target ).clone()
                let originpos = $( target ).offset()
                let originid = $( clone ).children( 'div' ).attr( 'id' )
                let picdrop = $( this ).children().attr( 'src' )
                let targetid = $( original ).children( 'div' ).attr( 'id' )
                $( 'body' ).append( clone )
                $( clone ).css( { top: originpos.top, left: originpos.left } )
                $( clone ).addClass( 'dragclone' )
                $( clone ).animate( { top: targetpos.top, left: targetpos.left }, 250 )
                setTimeout( () => {
                    $( origin ).children( 'div' ).children( 'img' ).attr( "src", picdrop )
                    $( origin ).children( '.Nom' ).text( text )
                    $( origin ).children( '.Numero' ).text( repnum )
                    $( origin ).children( 'h4' ).css( { opacity: 1 } )
                    $( origin ).children( 'div' ).addClass( 'Taken' )
                    $( this ).attr( 'id', targetid )
                    $( origin ).children( 'div' ).attr( 'id', originid )
                    $( origin ).css( { opacity: 1 } )
                    $( clone ).remove()
                }, 250 )
                taken = true
            }
            else if ( $( this ).hasClass( 'Taken' ) ) {
                let replace = $( this ).attr( 'id' )
                let target = $( '.Gauche > .float > .MaillotG > #' + replace ).parent()
                let clone = $( target ).clone()
                $( clone ).children().attr( 'id', '' )
                $( 'body' ).append( clone )
                $( clone ).show()
                $( target ).show()
                $( target ).css( { opacity: 0 } )
                $( clone ).addClass( 'dragclone' )
                $( 'body > .dragclone' ).css( { top: $( this ).parent().offset().top, left: $( this ).parent().offset().left } )
                $( clone ).animate( { top: $( target ).offset().top, left: $( target ).offset().left }, 250 )
                $( '.dragclone' ).css( { opacity: 1 } )
                setTimeout( () => {
                    $( '.dragclone' ).remove()
                    $( target ).css( { opacity: 1 } )
                }, 250 )
                $( this ).attr( 'id', id )
            }
            $( this ).parent().addClass( 'MaillotM' )
            if ( $( original ).hasClass( 'exterieur' ) ) {
                $( this ).parent().addClass( 'exterieur' )
            } else {
                $( this ).parent().addClass( 'domicile' )
            }
            $( this ).parent().draggable( "enable" )
            $( this ).parent().removeClass( 'MaillotG' )
            if ( capitaine ) {
                $( this ).append( '<img src="/Site web/img/brassard.png" class="OnCap" style="top:-100%">' )
                capitaine = false
            }
            $( this ).children( 'img:first-child' ).attr( "src", img )
            $( this ).addClass( 'Taken' )
            if ( id !== undefined ) {
                $( this ).attr( 'id', id )
            }
            milieu = true
            original = this
            end = $( original ).parent()
            $( this ).parent().css( { opacity: 1 } )
            $( this ).parent().children( '.Nom' ).text( nom )
            $( this ).parent().children( '.Numero' ).text( number )
            $( this ).parent().children( 'h4' ).css( { opacity: '1' } )
            dropped = true
            id = undefined
            drag()
        }
    } )
    $( '.Banc' ).droppable( {
        tolerance: "pointer",
        drop: function ( event, ui ) {
            if ( $( original ).hasClass( 'Capitaine' ) ) {
                droite = true
                return
            }
            if ( capitaine ) {
                if ( State === 1 ) {
                    $( '#CapDOM' ).show()
                    $( '#CapDOM' ).children().css( { opacity: 1 } )
                } else {
                    $( '#CapEXT' ).show()
                    $( '#CapEXT' ).children().css( { opacity: 1 } )
                }
                $( clone ).children( '.Image' ).children( '.OnCap' ).remove()
                $( original ).children( '.Image' ).children( '.OnCap' ).remove()
                capitaine = false
            }
            let last
            $( clone ).css( { position: "relative" } )
            $( clone ).removeClass( 'MaillotM' )
            $( clone ).removeClass( 'MaillotT' )
            $( clone ).addClass( 'MaillotG' )
            $( clone ).attr( 'id', '' )
            $( clone ).children( '.Image' ).droppable( { disabled: true } )
            $( this ).append( clone )
            last = $( this )
            end = $( '#Droite > div:last-child' )
            dropped = true
            nombreRemplacant( true )
            drag()
        }
    } )
    $( '.Selection' ).droppable( {
        drop: function ( event, ui ) {
            id = $( clone ).children( 'div' ).attr( 'id' )
            end = ".MaillotG > #" + id
            $( end ).parent().show()
            dropped = true
            gauche = true
            if ( capitaine ) {
                if ( State === 1 ) {
                    $( "#CapDOM" ).show()
                    $( "#CapDOM > h4" ).css( { opacity: 1 } )
                } else {
                    $( "#CapEXT" ).show()
                    $( "#CapEXT > h4" ).css( { opacity: 1 } )
                }
                capitaine = false
            }
            drag()
        }
    } )
    $( ".Capitaine" ).draggable( {
        helper: function ( e ) {
            var original = $( e.target ).hasClass( "ui-draggable" ) ? $( e.target ) : $( e.target ).closest( ".ui-draggable" )
            original.children( 'h4' ).css( { opacity: 0 } )
            return original.clone().css( {
                width: original.width(), zIndex: 999
            } )
        },
        tolerance: "pointer",
        scroll: false,
        start: function ( event, ui ) {
            origin = this
            original = this
            clone = $( this ).clone()
            pos = $( this ).offset()
            $( original ).hide()
        },
        stop: function ( event, ui ) {
            if ( !dropped || gauche || droite || nocap ) {
                let double = clone
                $( double ).addClass( 'dragclone' )
                let posclone = $( '.ui-draggable-dragging' ).offset()
                $( double ).css( { left: posclone.left, top: posclone.top } )
                $( 'body' ).append( double )
                $( original ).css( { opacity: 0 } )
                $( original ).show()
                $( double ).animate( { left: pos.left, top: pos.top }, 250 )
                setTimeout( () => {
                    $( original ).show()
                    $( double ).remove()
                    $( original ).css( { opacity: 1 } )
                    $( original ).children( 'h4' ).css( { opacity: 1 } )
                }, 250 )
                gauche = false
                droite = false
                nocap = false
            } else {
                dropped = false
            }
        }
    } )
    $( '.MaillotM' ).dblclick( ( e ) => {
        let cible = e.target, text
        if ( !$( cible ).hasClass( 'MaillotM' ) ) {
            while ( !$( cible ).hasClass( 'MaillotM' ) ) {
                cible = $( cible ).parent()
            }
        }
        if ( $( cible ).children( '.Taken' ).children().hasClass( 'OnCap' ) ) {
            $( cible ).children( '.Taken' ).children( '.OnCap' ).remove()
            if ( State === 1 ) {
                text = '#CapDOM'
            } else {
                text = '#CapEXT'
            }
            $( text ).show()
            $( text + "> h4" ).css( { opacity: 1 } )
        }
    } )
}
drag()