import '../Styles/Login.css'
import weddingpic from '../../images/weddingpic.png'

export default function Login() {
    return(
        <div className='loginPageContainer'>
            <div className="contentContainer">
                <div>
                    <div className='emptyContainer'></div>
                    <img src={weddingpic} alt="Wedding Couple"/>
                </div>
                <div>
                    <div className='loveLens'><p className='prodName'>LOVE LENS</p></div>
                    <div className='loginSectionContainer '>
                        <h1>LOGIN/SIGN UP</h1>
                        <form className='loginForm'>
                            <div className='emailContainer'>
                                <label>Email</label>
                                <input type='email'></input>
                            </div>
                            <div className='passwordContainer'>
                                <label>Password</label>
                                <input type='password'></input>
                            </div>
                            <button className='loginButton'>LOGIN/SIGNUP</button>
                            <div className='otherLogins'>
                                <div className='hrContainer'><hr></hr></div>
                                <p>login with others</p>
                                <div className='hrContainer'><hr></hr></div>
                            </div>
                            <button className='googleLoginButton'>LOGIN WITH GOOGLE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}