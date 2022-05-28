import React from 'react';
import { GoogleLogin } from 'react-google-login';

function Login() {
    const responseGoogle = (response) => {
        console.log(response);
    }
    return (
        // <div>
        //     <GoogleLogin
        //         clientId='913583542367-ed78knhimbup4i1s2kkmk63d0u8s9pcq.apps.googleusercontent.com'
        //         buttonText='Login with Google'
        //         onSuccess={responseGoogle}
        //         onFailure={responseGoogle}
        //         cookiePolicy={'single_host_origin'}
        //     >

        //     </GoogleLogin>
        // </div>
        <GoogleLogin
            clientId="913583542367-ed78knhimbup4i1s2kkmk63d0u8s9pcq.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            isSignedIn={true}
        />
    )
};

export default Login;