$(() => {

  const levels = {
    '1': {
      timePenalty: 1,
      correctGuess: 3
    },
    '2': {
      timePenalty: 2,
      correctGuess: 3
    },
    '3': {
      timePenalty: 3,
      correctGuess: 3
    }
  };

  // Define cards array
  var score = 0;
  var seconds = 20;


  let app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
    currentLevel: null,
    initialise: () => {
      $('.content').hide();
      $('.left').hide();
      $('.winScreen').hide();
      $('.lossScreen').hide();
      $('.clock').hide();
      $('.welcome').show();

      //Start Game
      $('.start').on('click', function reload(e) {


        // seconds = 60;
        const chosenLevel = $(e.target).data('level');
        console.log(chosenLevel);
        app.currentLevel = levels[chosenLevel];
        console.log(app.currentLevel);

        $('.welcome').hide();
        $('.content').hide();
        $('.left').show();
        $('.winScreen').hide();
        $('.lossScreen').hide();
        $('.clock').show();

        const name = $('#playerName').val();
        $('.targetName').html(name);

        app.shuffle();



      });

      $('.restart-current-level').on('click', function reload(e) {


        // seconds = 60;
        const chosenLevel = $(e.target).data('level');
        console.log(chosenLevel);
        app.currentLevel = levels[chosenLevel];
        console.log('app.currentLevel', app.currentLevel, $(e.target).data('level'));

        $('.welcome').hide();
        $('.content').hide();
        $('.left').show();
        $('.winScreen').hide();
        $('.lossScreen').hide();
        $('.clock').show();

        seconds = 60;
        score = 0;
        const name = $('#playerName').val();
        $('.player1Score').html('0 / 8');
        $('.targetName').html(name);

        app.assignCards();



      });

    },

    //Shuffle Deck
    shuffle: () => {
      let random = 0;
      let temp = 0;
      for (let i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log(`Shuffled Card Array: ${app.cards}`);
    },

    //Assign Cards Data Values
    assignCards: () => {
      console.log($('.card').length)
      $('.card').each(function(index) {
        console.log(app.cards[index]);
        $(this).animate({opacity: 1}).addClass('unpaired').empty();
        $(this).attr('data-card-value', app.cards[index]);
      });
      app.clickHandlers();
    },

    //Assign card value ID + selected class to card then checkMatch
    clickHandlers: () => {
      $('.card').on('click', function () {
        const num = $(this).attr('data-card-value');
        $(this).html('<p>' + num + '</p>').addClass('selected');

        app.checkForMatch();
      });
    },

    //Check for Match Function
    checkForMatch: () => {


      if($('.selected').length == 2) {
        if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          //Remove Matching Pair From board and add 1 to scoreboard
          $('.selected').each(function(){
            $(this).animate({opacity: 0}).removeClass('unpaired');

            score += .5;
            app.timeReward();
            $('.player1Score').html(score + ' / 8');


          });

          $('.selected').each(function(){
            $(this).removeClass('selected');
          });

          app.winCondition();
        } else {
          app.timePenalty();
          setTimeout(function(){
            $('.selected').each(function(){
              $(this).html('').removeClass('selected');
            });
          }, 200);
        }
      }
    },




    // Win Conditions Show Win Screen
    winCondition: () => {
      if($('.unpaired').length === 0){
        $('.content').hide();
        $('.left').hide();
        $('.clock').hide();
        $('.winScreen').show();
      }

    },

    //Time Penalty Function
    timePenalty: () => {
      seconds -= app.currentLevel.timePenalty;
    },
    //Time Reward Function
    timeReward: () => {
      seconds += app.currentLevel.correctGuess;
    }



  };


  $('.restart').on('click', function() {
    location.reload();
  });


  //TIMER
  var timeoutHandle;

  $('.startGameButton').on('click', function(){
    $('.content').show();


    //app.shuffle();


    function countdown(minutes) {

      var mins = minutes;
      function tick() {
        var counter = document.getElementById('timer');
        var currentMinutes = mins-1;
        seconds--;
        counter.innerHTML =
        currentMinutes.toString() + " " + (seconds < 10 ? "" : "") + String(seconds);
        if( seconds > 0 ) {
          timeoutHandle=setTimeout(tick, 1000);
        } else {


          if(mins > 1){

            // countdown(mins-1);
            setTimeout(function () {
              countdown(mins - 1);
            }, 1000);

          }
          if (seconds <= 0){
            $('.content').hide();
            $('.left').hide();
            $('.clock').hide();
            $('.lossScreen').show();
          }
        }
      }
      tick();
    }
    countdown(1);
  });
  app.initialise();
});
