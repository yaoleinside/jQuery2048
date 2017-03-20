/**
 * Created by yaole on 2017/3/20.
 */
var score = 0;
var board = new Array();
var over = false;
init();


var newGame = function () {
    score = 0;
    init();
}

function init() {

    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {
            var cell = $('#cell-' + i + '-' + j);
            cell.css('top', getTop(i, j));
            cell.css('left', getLeft(i, j));
        }
    }
    for (var i = 0; i < 6; i++) {
        board[i] = new Array();
        for (var j = 0; j < 6; j++) {
            board[i][j] = 0;
        }
    }
    updataView();
}

//更新视图
function updataView() {
    $('.number').remove();
    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {
            if (board[i][j] > 0) {
                var str = "<div class='number'" + " id='number-" + i + '-' + j + "'></div>";
                $('.grid').append(str);
                var thisCell = $('#number-' + i + '-' + j);
                thisCell.css({
                    'width': 100,
                    'height': 100,
                    'top': getTop(i, j),
                    'left': getLeft(i, j),
                    'background-color': numberBgc(board[i][j]),
                    'color': numberColor(board[i][j]),
                }).text(board[i][j]);
            }
        }
    }
    generateOneNumber();
}

//随机一个新数字
function generateOneNumber() {
    var randomX
    var randomY;
    var isFull = true;

    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {
            if (board[i][j] === 0) {
                isFull = false;
            }
            if (score < board[i][j]) {
                score = board[i][j];
                $('#score').text(score);
            }
        }
    }
    if (isFull) {
        over = true;
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                var t = board[i][j];
                if ((t === board[i + 1][j]) || (t === board[i - 1][j]) || (t === board[i][j - 1]) || (t === board[i][j + 1])) {
                    over = false;
                }
            }
        }
        if (over) {
            alert('游戏结束, 分数 为' + score);
        }
        return true;
    }
    do {
        randomX = Math.floor(Math.random() * 4) + 1;
        randomY = Math.floor(Math.random() * 4) + 1;
    } while (board[randomX][randomY] !== 0);
    board[randomX][randomY] = Math.random() < 0.5 ? 2 : 4;
    showAnimate(randomX, randomY);
}

$(document).on('keydown', function (e) {
    switch (e.keyCode) {
        case 37://left
            moveLeft();
            break;
        case 38://up
            moveUp();
            break;
        case 39://right
            moveRight();
            break;
        case 40://down
            moveDown();
            break;
        default:
            return;
            break;
    }
    if (over) {
        return;
    }
    setTimeout(function () {
        updataView()
    }, 200);
});

function moveLeft() {
    for (var i = 1; i < 5; i++) {
        for (var j = 2; j < 5; j++) {
            if (board[i][j] === 0) {
                continue;
            }
            for (var k = j - 1; k > 0; --k) {
                if (board[i][k]) {
                    break;
                }
            }
            if (k === 0) {
                k = 1;
            }
            if (board[i][k] === board[i][j]) {
                board[i][k] += board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, i, k);
            } else if (board[i][k]) {
                var t = board[i][j];
                board[i][j] = 0;
                board[i][k + 1] = t;
                moveAnimation(i, j, i, k + 1);
            } else {
                board[i][k] = board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, i, k);
            }
        }
    }
    // generateOneNumber();
}

function moveRight() {
    for (var i = 1; i < 5; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[i][j] === 0) {
                continue;
            }
            for (var k = j + 1; k < 5; k++) {
                if (board[i][k]) {
                    break;
                }
            }
            if (k === 5) {
                k = 4;
            }
            if (board[i][k] === board[i][j]) {
                board[i][k] += board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, i, k);
            } else if (board[i][k]) {
                var t = board[i][j];
                board[i][j] = 0;
                board[i][k - 1] = t;
                moveAnimation(i, j, i, k - 1);
            } else {
                board[i][k] = board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, i, k);
            }
        }
    }
    // generateOneNumber();
}


function moveUp() {
    for (var i = 2; i < 5; i++) {
        for (var j = 4; j > 0; j--) {
            if (board[i][j] === 0) {
                continue;
            }
            for (var k = i - 1; k > 0; k--) {
                if (board[k][j]) {
                    break;
                }
            }
            if (k === 0) {
                k = 1;
            }
            if (board[k][j] === board[i][j]) {
                board[k][j] += board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, k, j);
            } else if (board[k][j]) {
                var t = board[i][j];
                board[i][j] = 0;
                board[k + 1][j] = t;
                moveAnimation(i, j, k + 1, j);
            } else {
                board[k][j] = board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, k, j);
            }
        }
    }
    // generateOneNumber();
}

function moveDown() {
    for (var i = 3; i > 0; i--) {
        for (var j = 4; j > 0; j--) {
            if (board[i][j] === 0) {
                continue;
            }
            for (var k = i + 1; k < 5; k++) {
                if (board[k][j]) {
                    break;
                }
            }
            if (k === 5) {
                k = 4;
            }
            if (board[k][j] === board[i][j]) {
                board[k][j] += board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, k, j);
            } else if (board[k][j]) {
                var t = board[i][j];
                board[i][j] = 0;
                board[k - 1][j] = t;
                moveAnimation(i, j, k - 1, j);
            } else {
                board[k][j] = board[i][j];
                board[i][j] = 0;
                moveAnimation(i, j, k, j);
            }
        }
    }
    // generateOneNumber();
}

function numberBgc(number) {
    if (number === 2) {
        return '#eee4da';
    } else if (number === 4) {
        return '#ede0c8';
    } else if (number === 8) {
        return '#f2b179';
    } else if (number === 16) {
        return '#f59563';
    } else if (number === 32) {
        return '#f67c5f';
    } else if (number === 64) {
        return '#f65e3b';
    } else if (number === 128) {
        return '#edcf72';
    } else if (number === 256) {
        return '#edcc61';
    } else if (number === 512) {
        return '#9c0';
    } else if (number === 1024) {
        return '#33b5e5';
    } else if (number === 2048) {
        return '#09c';
    } else {
        return;
    }
}

function numberColor(number) {
    switch (number) {
        case 2:
            return '#776e65';
        case 4:
            return '#776e65';
        default:
            return '#fff';
    }
}

function getTop(i, j) {
    return i * 120 - 100;
}

function getLeft(i, j) {
    return j * 120 - 100;
}

function moveAnimation(i, j, toi, toj) {
    var thisCell = $('#number-' + i + '-' + j);
    thisCell.animate({
        'top': getTop(toi, toj),
        'left': getLeft(toi, toj)
    }, 200)
}

function showAnimate(i, j) {
    var str = "<div class='number'" + " id='number-" + i + '-' + j + "'></div>";
    $('.grid').append(str);
    var thisCell = $('#number-' + i + '-' + j);
    thisCell.css({
        'width': 0,
        'height': 0,
        'top': getTop(i, j),
        'left': getLeft(i, j),
        'background-color': numberBgc(board[i][j]),
        'color': numberColor(board[i][j]),
    }).text(board[i][j]);
    thisCell.animate({
        'width': 100,
        'height': 100
    }, 200);
}