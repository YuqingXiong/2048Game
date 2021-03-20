documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideWidth = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop(i, j){
    return i*(cellSpace + cellSideWidth) + cellSpace;
}

function getPosLeft(i, j){
    return j*(cellSpace + cellSideWidth)  + cellSpace;
}

function getNumberBackgroundColor(num){
    switch(num){
        case 2: return "#adf790"; break;
        case 4: return "#87cefa"; break;
        case 8: return "#00fa9a"; break;
        case 16: return "#e4f73c"; break;
        case 32: return "#ffc400"; break;
        case 64: return "#ff6600"; break;
        case 128: return "#ff4500"; break;
        case 256: return "#ff0000"; break;
        case 512: return "#663399"; break;
        case 1024: return "#800080"; break;
        case 2048: return "#310258"; break;
        case 4096: return "#200017"; break;
        case 8192: return "#200017"; break;
    }
    return "black";
}

function getNumberColor(num){
    if(num <= 4){
        return "#ffffff";
    }
    return "#ffffff";
}

function noSpace(board){
    for(let i = 0; i < 4; ++ i){
        for(let j = 0; j < 4; ++ j){
            if(board[i][j] == 0)
                return false;
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i = 0; i < 4; ++ i){
        for(var j = 1; j < 4; ++ j){
            if(board[i][j] != 0){
                if(board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                    return true;
            }
        }
    }
    return false;
}
function canMoveRight(board){
    for(var i = 0; i < 4; ++ i){
        for(var j = 0; j < 3; ++ j){
            if(board[i][j] != 0){
                if(board[i][j + 1] == 0 || board[i][j] == board[i][j + 1])
                    return true;
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i = 1; i < 4; ++ i){
        for(var j = 0; j < 4; ++ j){
            if(board[i][j] != 0){
                if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i = 0; i < 3; ++ i){
        for(var j = 0; j < 4; ++ j){
            if(board[i][j] != 0){
                if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

function noBlockHorizontal(r, c1, c2, board){
    for(var i = c1 + 1; i < c2; ++ i){
        if(board[r][i] != 0)
            return false;
    }
    return true;
}

function noBlockHorizontalCol(c, r1, r2, board){
    for(var i = r1 + 1; i < r2; ++ i){
        if(board[i][c] != 0)
            return false;
    }
    return true;
}

function nomove(){
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }
    return true;
}
