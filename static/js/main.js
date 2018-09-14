'use strict';

class Game {

  constructor(params) {
    this.params = params;
    this.state = {
      selectedCards: []
    }
    this.buildHTML();
    this.bindEvents();
  }

  buildHTML() {

    const { parent } = this.params;
    const numPairs = 9;

    const mkRand = e => {
      return [e, Math.random()];
    }
    const unRand = e => {
      return e[0];
    }
    const mkRandSort = (a, b) => {
      if (a[1] < b[1]) {
        return 1;
      }
      if (a[1] > b[1]) {
        return -1;
      }
      return 0;
    }

    const icons = this.params.choices
      .map(mkRand).sort(mkRandSort).map(unRand)
      .slice(0, numPairs)
      .reduce((acc, v) => {
        acc.push(v, v);
        return acc;
      }, [])
      .map(mkRand).sort(mkRandSort).map(unRand);

    for (let i = 0; i < numPairs * 2; i++) {
      const icon = icons[i];
      parent.appendChild(this.buildCard(icon));
    }

  }

  bindEvents() {

    const cards = document.querySelectorAll('.gamecard');

    cards.forEach(card => {
      card.addEventListener('click', () => {

        if (card.classList.contains('is-flipped')) {
          return false;
        }

        const icon = card.getAttribute('data-icon');
        const { selectedCards } = this.state;

        if ((selectedCards.length === 1)
          && (card === selectedCards[0])) {
          return false;
        }

        if (selectedCards.length < 2) {

          selectedCards.push(card);
          card.classList.toggle('is-flipped');

          if (selectedCards.length === 2) {

            const icons = selectedCards.map(e => {
              return e.getAttribute('data-icon');
            });

            if (icons[0] === icons[1]) {
              setTimeout(() => {
                selectedCards.forEach(card => {
                  card.parentElement.setAttribute('style', 'opacity:0');
                });
                this.state.selectedCards = [];
              }, 600);
            }
            else {
              setTimeout(() => {
                selectedCards.forEach(card => {
                  card.classList.toggle('is-flipped');
                });
                this.state.selectedCards = [];
              }, 800);
            }
          }

        }

      });
    });
  }

  buildCard(icon) {
    const div = document.createElement('div');
    div.classList.add('gamecard-container');

    const card = document.createElement('div');
    card.classList.add('gamecard');
    card.setAttribute('data-icon', icon);
    div.appendChild(card);

    const frontFace = document.createElement('div');
    frontFace.classList.add(
      'gamecard__face',
      'gamecard__face--front',
      'has-background-primary');
    frontFace.innerHTML = '<i class="fa fa-question"></i>';
    card.appendChild(frontFace);

    const backFace = document.createElement('div');
    backFace.classList.add(
      'gamecard__face',
      'gamecard__face--back',
      'has-background-info');
    backFace.innerHTML = `<i class="fa fa-${icon}"></i>`;
    card.appendChild(backFace);

    return div;
  }
}

(function() {
  const game = new Game({
    parent: document.querySelector('.game-layout'),
    choices: [
      'cookie-bite',
      'dice',
      'frog',
      'gem',
      'heart',
      'kiwi-bird',
      'laugh-wink',
      'money-bill-wave',
      'robot',
      'rocket',
      'skull',
      ]
  });
})();