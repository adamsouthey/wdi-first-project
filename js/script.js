$(() => {

  const levels = {
    '1': {
      timePenalty: 1

    },
    '2': {
      timePenalty: 2

    },
    '3': {
      timePenalty: 2.5
    },
    '4': {
      timePenalty: 3
    },
    '5': {
      timePenalty: 3.5
    }
  };

  // Define cards array
  let score = 0;
  let seconds = 60;


  let app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
    currentLevel: null,
    initialise: () => {
      $('.content, .left, .winScreen, .lossScreen, .clock').hide();
      $('.welcome').show();


      //Start Game Button from Welcome Screen. ChosenLevel = targetClick, level1 = data value 1 - apply timePenalty(Key): 1(value)
      $('.start').on('click', function reload(e) {

        const chosenLevel = $(e.target).data('level');
        $('.restart-current-level').data('level', chosenLevel);
        app.currentLevel = levels[chosenLevel];

        $('.welcome, .content, .winScreen, .lossScreen').hide();
        $('.clock, .left').show();


        const name = $('#playerName').val();
        $('.targetName').html(name);
        app.shuffle();
      });

      //Restart Level from lossScreen
      $('.restart-current-level').on('click', function reload(e) {
        const chosenLevel = $(e.target).data('level');
        app.currentLevel = levels[chosenLevel];

        $('.welcome, .content, .winScreen, .lossScreen').hide();
        $('.clock, .left').show();

        seconds = 60;
        score = 0;

        $('.clock').html('60');
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
    },

    //Assign Cards Data Values
    assignCards: () => {
      $('.card').each(function(index) {
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
      seconds = seconds - app.currentLevel.timePenalty;

    },
    //Time Reward Function
    timeReward: () => {
      seconds = seconds - app.currentLevel.correctGuess;

    }

  };


  $('.restart').on('click', function() {
    location.reload();
  });


  //? Animation
  $(function animation() {
    setInterval(function() {
      $('.question-image').animate({ left: $(window).width() + 'px' }, 8000, 'linear', function() {
        $(this).css({ left: - $(this).width() + 'px' });
      });
    }, 10);
  });

  $(function animation() {
    setInterval(function() {
      $('.question-image').animate({ left: $(window).width() + 'px' }, 3000, 'linear', function() {
        $(this).css({ left: - $(this).width() + 'px' });
      });
    }, 10);
  });
  $(function animation() {
    setInterval(function() {
      $('.question-image').animate({ left: $(window).width() + 'px' }, 1000, 'linear', function() {
        $(this).css({ left: - $(this).width() + 'px' });
      });
    }, 10);
  });




  //TIMER
  // var timeoutHandle;

  $('.startGameButton').on('click', function(){
    $('.content').show();

    console.log(app.currentLevel.timePenalty);

    function countdown() {
      let exampleSeconds = 60;
      const secondsInterval = setInterval(function(){
        var $counter =$('#timer');
        exampleSeconds -= app.currentLevel.timePenalty;
        $counter.html(exampleSeconds);

        if (exampleSeconds <= 0){
          clearInterval(secondsInterval);
          $('.content, .left, .clock').hide();
          $('.lossScreen').show();
        }
      }, 1000);
    }
    countdown();
  });
  app.initialise();
});
