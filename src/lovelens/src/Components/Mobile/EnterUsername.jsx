import '../Styles/EnterUsername.css'
import weddingpic from '../../images/weddingpic.png'

export default function EnterUsername() {

    return(
        <div className='enterUsernameContainer'>
            <div className='enterUsernameContent'>
                <div className='loveLens'><p className='prodName'>LOVE LENS</p></div>
                <div className='wedpic'><img src={weddingpic} alt="Wedding Couple"/></div>
                <div className='roomUsername'>
                    <div><p>Room Code: 48801</p></div>
                    <form className='usernameSubmission'>
                        <input placeholder='Enter Username'></input>
                        <div className='submitUsername'><button className='submitName'>Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}