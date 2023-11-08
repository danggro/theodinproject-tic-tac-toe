function Gameboard() {
  const stateBoard = ['', '', '', '', '', '', '', '', '']
  function get() {
    return stateBoard
  }
  function set(index, value) {
    return (stateBoard[index] = value)
  }

  function reset() {
    return stateBoard.forEach((item, index) => set(index, ''))
  }
  return { get, set, reset }
}

function GameController() {
  const allButton = document.getElementsByTagName('main')[0].children
  const winnerElement = document.getElementById('winner')

  const formPlayer = document.getElementById('form-player')
  const turnElement = document.getElementById('turn')

  let turn = true
  let totalTurn = 0
  let player = []
  const logicWinArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  const board = Gameboard()

  function startGame() {
    const player1Name = document.getElementById('player1').value
    const player2Name = document.getElementById('player2').value
    for (item of allButton) {
      item.removeAttribute('disabled')
    }
    formPlayer.style.setProperty('display', 'none')
    player = [player1Name, player2Name]

    turnElement.innerHTML = `Player ${player[0]}'s turn`
  }

  function action(event) {
    event.target.setAttribute('disabled', '')
    totalTurn++

    switchPlayerTurn(event)

    logicWinArray.forEach((item) => {
      winHandler(
        board.get()[item[0]] + board.get()[item[1]] + board.get()[item[2]]
      )
    })

    if (winnerElement.getAttribute('hidden') === 'false') {
      for (item of allButton) {
        item.setAttribute('disabled', '')
      }
    } else if (totalTurn === 9) {
      revealWinnerElement()
      winnerElement.children[0].innerHTML = 'Draw'
      turnElement.style.setProperty('display', 'none')
    }
  }

  function switchPlayerTurn(event) {
    if (turn) {
      turnElement.innerHTML = `Player ${player[1]}'s turn`
      event.target.innerHTML = 'X'
      board.set([Number(event.target.id) - 1], 'X')
      turn = !turn
    } else {
      turnElement.innerHTML = `Player ${player[0]}'s turn`
      event.target.innerHTML = 'O'
      board.set([Number(event.target.id) - 1], 'O')
      turn = !turn
    }
  }

  function winHandler(logic) {
    if (logic === 'XXX' || logic === 'OOO') {
      revealWinnerElement()
      turnElement.style.setProperty('display', 'none')
      if (logic === 'XXX') {
        winnerElement.children[0].innerHTML = `Player ${player[0]} win`
      } else {
        winnerElement.children[0].innerHTML = `Player ${player[1]} win`
      }
    }
  }

  function hideWinnerElement() {
    winnerElement.setAttribute('hidden', 'true')
    winnerElement.style.setProperty('display', 'none')
  }

  function revealWinnerElement() {
    winnerElement.setAttribute('hidden', 'false')
    winnerElement.style.setProperty('display', 'flex')
  }

  function reset() {
    for (button of allButton) {
      button.innerHTML = ''
      button.removeAttribute('disabled')
    }
    hideWinnerElement()
    turn = true
    totalTurn = 0
    turnElement.innerHTML = `Player ${player[0]}'s turn`
    turnElement.style.setProperty('display', 'inline')
    board.reset()
  }

  return { reset, action, startGame }
}

const gameController = GameController()
