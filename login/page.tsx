import "./login.css"

export default function Login(){
    return(
        <div className="login">
            <label>Email: </label>
            <br></br>
            <br></br>
            <input type="text"></input>
            <br></br>
            <br></br>
            <label>Password: </label>
            <br></br>
            <br></br>
            <input type="text"></input>
            <br></br>
            <br></br>
            <button>Login</button>
        </div>
    )
}
