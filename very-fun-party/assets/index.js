(function () {
  var EMOJI = [
    '🐛', '🐝', '🌴', '🌵', '🍊', '🍉', '🌮', '🍟', '🍦', '🏈', '💸', '🇺🇸', '🇨🇦',
    '💖', '🎈', '🎊', '⚽️', '🎷', '🍾', '🍕', '🍍', '🍃', '🕊', '🦄', '👰', '👻', '🐶',
    '🐷', '🐳', '🐚', '🔥', '✨', '☄️', '🍳'
  ];

  function makeFloatingEmoji() {
    // Create the element
    var element = document.createElement('div');
    element.classList.add('floating-emoji');

    // Add an emoji
    element.innerHTML = EMOJI[Math.floor(Math.random()*EMOJI.length)];;

    // Make it fall for a randomish amount of time
    var randomDuration = randomNumberBetween(7500, 10000);
    element.style.animationDuration = randomDuration + 'ms';

    // Random left value
    var randomLeft = randomNumberBetween(1, 99);
    element.style.left = randomLeft + '%';

    // Append to body
    document.body.appendChild(element);

    // Remove the element once off screen
    window.setTimeout(function () {document.body.removeChild(element)}, randomDuration);
  }

  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var currentKeyframes = null;
  function createKeyframes() {
    var keyframe = document.createElement('style');
    keyframe.innerHTML = "@keyframes fall-from-top { \n\
      0% { transform: translateY(-30px) } \n\
      100% { transform: translateY(" + window.innerHeight + "px) } \n\
    }";

    if (currentKeyframes !== null) { document.head.removeChild(currentKeyframes) }
    document.head.appendChild(keyframe);
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    createKeyframes();
    window.addEventListener('resize', function () {
      console.log('hey');
      createKeyframes();
    })

    for (var i = 0; i < 3; i++) { makeFloatingEmoji() }
    window.setInterval(makeFloatingEmoji, 700);
  });
})()
