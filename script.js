let playerScore = 0;
var playerCards = [];
let computerScore = 0;
var State = "active";
var W = "Вы победили!"
var L = "Вы проиграли!"

function ReshuffleDeck() {
  var redeck = [
    [6, 6, 6, 6], // 6 // Б Ч К В
    [7, 7, 7, 7], // 7 // Б Ч К В
    [8, 8, 8, 8], // 8 // Б Ч К В
    [9, 9, 9, 9], // 9 // Б Ч К В
    [10, 10, 10, 10], // 10 // Б Ч К В
    [2, 2, 2, 2], // В // Б Ч К В
    [3, 3, 3, 3], // Д // Б Ч К В
    [4, 4, 4, 4], // К // Б Ч К В
    [11, 11, 11, 11]  // Т // Б Ч К В
  ];
  return redeck
}

function NullDeck() {
  var nulldeck = [
    [0, 0, 0, 0], // 6 // Б Ч К В
    [0, 0, 0, 0], // 7 // Б Ч К В
    [0, 0, 0, 0], // 8 // Б Ч К В
    [0, 0, 0, 0], // 9 // Б Ч К В
    [0, 0, 0, 0], // 10 // Б Ч К В
    [0, 0, 0, 0], // В // Б Ч К В
    [0, 0, 0, 0], // Д // Б Ч К В
    [0, 0, 0, 0], // К // Б Ч К В
    [0, 0, 0, 0]  // Т // Б Ч К В
  ];
  return nulldeck
}
 
/*var deck = [
  [0, 0, 0, 0], // 6 // Б Ч К В
  [0, 0, 0, 0], // 7 // Б Ч К В
  [0, 0, 0, 0], // 8 // Б Ч К В
  [0, 0, 0, 0], // 9 // Б Ч К В
  [0, 0, 0, 0], // 10 // Б Ч К В
  [0, 0, 0, 0], // В // Б Ч К В
  [0, 0, 0, 0], // Д // Б Ч К В
  [0, 0, 0, 0], // К // Б Ч К В
  [0, 0, 0, 0]  // Т // Б Ч К В
];*/

var deck = ReshuffleDeck();

function IsDeckEmpty() {
  for (let i of deck) {
    for (let k of i) {
        if (k != 0) {
          return false
        }
    }
  }
  return true
}

function Compare() {
  if (playerScore < 21 && computerScore < 21 && State == "active") {
    if (playerScore - 21 > computerScore - 21) {
      alert(W)
    } else {
      alert(L)
    }
    State = "Inactive"
    updateUI();
  }
}

function Check() {
  if (playerScore < 21 && computerScore < 21) {
    return
  }
  if (playerScore == 21) {
    alert(W)
  } else if (computerScore == 21) {
    alert(L)
  } else if (playerScore > 21 && computerScore < 21) {
    alert(L)
  } else if (playerScore < 21 && computerScore > 21) {
    alert(W)
  } else if (playerScore > 21 && computerScore > 21) {
    alert(L)
  }
  State = "Inactive"
  updateUI();
}

function ComputersTurn() {
  var IsOkay = false
  var attempts = 0
  if (IsDeckEmpty() == false) {
    while (IsOkay != true) {
      attempts += 1
      if (attempts >= 35) {
        deck = NullDeck()
        break
      }
      const cardValue = Math.floor(Math.random() * 8); 
      const cardType = Math.floor(Math.random() * 3);
      if (deck[cardValue][cardType] != 0) {
        IsOkay = true
        computerScore += deck[cardValue][cardType];
        deck[cardValue][cardType] = 0
      }
    }
  }
}

console.log(deck)



document.getElementById("restart").addEventListener("click", () => {
  State = "active"
  playerCards = [];
  playerScore = 0;
  computerScore = 0;
  deck = ReshuffleDeck()
  updateUI()
});

document.getElementById('hit-btn').addEventListener('click', () => {
  if (State != "active") {
    alert("Эта партия завершилась. ")
    return
  }
  var IsOkay = false
  var attempts = 0
  console.log(IsDeckEmpty())
  if (IsDeckEmpty() == false) {
    while (IsOkay != true) {
      attempts += 1
      console.log(attempts)
      if (attempts >= 35) {
        deck = NullDeck()
        break
      }
      const cardValue = Math.floor(Math.random() * 8); 
      const cardType = Math.floor(Math.random() * 3);
      if (deck[cardValue][cardType] != 0) {
        IsOkay = true
        playerCards.push(cardValue + "-" + cardType);
        playerScore += deck[cardValue][cardType];
        deck[cardValue][cardType] = 0
      }
    }
    ComputersTurn();
    updateUI();
    Check()
  } else {
    Check();
  }
});

document.getElementById('stand-btn').addEventListener('click', () => {
  if (State == "active") {
    Compare()
  } else {
    alert("Эта партия завершилась.")
  }
  
});

function updateUI() {
  const scoreElement = document.getElementById('score');
  const pcscoreElement = document.getElementById("score-pc")
  const playerCardsElement = document.getElementById('player-cards');
  
  scoreElement.textContent = `Очков: ${playerScore}`;
  pcscoreElement.textContent = `Очков у компьютера: ${computerScore}`;
  playerCardsElement.innerHTML = '';
  playerCards.forEach(card => {
    const cardImg = document.createElement('img');
    //cardImg.src = `${card}.jpg`; 
    cardImg.src = `6-3.jpg`; 
    playerCardsElement.appendChild(cardImg);
  });
}

// card_${card}.png