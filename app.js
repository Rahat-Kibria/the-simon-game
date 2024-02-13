$(document).ready(function () {
    let buttonColors = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let started = false;
    let level = 0;

    $(document).keydown(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    $(".btn").click(function () {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        // $(this).fadeOut(100).fadeIn(100);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if(gamePattern.length === userClickedPattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 500);
            startOver();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

});