//initialise arrays and variables
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var track = "O";
var turns = 0;
var status = "";
var player = "";
var ai = "";
var nextTurn = "";
var nextWinner = [[0, 1, 2],[1, 2, 0],[0, 2, 1],[3, 4, 5],[4, 5, 3],[3, 5, 6],[6, 7, 8],[7, 8, 6],[6, 8, 7],[0, 3, 6],[3, 6, 0],[0, 6, 3],[1, 4, 7],[4, 7, 1],[1, 7, 4],[2, 5, 8],[5, 8, 2],[2, 8, 5],[0, 4, 8],[4, 8, 0],[0, 8, 4],[2, 4, 6],[4, 6, 2],[2, 6, 4]];
var forks = [[1, 3, 0],[1, 5, 2],[5, 7, 8],[7, 3, 6],[1, 3, 4],[1, 5, 4],[5, 7, 4],[3, 7, 4],[1, 8, 2],[1, 6, 0],[5, 0, 2],[5, 6, 8],[7, 2, 8],[7, 0, 6],[3, 8, 6],[3, 2, 0]]
var oppCorners = [[0, 8],[2, 6]];
var corners = [0, 2, 6, 8];
var sides = [1, 5, 7, 3];
var lboard = [];

function selection(c) {
  player = c;
  document.getElementById("initialise").innerHTML = '<div class="grid"><input type="button" class="basic" id="0" value=" " onClick="played(0)"><input type="button" class="basic" id="1" value=" " onClick="played(1)"><input type="button" class="basic" id="2" value=" " onClick="played(2)"></div><div class="grid"><input type="button" class="basic" id="3" value=" " onClick="played(3)"><input type="button" class="basic" id="4" value=" " onClick="played(4)"><input type="button" class="basic" id="5" value=" " onClick="played(5)"></div><div class="grid"><input type="button" class="basic" id="6" value=" " onClick="played(6)"><input type="button" class="basic" id="7" value=" " onClick="played(7)"><input type="button" class="basic" id="8" value=" " onClick="played(8)"></div><div class="grid"><input type="button" class="reset" id="reset" value="Reset" onClick="reset()"></div></div>';
  if (player == "X") {
    ai = "O"
  } else {
    ai = "X";
  }
  document.getElementById("player").innerHTML = "Player chose: " + c;
  document.getElementById("ai").innerHTML = "AI is playing: " + ai;
}

function played(a) {
  if (status == "") {
    if (player == "X") {
      document.getElementById(a).value = "X";
      turns = turns + 1;
      board[a] = "X";
  //    update();
      check("X");
      computer("X");
    } else {
      document.getElementById(a).value = "O";
      turns = turns + 1;
      board[a] = "O";
  //    update();
      check("O")
      computer("O");
    }
  }
}

function reset() {
  turns = 0;
  track = [];
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  status = "";
  player = "";
  for (i = 0; i < board.length; i++) {
    document.getElementById(i).value = " ";
  }
  document.getElementById("turns").innerHTML = "";
  document.getElementById("player").innerHTML = "";
  document.getElementById("ai").innerHTML = "";
  document.getElementById("winner").innerHTML = "";
  document.getElementById("initialise").innerHTML = "";
  document.getElementById("board").innerHTML = "";
}

//function update() {
//  document.getElementById("turns").innerHTML = "Number of turns: " + turns;
//  document.getElementById("board").innerHTML = board;
//}

function check(b) {
  if ((board[0] == b && board[1] == b && board[2] == b) || (board[3] == b && board[4] == b && board[5] == b) || (board[6] == b && board[7] == b && board[8] == b) || (board[0] == b && board[3] == b && board[6] == b) || (board[1] == b && board[4] == b && board[7] == b) || (board[2] == b && board[5] == b && board[8] == b) || (board[0] == b && board[4] == b && board[8] == b) || (board[6] == b && board[4] == b && board[2] == b)) {
    document.getElementById("winner").innerHTML = b + " wins";
    status = "finished";
    } else {
    if (turns === 9) {
      document.getElementById("winner").innerHTML = "Draw";
    }
//    update();
  }
}

function computer(d) {
  //detect opportunity to win and take it
  for (i = 0; i < nextWinner.length; i++) {
    if (turns % 2 == 0) {
     } else {
     if (board[nextWinner[i][0]] == ai && board[nextWinner[i][1]] == ai && board[nextWinner[i][2]] == "") {
        document.getElementById(nextWinner[i][2]).value = ai;
        board[nextWinner[i][2]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
      }
    }
  }

  //detect need to block player winning and block it
  for (i = 0; i < nextWinner.length; i++) {
    if (turns % 2 == 0) {} else {
      if (board[nextWinner[i][0]] == player && board[nextWinner[i][1]] == player && board[nextWinner[i][2]] == "") {
        document.getElementById(nextWinner[i][2]).value = ai;
        board[nextWinner[i][2]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
      }
    }
  }

  //determine if there's an opportunity to create a fork and take it
  for (i = 0; i < forks.length; i++) {
    if (turns % 2 == 0) {
    } else {
      if (board[forks[i][0]] == ai && board[forks[i][1]] == ai && board[forks[i][2]] == "") {
        document.getElementById(forks[i][2]).value = ai;
        board[forks[i][2]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
        }
      }
  }

  //if player can create a fork, block it
  for (i = 0; i < forks.length; i++) {
    if (turns % 2 == 0) {
      } else {
      if (board[forks[i][0]] == player && board[forks[i][1]] == player && board[forks[i][2]] == "") {
        document.getElementById(forks[i][2]).value = ai;
        board[forks[i][2]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
      }
    }
  }

  //if center is available, then take it
  if (turns % 2 == 0) {
    } else {
    if (board[4] == "") {
      document.getElementById(4).value = ai;
      board[4] = ai;
      check(ai);
     turns = turns + 1;
//      update();
    }
  }

 //if player takes a corner, take the opposite corner
  for (i = 0; i < oppCorners.length; i++) {
    if (turns % 2 == 0) {
      } else {
      if (board[oppCorners[i][0]] == player && board[oppCorners[i][1]] == "") {
        document.getElementById(oppCorners[i][1]).value = ai;
        board[oppCorners[i][1]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
    }
  }
  }

 //if there's a corner free take it
  for (i = 0; i < corners.length; i++) {
    if (turns % 2 == 0) {
      } else {
      if (board[corners[i]] == "") {
        document.getElementById(corners[i]).value = ai;
        board[corners[i]] = ai;
        check(ai);
        turns = turns + 1;
//        update();
      }
    }
  }

//if there's a side free take it
    for (i = 0; i < sides.length; i++) {
    if (turns % 2 == 0) {
      } else {
      if (board[sides[i]] == "") {
      document.getElementById(sides[i]).value = ai;
      board[sides[i]] = ai;
      check(ai);
      turns = turns + 1;
//      update();
    }
  }
  }
}
