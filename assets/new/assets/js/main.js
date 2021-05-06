$.noConflict();

jQuery(document).ready(function($) {

	"use strict";

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	} );

	jQuery('.selectpicker').selectpicker;


	$('#menuToggle').on('click', function(event) {
		$('body').toggleClass('open');
	});

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	// $('.user-area> a').on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.user-menu').parent().removeClass('open');
	// 	$('.user-menu').parent().toggleClass('open');
	// });

	// function onReady(callback) {
	// 	$(window).load(function(){
	// 		var intervalId = window.setInterval(function(){
	// 			if (document.getElementsByTagName('body')[0] !== undefined) {
	// 				window.clearInterval(intervalId)
	// 				callback.call(this)
	// 			}
	// 		}, 1000)
	// 	})
	// }

	// function setVisible (selector, visible) {
	// 	document.querySelector(selector).style.display = visible ? 'inline' : 'none'
	// }

	// onReady(function(){
	// 	setVisible('.page_section', true)
	// 	setVisible('.loading', false)
	// })

});