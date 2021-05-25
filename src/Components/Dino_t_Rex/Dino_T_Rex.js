import React, { useEffect, useState } from 'react'
import './Dino_T_Rex.css';

const Dino_T_Rex = () => {
    const [score, setScore] = useState(0);
    const [rotate, setRotate] = useState(false);

    useEffect(()=>{
        document.addEventListener('keydown', makeJerryJump)
        document.addEventListener('click', makeJerryJump)
        setInterval(checkIfCollisionHappened, 100);

        if(window.innerWidth < window.innerHeight){
            setRotate(true);
        }

        const tom_jerry_high_score = localStorage.getItem("tom_jerry_high_score");
        if(!tom_jerry_high_score){
            localStorage.setItem('tom_jerry_high_score', 0)
        }
    }, [])

    const makeJerryJump = ()=>{
        const tom_jerry_high_score = localStorage.getItem("tom_jerry_high_score");

        const jerry = document.getElementById("jerry");
        const tom = document.getElementById("tom");
        const gameOver = document.getElementById("game-over");

        console.log(jerry.classList.value)
        if(tom.classList.value == 'tom run' && jerry.classList.value !== 'jerry jump'){

            setScore((score)=> {
                if(score + 1 > tom_jerry_high_score){
                    localStorage.setItem("tom_jerry_high_score", score + 1)
                }
                return score + 1
            });

            console.log(score, tom_jerry_high_score)
            
            jerry.classList.add("jump")

            setTimeout(()=>{jerry.classList.remove("jump")}, 1000)
        }

        if(tom.classList.value !== 'tom run'){
            gameOver.classList.remove("show")
            gameOver.classList.add("hide")
            tom.classList.add("run")
        }


    }

    const checkIfCollisionHappened =()=>{
        const jerry = document.getElementById("jerry");
        const tom = document.getElementById("tom");
        const gameOver = document.getElementById("game-over");

        const jerry_top = parseInt(window.getComputedStyle(jerry).getPropertyValue('top'));
        const tom_right = parseInt(window.getComputedStyle(tom).getPropertyValue('left'));

        if(tom_right > 80 && tom_right < 140 && jerry_top > 140){ //(300 - 80 - 90) = 120 (20 +, 20 -) boxHeight - jerryHeight - tomHeight
            tom.classList.remove("run")
            gameOver.classList.remove("hide")
            gameOver.classList.add("show")
            setScore(0);
        }

    }
    return (
        <div className="game-container">
            <div className="score">Score : {score} # HighScore : {localStorage.getItem("tom_jerry_high_score") ? localStorage.getItem("tom_jerry_high_score") : 0}</div>
            <div id="game-over" className="game-over hide">Game Over...!!!</div>
            <div className="jerry" id="jerry" ></div>
            <div className="tom" id="tom"></div>
            {rotate && <div className="message-to-rotate-screen">Rotate your device and refresh the page.</div>}
        </div>
    )
}

export default Dino_T_Rex;