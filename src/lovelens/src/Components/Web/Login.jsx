import '../Styles/Login.css'
import weddingpic from '../../images/weddingpic.png'
import { useState } from "react";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const defaultValues = {
    email: "",
    password: "",
};

export default function Login() {
    const [fields, setFields] = useState(defaultValues);
    const { email, password } = fields;

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("No user with this email address was found");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

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
                        <form className='loginForm' onSubmit={submitHandler}>
                            <div className='emailContainer'>
                                <label>Email</label>
                                <input label="Email" name='email' type='email' value={email} onChange={handleChange} required></input>
                            </div>
                            <div className='passwordContainer'>
                                <label>Password</label>
                                <input label="Password" name='password' value={password} onChange={handleChange} required></input>
                            </div>
                            <button className='loginButton' type="submit">LOGIN/SIGNUP</button>

                            <div className='otherLogins'>
                                <div className='hrContainer'><hr></hr></div>
                                <p>login with others</p>
                                <div className='hrContainer'><hr></hr></div>
                            </div>
                            <button className='googleLoginButton' onClick={signInWithGoogle}>LOGIN WITH GOOGLE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}