function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: cellSideWidth,
        height: cellSideWidth,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(srcx, srcy, tagx, tagy){
    var numberCell = $("#number-cell-" + srcx + "-"+srcy);

    numberCell.animate({
        top: getPosTop(tagx, tagy),
        left: getPosLeft(tagx, tagy)
    }, 200);
}

function updataScore(score){
    $("#score").text(score);
}

