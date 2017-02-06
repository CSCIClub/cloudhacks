/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particle'), {
    dotColor:'#c0392b',
    lineColor:'rgba(255,255,255,0)',
    particleRadius:4,
    proximity:75,
    minRadiusPct:0.5,
    maxRadiusPct:2.2,
    minOpacity:0.5,
    maxOpacity:0.8,
    density:50000
  });
  var intro = document.getElementById('particle-container');
  var intro1 = document.getElementById('particle');
  intro.style.marginTop = - intro.offsetHeight + 'px';
  intro1.style.marginTop = - 150 + 'px';

}, false);


/*
// jQuery plugin example:
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});
*/
