$(() => {
  // var $card = $('.card');
  // $card.on('click', () => {
  // console.log('FJBDSKGBSKFGNSDJKFBSJK');
  //   });

  // Define cards array
  let app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
    initialise: () => {
      app.shuffle();

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
    assignCards: () => {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index]);
      });
      app.clickHandlers();
    },
    clickHandlers: () => {
      $('.card').on('click', function () {
        $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
        app.checkForMatch();
      });
    },
    checkForMatch: () => {
      if($('.selected').length == 2) {
        if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          //Remove Matching Pair From board
          $('.selected').each(function(){
            $(this).animate({opacity: 0}).removeClass('unpaired');

          });
          $('.selected').each(function(){
            $(this).removeClass('selected');
          });
          app.winCondition();
        } else {
          //Flip back over
          setTimeout(function(){
            $('.selected').each(function(){
              $(this).html('').removeClass('selected');
            });
          }, 500);
        }
      }
    },
    winCondition: () => {
      if($('.unpaired').length === 0){
        $('.container').html('You beat the game! Well done!');
      }

    }
  };
  app.initialise();
});
