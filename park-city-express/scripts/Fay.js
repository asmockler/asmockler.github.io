(function () {
	if (typeof jQuery === 'undefined') { throw new Error('Fay requires jQuery') }
	if (typeof Raphael === 'undefined') { throw new Error('Fay requires Raphael.js') }
	
	var fay = {
		Easings : {
			'easeIn'    : 'cubic-bezier(.97,.01,.76,.76)', 
			'easeOut'   : 'cubic-bezier(.23,.23,.1,1)', 
			'easeInOut' : 'cubic-bezier(.7,0,.3,1)', 
			'linear'    : 'cubic-bezier(1,1,0,0)' 
		},
		chevron : function ( selector ) {
			if ( selector ) {
				var els = $(selector).find("[class*=fay-chevron']");
			} else {
				var els = $("[class*='fay-chevron']");
			}
			els.each(function ( i ){
				/////////////////////
				// DECLARING SCALE //
				/////////////////////
				var size;
				if ( $(this).attr('data-fay-size') ){
					var elementScale = $(this).attr('data-fay-size');
					size = elementScale / 50 || 1;
				} else {
					console.error('Something is seriously wrong here. You screwed up the scale, bub.')
				}
				var strokeWidth;
				if ( $(this).attr('data-fay-stroke') ) {
					var strokeWidth = $(this).attr('data-fay-stroke')
				} else {
					if ( (elementScale / 25) < 2 ){
						strokeWidth = 2
					} else {
						strokeWidth = elementScale / 25 || 2;
					}
				}
				/////////////////////
				// ANIMATION SPEED //
				/////////////////////
				var animationSpeed = $(this).attr('data-fay-speed') || 300;
				//////////////////
				// BASIC SHAPES //
				//////////////////
				var chevronDown = 'M ' + 5*size + ' ' + 15*size + ' l ' + 20*size + ' ' + 20*size + ' l ' + 20*size + ' ' + -20*size
				var chevronUp = 'M ' + 5*size + ' ' + 33*size + ' l ' + 20*size + ' ' + -20*size + ' l ' + 20*size + ' ' + 20*size
				////////////////
				// ANIMATIONS //
				////////////////
				var chevronDefaultUp = function ( paper ){
					paper.animate({
						path: chevronDown
					}, 0, function(){
						paper.animate({
							path: chevronUp
						}, animationSpeed*.75, fay.Easings.easeOut);
					});
				}
				var chevronDefaultDown = function ( paper ){
					paper.animate({
						path: chevronUp
					}, 0, function(){
						paper.animate({
							path: chevronDown
						}, animationSpeed*.75, fay.Easings.easeOut);
					});
				}
				var chevronFanUp = function ( paper ){
					paper.animate({
						path: chevronDown
					}, 0, function(){
						paper.animate({
							path: 'M ' + 25*size + ' ' + 15*size + ' l ' + 0 + ' ' + 20*size + ' l ' + 0 + ' ' + -20*size
						}, animationSpeed*.65, fay.Easings.easeIn, function(){
							paper.animate({
								path: 'M ' + 25*size + ' ' + 35*size + ' l ' + 0 + ' ' + -20*size + ' l ' + 0 + ' ' + 20*size
							}, 0, function(){
								paper.animate({
									path: chevronUp
								}, animationSpeed*.65, fay.Easings.easeOut);
							});
						});
					});
				}
				var chevronFanDown = function ( paper ){
					paper.animate({
						path: chevronUp
					}, 0, function(){
						paper.animate({
							path: 'M ' + 25*size + ' ' + 35*size + ' l ' + 0 + ' ' + -20*size + ' l ' + 0 + ' ' + 20*size
						}, animationSpeed*.65, fay.Easings.easeIn, function(){
							paper.animate({
								path: 'M ' + 25*size + ' ' + 15*size + ' l ' + 0 + ' ' + 20*size + ' l ' + 0 + ' ' + -20*size
							}, 0, function(){
								paper.animate({
									path:chevronDown
								}, animationSpeed*.65, fay.Easings.easeOut);
							});
						});
					});
				}
				var chevronFlipUp = function ( paper ){
					paper.animate({
						path:chevronDown
					}, 0, function(){
						paper.animate({
							path: 'M ' + 25*size + ' ' + 35*size + ' l ' + 0 + ' ' + -20*size + ' l ' + 0 + ' ' + 20*size
						}, animationSpeed*.65, fay.Easings.easeIn, function(){
							paper.animate({
								path:chevronUp
							}, animationSpeed*.65, fay.Easings.easeOut);
						});
					});
				}
				var chevronFlipDown = function ( paper ){
					paper.animate({
						path:chevronUp
					}, 0, function(){
						paper.animate({
							path: 'M ' + 25*size + ' ' + 15*size + ' l ' + 0 + ' ' + 20*size + ' l ' + 0 + ' ' + -20*size
						}, animationSpeed*.65, fay.Easings.easeIn, function(){
							paper.animate({
								path:chevronDown
							}, animationSpeed*.65, fay.Easings.easeOut);
						});
					});
				}
				var chevronSpringUp = function ( paper ){
					paper.animate({
						path:chevronDown
					}, 0, function(){
						paper.animate({
							path: 'M ' + 23*size + ' ' + 15*size + ' l ' + 2*size + ' ' + 20*size + ' l ' + 2*size + ' ' + -20*size
						}, animationSpeed*.5, '<>', function(){
							paper.animate({
								path: chevronUp
							}, animationSpeed*.5, '<>');
						});
					});
				}
				var chevronSpringDown = function ( paper ){
					paper.animate({
						path:chevronUp
					}, 0, function(){
						paper.animate({
							path: 'M ' + 23*size + ' ' + 35*size + ' l ' + 2*size + ' ' + -20*size + ' l ' + 2*size + ' ' + 20*size
						}, animationSpeed*.5, '<>', function(){
							paper.animate({
								path:chevronDown
							}, animationSpeed*.5, '<>');
						});
					});
				}
				////////////////////////
				// INITIALIZE DRAWING //
				////////////////////////
				var paper = Raphael($(this)[0], 50*size, 50*size)
				// Draws Menu Icon or X depending on data-fay-open attribute
				if ( $(this).attr('data-fay-up') == "true" ){
					var path = paper.path(chevronUp);
				} else {
			    	var path = paper.path(chevronDown);
			    	$(this).attr('data-fay-up', "false");
				}
				path.attr({
					'stroke-linejoin' : 'round',
					'stroke-width'    : strokeWidth,
					'stroke-linecap'  : 'round'
				});
			   	// Click and animation logic
				$(this).on('click', function(){
					if ( $(this).attr('data-fay-up') == 'true' ){
						if ( $(this).hasClass('fay-chevron-default-down') ) {
			    			chevronDefaultDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-fan-down') ) {
			    			chevronFanDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-flip-down') ) {
			    			chevronFlipDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-spring-down') ) {
			    			chevronSpringDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-default') ){ 
			    			chevronDefaultDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-fan') ) {
			    			chevronFanDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-flip') ) {
			    			chevronFlipDown(path);
			    		} else if ( $(this).hasClass('fay-chevron-spring') ) {
			    			chevronSpringDown(path);
			    		} else {
			    			chevronDefaultDown(path);
			    		}
						$(this).attr('data-fay-up', 'false');
					} else {
						if ( $(this).hasClass('fay-chev-default-up') ){
			    			chevronDefaultUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-fan-up') ) {
			    			chevronFanUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-flip-up') ) {
			    			chevronFlipUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-spring-up') ){
			    			chevronSpringUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-default') ){
			    			chevronDefaultUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-fan') ) {
			    			chevronFanUp(path);
			    		} else if (  $(this).hasClass('fay-chevron-flip') ) {
			    			chevronFlipUp(path);
			    		} else if ( $(this).hasClass('fay-chevron-spring') ) {
			    			chevronSpringUp(path);
			    		} else {
			    			chevronDefaultUp(path);
			    		}
			    		$(this).attr('data-fay-up', 'true');
					}
				});

			});
		},
		caret : function ( selector ) {
			if ( selector ) {
				var els = $(selector).find("[class*='fay-caret']");
			} else {
				var els = $("[class*='fay-caret']");
			}
			els.each(function ( i ){
				/////////////////////////////
				// DECLARING SPECIAL SCALE //
				/////////////////////////////
				var size;
				if ( $(this).attr('data-fay-size') ){
					var elementScale = $(this).attr('data-fay-size');
					size = elementScale / 150 || 1;
				} else {
					console.error('Something is seriously wrong here. You screwed up the scale, bub.')
				}
				var caret = $(this);
				/////////////////////
				// ANIMATION SPEED //
				/////////////////////
				var animationSpeed = $(this).attr('data-fay-speed') || 300;
				//////////////////
				// BASIC SHAPES //
				//////////////////
				var caretDown = 'M ' + 0 + ' ' + 0 + ' l ' + 24*size + ' ' + 42*size + ' l ' + 24*size + ' ' + -42*size + ' z';
				var caretRight = 'M ' + 0 + ' ' + 0 + ' l ' + 42*size + ' ' + 24*size + ' l ' + -42*size + ' ' + 24*size + ' z';
				var caretUp = 'M ' + 0 + ' ' + 50*size + ' l ' + 24*size + ' ' + -42*size + ' l ' + 24*size + ' ' + 42*size + ' z';
				var caretLeft = 'M ' + 50*size + ' ' + 0 + ' l ' + -42*size + ' ' + 24*size + ' l ' + 42*size + ' ' + 24*size + ' z';	
				var caretSpin = 'M ' + 8*size + ' ' + 5*size + ' l ' + 34*size + ' ' + 20*size + ' l ' + -34*size + ' ' + 20*size + ' z';
				////////////////
				// ANIMATIONS //
				////////////////
				var flip = function ( paper, start, end ){
					paper.animate({
						path: start
					}, 0, function(){
						paper.animate({
							path: end,
						}, animationSpeed, fay.Easings.easeOut);
					});
				}
				var spin = function ( paper, start, rotation ){
					var trueRotation = parseInt(rotation, 10) + parseInt(start, 10);

					paper.animate({
						path: caretSpin,
						transform: 'R' + start
					}, 0, function(){
						paper.animate({
							transform: 'R' + trueRotation,
						}, animationSpeed, fay.Easings.easeOut);
					});
				}
				///////////////////////////////
				// GET CARET CHARACTERISTICS //
				///////////////////////////////
				var findStartingRotation = function( el ) {
					var check = function ( c ){
						var result = el.hasClass( c );
						return result
					}

					if ( check('fay-caret-spin-down') || check('fay-caret-down') ){
						return 90;
					} else if ( check('fay-caret-spin-left') || check('fay-caret-left') ){
						return 180;
					} else if ( check('fay-caret-spin-up') || check('fay-caret-up') ){
						return 270;
					} else if ( check('fay-caret-spin-right') || check('fay-caret-right') ){
						return 0;
					} else {
						return 0;
					}
				}
				var findRotationAmount = function( attr, start ){
					var check = function ( c ){
						return attr == c;
					}

					if ( check('down') ){ return 90 - parseInt(start, 10) } 
					else if ( check('left') ) { return 180 - parseInt(start, 10) } 
					else if ( check('up') ) { return 270 - parseInt(start, 10) } 
					else if ( check('right') ) { return 0 - parseInt(start, 10) } 
					else {
						if ( startingRotation == 90 ){ return 180 }
						else if ( startingRotation == 180 ){ return 90 }
						if ( startingRotation == 270 ){ return 180 }
						else if ( startingRotation == 0 ){ return 90 }
					}
				}
				var findFlipDirection = function (el){
					var check = function ( c ){
						var result = el.hasClass( c );
						return result
					}

					if ( check('fay-caret-flip-down') ){
						return caretDown;
					} else if ( check('fay-caret-flip-left') ){
						return caretLeft;
					} else if ( check('fay-caret-flip-up') ){
						return caretUp;
					} else if ( check('fay-caret-flip-right') ){
						return caretRight;
					} else {
						return caretRight;
					}
				}
				var findFlipDestination = function (attr){
					var check = function ( c ){
						return attr == c;
					}

					if ( check('down') ){ return caretDown } 
					else if ( check('left') ) { return caretLeft } 
					else if ( check('up') ) { return caretUp } 
					else if ( check('right') ) { return caretRight } 
					else {
						if ( flipDirection == caretDown ){ return caretUp }
						else if ( flipDirection == caretLeft ){ return caretUp }
						if ( flipDirection == caretUp ){ return caretDown }
						else if ( flipDirection == caretRight ){ return caretDown }
					}
				}
				var startingRotation = findStartingRotation(caret);
				var rotationAmount = findRotationAmount( caret.attr('fay-destination'), startingRotation );
				var flipDirection = findFlipDirection(caret);
				var flipDestination = findFlipDestination( caret.attr('fay-destination'), startingRotation );
				////////////////////////
				// INITIALIZE DRAWING //
				////////////////////////
				var paper = Raphael($(this)[0], 50*size, 50*size);
				if( $(this).hasClass('fay-caret-spin-down') || $(this).hasClass('fay-caret-spin-left') || $(this).hasClass('fay-caret-spin-right') || $(this).hasClass('fay-caret-spin-up') || $(this).hasClass('fay-caret-spin'))
				{
					var path = paper.path(caretSpin);
					if (!caret.attr('spun')) {caret.attr('spun', 'false');}
					$(this).on('click', function(){
						if ( caret.attr('spun') == 'true') {
							spin(path, parseInt(startingRotation, 10) + parseInt(rotationAmount, 10), -rotationAmount);
							caret.attr('spun', 'false');
						} else if ( caret.attr('spun') == 'false' ){
							spin(path, startingRotation, rotationAmount);
							caret.attr('spun', 'true');
						} else {
							spin(path, startingRotation, rotationAmount);
							caret.attr('spun', 'true');
						};
					});
				} 
				else if ( $(this).hasClass('fay-caret-flip') || $(this).hasClass('fay-caret-flip-up') || $(this).hasClass('fay-caret-flip-right') || $(this).hasClass('fay-caret-flip-down') || $(this).hasClass('fay-caret-flip-left') )
				{
					var path = paper.path(flipDirection);
					if (!caret.attr('flipped')) {caret.attr('spun', 'false');}
					$(this).on('click', function(){
						if ( caret.attr('flipped') == 'true' ) {
							flip(path, flipDestination, flipDirection);
							caret.attr('flipped', 'false');
						} else if ( caret.attr('flipped') == 'false' ) {
							flip(path, flipDirection, flipDestination);
							caret.attr('flipped', 'true');
						} else {
							flip(path, flipDirection, flipDestination);
							caret.attr('flipped', 'true');
						}
					});
				}
				path.attr({
					'fill'            : '#000000',
					'stroke-width'          : '0'
				}).transform('R' + startingRotation);
			});
		},
		menu : function ( selector ) {
			if ( selector ) {
				var els = $(selector).find("[class*='fay-menu']");
			} else {
				var els = $("[class*='fay-menu']");
			}
			els.each(function ( i ){
				/////////////////////
				// DECLARING SCALE //
				/////////////////////

				var size;
				if ( $(this).attr('data-fay-size') ){
					var elementScale = $(this).attr('data-fay-size');
					size = elementScale / 50 || 1;
				} else {
					console.error('Something is seriously wrong here. You screwed up the scale, bub.')
				}

				var strokeWidth;
				if ( $(this).attr('data-fay-stroke') ) {
					var strokeWidth = $(this).attr('data-fay-stroke')
				} else {
					if ( (elementScale / 25) < 2 ){
						strokeWidth = 2
					} else {
						strokeWidth = elementScale / 25 || 2;
					}
				}

				/////////////////////
				// ANIMATION SPEED //
				/////////////////////

				var animationSpeed = $(this).attr('data-fay-speed') || 300;

				//////////////////
				// BASIC SHAPES //
				//////////////////

				var menuBars = 'M ' + 5*size + ' ' + 15*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 35*size + ' l ' + 40*size + ' ' + 0
				var menuX = 'M ' + 10*size + ' ' + 10*size + ' l ' + 30*size + ' ' + 30*size + ' M ' + 10*size + ' ' + 40*size + ' l ' + 30*size + ' ' + -30*size

				////////////////
				// ANIMATIONS //
				////////////////

				var menuDefaultOpen = function ( paper ){
					paper.animate({
						path: menuBars,
						transform: 'r0'
					}, 0, function(){
						paper.animate({
							transform: 'R180'
						}, 0, function(){
							paper.animate({
								path: menuX,
								transform: 'r0'
							}, animationSpeed, fay.Easings.easeInOut, function(){
								paper.animate({
									transform: 'R180'
								});
							});
						});
					});
				}

				var menuDefaultClose = function ( paper ){
					paper.animate({
						path: menuX,
						transform: 'R180'
					}, 0, function(){
						paper.animate({
							path: menuBars,
							transform: 'r0'
						}, animationSpeed, fay.Easings.easeInOut, function(){
							paper.animate({
								transform: 'R180'
							});
						});
					});
				}

				var menuSpinOpen = function ( paper ){
					paper.animate({
						transform: 'R0'
					}, 0, function(){
						paper.animate({
							path: menuX,
							transform:'R180'
						}, animationSpeed, fay.Easings.easeOut, function(){
							paper.animate({
								transform:'R0'
							}, 0);
						});
					});
				}

				var menuSpinClose = function ( paper ){
					paper.animate({
						transform: 'R180'
					}, 0, function(){
						paper.animate({
							path: menuBars,
							transform: 'R0'
						}, animationSpeed, fay.Easings.easeOut)
					})	
				}

				var menuFoldOpen = function ( paper ){
					paper.animate({
						path: 'M ' + 25*size + ' ' + 10*size + ' ' + ' l ' +  0 + ' ' + 30*size + ' M ' + 25*size + ' ' + 10*size + ' l ' + 0 + ' ' + 30*size + ' M ' + 25*size + ' ' + 10*size + ' l ' + 0 + ' ' + 30*size
					}, animationSpeed*.5, fay.Easings.easeIn, function() {
						paper.animate({
							path: 'M ' + 25*size + ' ' + 10*size + ' l ' + 0 + ' ' + 30*size + ' M ' + 25*size + ' ' + 10*size + ' l ' + 0 + ' ' + 30*size
						}, 0, function(){
							paper.animate({
								path: menuX
							}, animationSpeed*.5, fay.Easings.easeOut);
						});
					});
				}

				var menuFoldClose = function ( paper ){
					paper.animate({
						path: menuBars
					}, animationSpeed, fay.Easings.easeOut)
				}

				var menuFloatOpen = function ( paper ){
					paper.animate({
						path: 'M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0
					}, animationSpeed*.5, fay.Easings.easeIn, function(){
						paper.animate({
							path: 'M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0				
						}, 0, function(){
							paper.animate({
								path: menuX
							}, animationSpeed*.5, fay.Easings.easeOut);
						});
					});
				}

				var menuFloatClose = function ( paper ){
					paper.animate({
						path: 'M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0
					}, animationSpeed*.5, fay.Easings.easeIn, function(){
						paper.animate({
							path: 'M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0
						}, 0, function(){
							paper.animate({
								path: 'M ' + 5*size + ' ' + 15*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 25*size + ' l ' + 40*size + ' ' + 0 + ' M ' + 5*size + ' ' + 35*size + ' l ' + 40*size + ' ' + 0
							}, animationSpeed*.5, fay.Easings.easeOut);
						});
					});
				}

				////////////////////////
				// INITIALIZE DRAWING //
				////////////////////////

				var paper = Raphael($(this)[0], 50*size, 50*size)

				// Draws Menu Icon or X depending on data-fay-open attribute
				if ( $(this).attr('data-fay-open') == "true" ){
					var path = paper.path(menuX).transform('R180')
				} else {
			    	var path = paper.path(menuBars);
			    	$(this).attr('data-fay-open', "false")
				}

				path.attr({
					'stroke-linejoin' : 'round',
					'stroke-width'    : strokeWidth,
					'stroke-linecap'  : 'round'
				});
			    
			   	// Click and animation logic
				$(this).on('click', function(){
					if ( $(this).attr('data-fay-open') == 'true' ){
						if ( $(this).hasClass('fay-menu-spin-close') ){
							menuSpinClose(path);
						} else if ( $(this).hasClass('fay-menu-fold-close') ){
							menuFoldClose(path);
						} else if ( $(this).hasClass('fay-menu-default-close') ) {
			    			menuDefaultClose(path);
			    		} else if ( $(this).hasClass('fay-menu-float-close') ){
			    			menuFloatClose(path);
			    		} else if ( $(this).hasClass('fay-menu-spin') ) {
							menuSpinClose(path);    			
			    		} else if ( $(this).hasClass('fay-menu-fold') ) {
							menuFoldClose(path);
			    		} else if ( $(this).hasClass('fay-menu-float') ){
			    			menuFloatClose(path);
			    		} else if ( $(this).hasClass('fay-menu-default') ) {
							menuDefaultClose(path);
			    		} else {
			    			menuDefaultClose(path);
			    		}
						$(this).attr('data-fay-open', 'false');
					} else {
						if ( $(this).hasClass('fay-menu-spin-open') ){
							menuSpinOpen(path);
						} else if ($(this).hasClass('fay-menu-fold-open') ){
							menuFoldOpen(path);
						} else if ( $(this).hasClass('fay-menu-default-open') ) {
			    			menuDefaultOpen(path);
			    		} else if ( $(this).hasClass('fay-menu-float-open') ) {
			    			menuFloatOpen(path);
			    		} else if ( $(this).hasClass('fay-menu-spin') ) {
							menuSpinOpen(path);    			
			    		} else if ( $(this).hasClass('fay-menu-fold') ) {
							menuFoldOpen(path);
			    		} else if ( $(this).hasClass('fay-menu-float') ) {
			    			menuFloatOpen(path);
			    		} else if ( $(this).hasClass('fay-menu-default') ) {
							menuDefaultOpen(path);
			    		} else {
			    			menuDefaultOpen(path);
			    		}
			    		$(this).attr('data-fay-open', 'true');
					}
				});
			});
		},
		play : function ( selector ){
			if ( selector ) {
				var els = $(selector).find("[class*='fay-play']")
			} else {
				var els = $("[class*='fay-play'");
			}
			els.each(function ( i ){
				/////////////////////
				// DECLARING SCALE //
				/////////////////////
				var size;
				if ( $(this).attr('data-fay-size') ){
					var elementScale = $(this).attr('data-fay-size');
					size = elementScale / 50 || 1;
				} else {
					console.error('Something is seriously wrong here. You screwed up the scale, bub.')
				}
				var strokeWidth;
				if ( $(this).attr('data-fay-stroke') ) {
					var strokeWidth = $(this).attr('data-fay-stroke')
				} else {
					if ( (elementScale / 25) < 2 ){
						strokeWidth = 2
					} else {
						strokeWidth = elementScale / 25 || 2;
					}
				}
				/////////////////////
				// ANIMATION SPEED //
				/////////////////////
				var animationSpeed = $(this).attr('data-fay-speed') || 300;
				//////////////////
				// BASIC SHAPES //
				//////////////////
				var play = 'M ' + 10*size + ' ' + 8*size + ' l ' + 28*size + ' ' + 17*size + ' l ' + -28*size + ' ' + 17*size + ' z';
				var pause = 'M ' + 10*size + ' ' + 10*size + ' l ' + 10*size + ' ' + 0 + ' l ' + 0 + ' ' + 30*size + ' l ' + -10*size + ' ' + 0 + ' l ' + 0 + ' ' + -30*size + ' M ' + 30*size + ' ' + 10*size + ' l ' + 10*size + ' ' + 0 + ' l ' + 0 + ' ' + 30*size + ' l ' + -10*size + ' ' + 0 + ' l ' + 0 + ' ' + -30*size;
				var pauseOffCanvas = 'M ' + -20*size + ' ' + 5*size + ' l ' + 15*size + ' ' + 0 + ' l ' + 0 + ' ' + 40*size + ' l ' + -15*size + ' ' + 0 + ' l ' + 0 + ' ' + -40*size + ' M ' + 55*size + ' ' + 5*size + ' l ' + 15*size + ' ' + 0 + ' l ' + 0 + ' ' + 40*size + ' l ' + -15*size + ' ' + 0 + ' l ' + 0 + ' ' + -40*size;
				var nothing = 'M ' + 25*size + ' ' + 25*size + ' l ' + 1 + ' ' + 1;
				var stop = 'M ' + 11*size + ' ' + 11*size + ' l ' + 28*size + ' ' + 0 + ' l ' + 0 + ' ' + 28*size + ' l ' + -28*size + ' ' + 0 + ' z';
				////////////////
				// ANIMATIONS //
				////////////////
				var playToPause = function ( paper ){
					paper.animate({
						path: play
					}, 0, function(){
						paper.animate({
							path: nothing
						}, animationSpeed*.5, fay.Easings.easeIn, function(){
							paper.animate({
								path: pause
							}, animationSpeed*.5, fay.Easings.easeOut);
						});
					});
				}
				var pauseToPlay = function ( paper ){
					paper.animate({
						path: pause
					}, 0, function(){
						paper.animate({
							path: nothing
						}, animationSpeed*.5, fay.Easings.easeIn, function(){
							paper.animate({
								path: play
							}, animationSpeed*.5, fay.Easings.easeOut)
						});
					});
				}
				var playToPauseZoom = function ( paper ){
					paper.animate({
						path: play
					}, 0, function(){
						paper.animate({
							path: nothing
						}, animationSpeed*.5, fay.Easings.easeIn, function(){
							paper.animate({
								path: pauseOffCanvas
							}, 0, '<>', function(){
								paper.animate({
									path: pause
								}, animationSpeed*1.5, fay.Easings.easeOut)
							})
						})
					})
				}
				var pauseToPlayZoom = function ( paper ){
					paper.animate({
						path: pause
					}, 0, function(){
						paper.animate({
							path: pauseOffCanvas
						}, animationSpeed*.75, fay.Easings.easeIn, function(){
							paper.animate({
								path: nothing
							}, 0, function(){
								paper.animate({
									path: play
								}, animationSpeed, fay.Easings.easeOut);
							});
						});
					});
				}
				var playToStop = function ( paper ){
					paper.animate({
						path: play
					}, 0, function(){
						paper.animate({
							path: stop
						}, animationSpeed, fay.Easings.easeOut);
					});
				}
				var stopToPlay = function ( paper ){
					paper.animate({
						path: stop
					}, 0, function(){
						paper.animate({
							path: play
						}, animationSpeed, fay.Easings.easeOut);
					});
				}
				////////////////////////
				// INITIALIZE DRAWING //
				////////////////////////
				var paper = Raphael($(this)[0], 50*size, 50*size);
			    // Checks for class; returns true or false
				var check = function ( el, fayClass ){
					if ( el.hasClass(fayClass) ){
						return true
					} else {
						return false
					}
				}
				if ( !$(this).attr('data-fay-play') ) {
					$(this).attr('data-fay-play', 'true')
				}
				if ( $(this).attr('data-fay-play') === 'true' ){
					var path = paper.path(play);
				} else if ( $(this).attr('data-fay-play') === 'false' ){
					if( check($(this), 'fay-play-stop' ) ){
						var path = paper.path(stop);
					} else {
						var path = paper.path(pause)
					}
				}
				path.attr({
					'fill' : 'black',
					'line-join' : 'rounded'
				});
			   	// Click and animation logic
			   	$(this).on('click', function(){
			   		if( $(this).attr('data-fay-play') === 'true' ){
			   			if ( check($(this), 'fay-play-default') ){
			   				playToPause(path);
			   			} else if ( check($(this), 'fay-play-zoom' ) ){
			   				playToPauseZoom(path);
			   			} else if ( check($(this), 'fay-play-stop') ){
			   				playToStop(path);
			   			}
			   			$(this).attr('data-fay-play', 'false')
			   		} else {
			   			if( check($(this), 'fay-play-default' ) ){
			   				pauseToPlay(path);
			   			} else if ( check($(this), 'fay-play-zoom') ){
			   				pauseToPlayZoom(path)
			   			} else if ( check($(this), 'fay-play-stop') ){
			   				stopToPlay(path)
			   			}
			   			$(this).attr('data-fay-play', 'true') 
			   		}
			   	});
			});
		},
		preloadProperties : function ( selector ){
			if ( selector ) {
				var els = $(selector).find("[class*='fay-']");
			} else {
				var els = $("[class*='fay-']");
			}
			els.each(function ( i ){
				if ( $(this).attr('data-fay-size') ) {
					var sizeWithoutUnits = $(this).attr('data-fay-size').replace(/[^\d.]/g, '');
					$(this).attr('data-fay-size', sizeWithoutUnits);
				} else if ( $(this).attr('data-fay-scale') ) {
					$('body').children().first().before('<p class="get-fay-size"></p>');
					var fontSize = $('.get-fay-size').css('font-size').replace( /[^\d.]/g, '' );
					var scaleAttr = $(this).attr('data-fay-scale').replace( /[^\d.]/g, '' );
					var trueScale = parseFloat(fontSize, 10)*parseFloat(scaleAttr, 10);
					var elScale = 10 * Math.round(trueScale/5);
					$(this).attr('data-fay-size', elScale);
					$('.get-fay-size').remove();
				} else {
					$('body').children().first().before('<p class="get-fay-size"></p>');
					var fontSize = $('.get-fay-size').css('font-size').replace( /[^\d.]/g, '' );
					var elScale = 10 * Math.round(fontSize/5);
					$(this).attr('data-fay-size', elScale);
					$('.get-fay-size').remove();
				}
			});
		},
		properties : function ( selector ){
			if ( selector ) {
				var els = $(selector).find("[class*='fay-']").find('svg');
			} else {
				var els = $("[class*='fay-']").find('svg');
			}
			var getDefaultColor = function( el ){
				if ( el.attr('data-fay-color') ){
					return el.attr('data-fay-color');
				} else {
					return el.css('color');
				}
			}
			var getOpacity = function( el ){
				if ( el.attr('data-fay-opacity') ){
					return el.attr('data-fay-opacity');
				} else {
					return el.css('opacity');
				}
			}
			els.each(function ( i ){
				var elParent = $(this).parent("[class*='fay-']");
				var path = $(this).find('path, circle');
				var defaultColor = getDefaultColor(elParent);
				var opacity = getOpacity(elParent);

				$(this).css({
					'cursor' : 'pointer',
				});
				// Ensure items without fills don't get filled in
				if ( path.css('fill') == "rgb(0, 0, 0)" ){
					path.css({
						'fill' : defaultColor,
					});
				}
				path.css({
					'stroke' : defaultColor,
					'opacity' : opacity
				});	
			});
		},
		init : function ( selector ){
			if ( selector ){
				if ( typeof selector === 'string' ) {
					var selector = selector;
				} else {
					throw new Error('Initialization selector must be a string');
				}
			} else {
				var selector;
			}
			fay.preloadProperties(selector);
			fay.caret(selector);
			fay.chevron(selector);
			fay.menu(selector);
			fay.play(selector);
			fay.properties(selector);
		}
	}

	window.Fay = fay;

	if (typeof window.define === "function" && window.define.amd) {
	  window.define("fay", [], function() {
	    return window.Fay;
	  });
	} else {
		return window.Fay;
	}

}());