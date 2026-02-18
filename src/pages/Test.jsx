import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Award, RotateCcw, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressRing from '../components/ui/ProgressRing';
import Badge from '../components/ui/Badge';
import './Test.css';

const mockQuizzes = [
    {
        id: 1,
        title: "Verses 1-5 Comprehension",
        questions: 5,
        duration: "5 mins",
        difficulty: "Beginner",
        status: "available"
    },
    {
        id: 2,
        title: "Tajweed Basics: Ghunna",
        questions: 10,
        duration: "10 mins",
        difficulty: "Intermediate",
        status: "locked"
    }
];

const mockQuestions = [
    {
        id: 1,
        question: "What does 'Alif, Lam, Meem' mean?",
        options: [
            "The Most Merciful",
            "Only Allah knows their meaning",
            "The Opening",
            "The Straight Path"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Who is this Book (Quran) a guidance for?",
        options: [
            "Everyone",
            "The Muttaqeen (God-conscious)",
            "The Rich",
            "The Travelers"
        ],
        correct: 1
    },
    {
        id: 3,
        question: "Which of these is NOT mentioned as a quality of the believers in verses 3-4?",
        options: [
            "Believing in the unseen",
            "Establishing prayer",
            "Fasting in Ramadan",
            "Believing in what was sent down before"
        ],
        correct: 2 // Fasting is not in first 5 verses explicitly
    }
];

const Test = () => {
    const [view, setView] = useState('list'); // list, taking, result
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const startQuiz = (quiz) => {
        setCurrentQuiz(quiz);
        setView('taking');
        setCurrentQuestionIdx(0);
        setAnswers({});
        setScore(0);
    };

    const handleAnswer = (optionIdx) => {
        setAnswers({ ...answers, [currentQuestionIdx]: optionIdx });
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < mockQuestions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            calculateScore();
            setView('result');
        }
    };

    const calculateScore = () => {
        let correct = 0;
        mockQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correct++;
        });
        setScore(Math.round((correct / mockQuestions.length) * 100));
    };

    return (
        <div className="test-page">
            {view === 'list' && (
                <>
                    <header className="page-header">
                        <h1>Tests & Quizzes</h1>
                        <div className="filter-tabs">
                            <button className="filter-tab active">Available</button>
                            <button className="filter-tab">Completed</button>
                        </div>
                    </header>

                    <div className="quiz-list">
                        {mockQuizzes.map(quiz => (
                            <Card key={quiz.id} className={`quiz-card ${quiz.status === 'locked' ? 'locked' : ''}`}>
                                <div className="quiz-info">
                                    <div className="quiz-meta">
                                        <Badge variant={quiz.difficulty === 'Beginner' ? 'success' : 'warning'}>
                                            {quiz.difficulty}
                                        </Badge>
                                        <span className="duration"><Clock size={14} /> {quiz.duration}</span>
                                    </div>
                                    <h3>{quiz.title}</h3>
                                    <p>{quiz.questions} Questions</p>
                                </div>
                                <Button
                                    className="start-btn"
                                    onClick={() => quiz.status !== 'locked' && startQuiz(quiz)}
                                    disabled={quiz.status === 'locked'}
                                >
                                    {quiz.status === 'locked' ? 'Locked' : 'Start'}
                                </Button>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {view === 'taking' && (
                <div className="quiz-interface">
                    <div className="quiz-header">
                        <Button variant="ghost" onClick={() => setView('list')}>Exit</Button>
                        <div className="timer"><Clock size={16} /> 04:59</div>
                    </div>

                    <div className="progress-bar-container">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentQuestionIdx + 1) / mockQuestions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="question-area">
                        <span className="q-number">Question {currentQuestionIdx + 1}/{mockQuestions.length}</span>
                        <h2>{mockQuestions[currentQuestionIdx].question}</h2>

                        <div className="options-list">
                            {mockQuestions[currentQuestionIdx].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    className={`option-btn ${answers[currentQuestionIdx] === idx ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(idx)}
                                >
                                    <div className="option-marker">{['A', 'B', 'C', 'D'][idx]}</div>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quiz-footer">
                        <Button
                            className="next-btn"
                            onClick={nextQuestion}
                            disabled={answers[currentQuestionIdx] === undefined}
                        >
                            {currentQuestionIdx === mockQuestions.length - 1 ? 'Submit' : 'Next'} <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            )}

            {view === 'result' && (
                <div className="result-interface">
                    <Card className="result-card">
                        <Award size={64} className="award-icon" />
                        <h2>Quiz Completed!</h2>
                        <div className="score-ring">
                            <ProgressRing radius={80} stroke={10} progress={score} color="var(--success-color)" />
                        </div>
                        <p className="score-label">You scored {score}%</p>

                        <div className="result-stats">
                            <div className="stat">
                                <span className="val">{Math.round((score / 100) * mockQuestions.length)}</span>
                                <span className="lbl">Correct</span>
                            </div>
                            <div className="stat">
                                <span className="val">{mockQuestions.length - Math.round((score / 100) * mockQuestions.length)}</span>
                                <span className="lbl">Wrong</span>
                            </div>
                        </div>
                    </Card>

                    <div className="result-actions">
                        <Button onClick={() => startQuiz(currentQuiz)} variant="secondary">
                            <RotateCcw size={20} className="mr-2" /> Retake
                        </Button>
                        <Button onClick={() => setView('list')}>
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Test;
