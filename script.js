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

  let turn = true
  let totalTurn = 0

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
    }
  }

  function switchPlayerTurn(event) {
    if (turn) {
      event.target.innerHTML = 'X'
      board.set([Number(event.target.id) - 1], 'X')
      turn = !turn
    } else {
      event.target.innerHTML = 'O'
      board.set([Number(event.target.id) - 1], 'O')
      turn = !turn
    }
  }

  function winHandler(logic) {
    if (logic === 'XXX' || logic === 'OOO') {
      revealWinnerElement()
      if (logic === 'XXX') {
        winnerElement.children[0].innerHTML = 'X Win'
      } else {
        winnerElement.children[0].innerHTML = 'O Win'
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
    board.reset()
  }

  return { reset, action }
}

const gameController = GameController()
