import React, { useState, useEffect } from 'react';
import ResultPopup from "./ResultPopup.jsx";
import "./Question.css";

function Question(){

    const [questionData, setData] = useState(null);
    const [currentIndex, setIndex] = useState(0);
    const [answers, setAnswers] = useState(null);
    const [showComponent, setShowComponent] = useState(false);
    const [isCorrect, setCorrect] = useState(false);

    useEffect(() => {
        getQuestionData();
    }, []);

    useEffect(() => {
        if(!questionData){
            return;
        }
        shuffleAnswers();
    }, [currentIndex, questionData])

    if(!answers){
        return(
            <h1 style={{ color: "white"}}>Retrieving Data...</h1>
        );
    }

    /*if(!answers){
        return(
            <div className="questionContainer">
                <h1>This is the question</h1>
                <div className="answer">
                    <button >A</button>
                    <p>Answer A</p> 
                </div>

                <div className="answer">
                    <button>B</button>
                    <p>Answer B</p> 
                </div>

                <div className="answer">
                    <button>C</button>
                    <p>Answer C</p> 
                </div>

                <div className="answer">
                    <button>D</button>
                    <p>Answer D</p> 
                </div>
            </div>
            
        );
    }*/

    return(
            <div className="questionContainer">
                {showComponent && <ResultPopup children={isCorrect ? "You are correct!" : "You are incorrect!"} onClose = {
                    () => {
                        setShowComponent(false);
                        loadNewQuestion();
                }}/>}
                <h1 dangerouslySetInnerHTML={{ __html: questionData.results[currentIndex].question }} />
                <div className="answer">
                    <button onClick={() => checkAnswer(0)} >A</button>
                    <p>{answers[0]}</p> 
                </div>

                <div className="answer">
                    <button onClick={() => checkAnswer(1)}>B</button>
                    <p>{answers[1]}</p> 
                </div>

                <div className="answer">
                    <button onClick={() => checkAnswer(2)}>C</button>
                    <p>{answers[2]}</p> 
                </div>

                <div className="answer">
                    <button onClick={() => checkAnswer(3)}>D</button>
                    <p>{answers[3]}</p> 
                </div>
            </div>
            
        );
    async function getQuestionData(){
        try{
            const response = await fetch("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple");
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                console.error("No questions received from API");
                return;
            }
            setData(data);
            const answers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
            const shuffledAnswers = answers.sort(() => Math.random() - .5);
            setAnswers(shuffledAnswers);
        }
        catch(error){
            console.log(error);
        }
        
    }

    

    function shuffleAnswers(){
        const answers = [...questionData.results[currentIndex].incorrect_answers, questionData.results[currentIndex].correct_answer];
        const shuffledAnswers = answers.sort(() => Math.random() - .5);
        setAnswers(shuffledAnswers);
    }
    function checkAnswer(choice){
        if(!answers){
            return;
        }
        if(answers[choice] == questionData.results[currentIndex].correct_answer){
            setCorrect(true);
        }
        else{
            setCorrect(false);
        }
        setShowComponent(true);
    }


    function loadNewQuestion(){
        if(currentIndex > questionData.results.length){
            alert("You finished!");
            return;
        }
        setIndex(currentIndex + 1);
        setShowComponent(false);
    }
    
    
}
export default Question;