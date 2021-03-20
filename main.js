var board = new Array();
var score = 0;
var hasConflicted = new Array();

// 触控相关
var startx = 0, starty = 0;
var endx = 0, endy = 0;

$(function () {
    prepareForMobile();
    newGame();
});

function newGame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function prepareForMobile(){
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSideWidth = 100;
        cellSpace = 20;     
    }

    $("#grid-container").css("width", gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("height", gridContainerWidth - 2*cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", gridContainerWidth*0.02);

    $(".grid-cell").css("width", cellSideWidth);
    $(".grid-cell").css("height", cellSideWidth);
    $(".grid-cell").css("border-radius", gridContainerWidth*0.02);

}

function init(){
    for (let i = 0; i < 4; ++ i){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(let j = 0; j < 4; ++ j){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));

            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(let i = 0; i < 4; ++ i){
        for(let j = 0; j < 4; ++ j){
            $("#grid-container").append('<div class="number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-"+i+"-"+j);

            if(board[i][j] == 0){
                theNumberCell.css("width", 0);
                theNumberCell.css("height", 0);
                theNumberCell.css("top", getPosTop(i, j)+cellSideWidth/2);
                theNumberCell.css("left", getPosLeft(i, j)+cellSideWidth/2);
            }
            else{
                theNumberCell.css("width", cellSideWidth);
                theNumberCell.css("height", cellSideWidth);
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));

                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", cellSideWidth+"px");
    $(".number-cell").css("font-size", 0.6*cellSideWidth+"px");
}

function generateOneNumber(){
    if(noSpace(board)){
        return false;
    }
    // 随机生成位置
    var randx, randy;
    do{
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }while(board[randx][randy] != 0);

    // 随机生成位置
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

$(document).keydown(function (event){
    event.preventDefault();
    switch (event.keyCode){
        case 37:    // left
            if(moveLeft()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38:    // up
            if(moveUp()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39:    // right
            if(moveRight()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40:    // down
            if(moveDown()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
    }
});

document.addEventListener("touchmove", function(event){
    event.preventDefault();
});

document.addEventListener("touchstart", function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener("touchend", function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if(deltax < documentWidth *0.25 && deltay < documentWidth * 0.25)
        return;
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            // right
            if(moveRight()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
        else{
            // left
            if(moveLeft()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
    }
    else{
        if(deltay > 0){
            // down
            if(moveDown()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
        else{
            // up
            if(moveUp()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
    }
});

function isgameover(){
    if(noSpace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("gameover!");
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    
    for(var i = 0; i < 4; ++ i){
        for(var j = 1; j < 4; ++ j){
            if(board[i][j] != 0){
                for(var k = 0; k < j; ++ k){
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updataScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}


function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    
    for(var i = 0; i < 4; ++ i){
        for(var j = 2; j >=0 ; -- j){
            if(board[i][j] != 0){
                for(var k = 3; k > j; -- k){
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updataScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    console.log("can up");
    for(var i = 1; i < 4; ++ i){
        for(var j = 0; j < 4; ++ j){
            if(board[i][j] != 0){
                for(var k = 0; k < i; ++ k){
                    if(board[k][j] == 0 && noBlockHorizontalCol(j, k, i, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockHorizontalCol(j, k, i, board) && !hasConflicted[k][j]){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updataScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    
    for(var i = 2; i >= 0; -- i){
        for(var j = 0; j < 4; ++ j){
            if(board[i][j] != 0){
                for(var k = 3; k > i ; -- k){
                    if(board[k][j] == 0 && noBlockHorizontalCol(j, i, k, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board) && !hasConflicted[k][j]){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updataScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
