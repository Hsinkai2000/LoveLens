import '../Styles/EnterRoom.css'
import weddingpic from '../../images/weddingpic.png'

export default function EnterRoom() {

    return(
        <div className='enterRoomContainer'>
            <div className='enterRoomContent'>
                <div className='loveLens'><p className='prodName'>LOVE LENS</p></div>
                <div className='wedpic'><img src={weddingpic} alt="Wedding Couple"/></div>
                <div className='roomCode'>
                    <form className='codeSubmission'>
                        <input placeholder='Enter Room Code'></input>
                        <div className='submitCode'><button className='submitRoom'>Enter Room</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}