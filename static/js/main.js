'use strict';

class Game {

  constructor(params) {
    this.params = params;
    this.buildHTML();
    this.bindEvents();
  }

  buildHTML() {
    const { parent } = this.params;
    for (let i = 0; i < 10; i++) {
      parent.appendChild(this.buildCard());
    }
  }

  bindEvents() {
    const cards = document.querySelectorAll('.gamecard');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
      });
    });
  }

  buildCard() {
    const div = document.createElement('div');
    div.classList.add('gamecard-container');

    const card = document.createElement('div');
    card.classList.add('gamecard');
    div.appendChild(card);

    const frontFace = document.createElement('div');
    frontFace.classList.add(
      'gamecard__face',
      'gamecard__face--front',
      'has-background-primary');
    frontFace.innerHTML = '<i class="fa fa-question"></i>';
    card.appendChild(frontFace);

    const index = Math.floor(Math.random() * this.params.choices.length);
    const choice = this.params.choices[index];

    const backFace = document.createElement('div');
    backFace.classList.add(
      'gamecard__face',
      'gamecard__face--back',
      'has-background-info');
    backFace.innerHTML = `<i class="fa fa-${choice}"></i>`;
    card.appendChild(backFace);

    return div;
  }
}

(function() {
  const game = new Game({
    parent: document.querySelector('.game-layout'),
    choices: [
      'money-bill-wave',
      'laugh-wink',
      'robot',
      'rocket',
      'kiwi-bird',
      'skull',
      'heart']
  });
})();