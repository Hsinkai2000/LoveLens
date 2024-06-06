import '../Styles/Login.css';
import weddingpic from '../../images/weddingpic.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword
} from '../../utils/firebase.utils';
import { NavigationPaths } from '../Routes/NavigationPaths';
import { LOCALSTORAGEKEY } from '../../LocalStorageKeys';
import axios from 'axios';

const defaultValues = {
    email: '',
    password: ''
};

export default function Login() {
    const [fields, setFields] = useState(defaultValues);
    const [data, setData] = useState([]);
    const { email, password } = fields;
    const navigation = useNavigate();

    console.log("URL" + process.env.REACT_APP_URL );

    const signIn = async (event) => {
        console.log('Sign in');
        try {
            const user = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log(user);

            if (user) {
                axios
                    .post(
                        process.env.REACT_APP_URL + '/api/login',
                        JSON.stringify({
                            email: email,
                            password: password
                        }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then((res) => {
                        const { User } = res.data;
                        setData(User);

                        localStorage.setItem(
                            LOCALSTORAGEKEY.login_details,
                            JSON.stringify({
                                email: email,
                                uid: User.uid,
                                accessToken: User.stsTokenManager.accessToken,
                                displayName: User.providerData[0].displayName
                            })
                        );

                        // console.log("UID: " + User.uid + "Access Token: " + User.stsTokenManager.accessToken + "Display Name: " + User.providerData[0].displayName)
                        // console.log("UID: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).uid + "Access Token: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).accessToken + "Display Name: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).displayName)

                        navigation(NavigationPaths.adminDashboardPath);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user with this email address was found');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            console.log('User: ' + user);

            if (user) {
                axios
                    .post(
                        process.env.REACT_APP_URL + '/api/login',
                        JSON.stringify({
                            email: email,
                            password: password
                        }),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    .then((res) => {
                        const { User } = res.data;
                        setData(User);

                        localStorage.setItem(
                            LOCALSTORAGEKEY.login_details,
                            JSON.stringify({
                                email: email,
                                uid: User.uid,
                                accessToken: User.stsTokenManager.accessToken,
                                displayName: User.providerData[0].displayName
                            })
                        );

                        // console.log("UID: " + User.uid + "Access Token: " + User.stsTokenManager.accessToken + "Display Name: " + User.providerData[0].displayName)
                        // console.log("UID: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).uid + "Access Token: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).accessToken + "Display Name: " + JSON.parse(localStorage.getItem(LOCALSTORAGEKEY.login_details)).displayName)
                        navigation(NavigationPaths.adminDashboardPath);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        } catch (error) {
            console.log('Message: ' + error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    await signIn();
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            console.log(user);

            if (user) {
                localStorage.setItem(
                    LOCALSTORAGEKEY.login_details,
                    JSON.stringify({
                        email: email,
                        uid: user.uid,
                        accessToken: user.stsTokenManager.accessToken,
                        displayName: user.providerData[0].displayName
                    })
                );

                navigation(NavigationPaths.adminDashboardPath);
            }
        }
        catch(error) {
            console.log('Message: ' + error.code);
        }
    };

    return (
        <div className="loginPageContainer">
            <div className="contentContainer">
                <div>
                    <div className="emptyContainer"></div>
                    <img src={weddingpic} alt="Wedding Couple" />
                </div>
                <div>
                    <div className="loveLens">
                        <p className="prodName">LOVE LENS</p>
                    </div>
                    <div className="loginSectionContainer ">
                        <h1>LOGIN/SIGN UP</h1>
                        <form className="loginForm" onSubmit={submitHandler}>
                            <div className="emailContainer">
                                <label>Email</label>
                                <input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                ></input>
                            </div>
                            <div className="passwordContainer">
                                <label>Password</label>
                                <input
                                    label="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    required
                                ></input>
                            </div>
                            <button className="loginButton" type="submit">
                                LOGIN/SIGNUP
                            </button>

                            <div className="otherLogins">
                                <div className="hrContainer">
                                    <hr></hr>
                                </div>
                                <p>login with others</p>
                                <div className="hrContainer">
                                    <hr></hr>
                                </div>
                            </div>
                            <button
                                className="googleLoginButton"
                                onClick={signInWithGoogle}
                            >
                                LOGIN WITH GOOGLE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
