import './Quiz.css'
import logo from '../assets/quizlogo.avif';
export default function Header() {
    return <header className="QuizQuestion">
        <img  id='mlogo' src={logo}/ >
        <h1 >React Quiz</h1>
    </header>
    
}