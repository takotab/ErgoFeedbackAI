import firebase from '../firebase-keys'
import FirebaseLogin from "./FirebaseLogin";


export default class LoginFirebase extends React.Component {


    render() {
        return (
            <FirebaseLogin
                login={user => console.warn(user)}
            />
        )
    }
}