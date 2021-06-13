var bcrypt = require('bcryptjs');
var salt = "$2a$10$J5U8hNtst/EwkJnL3e5/Ge";
const e = React.createElement;

class AuthenticateUser extends React.Component {
    constructor(props) {
    super(props);
        this.state = {username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  
    handleChangeUsername(event) {
        this.setState({username: event.target.value, password: this.state.password});
    }

    handleChangePassword(event) {
        this.setState({username: this.state.username, password: event.target.value});
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                <h1>Login Page</h1>
                    <label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
                    </label><br/>
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handleChangePassword}/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                    <input type="button" value="Create new User" onClick={this.goToCreateUser}/>
                </form>
                );
  }
    
    handleSubmit(event) {
        fetch('http://localhost:8080/auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
            },
            redirect: 'follow',
            body: JSON.stringify({
                username: this.state.username,
                password: bcrypt.hashSync(this.state.password, salt)
            })})
                .then(response => response.json())
                .then(function (data) {
                    if (data === true)
                    {
                        window.location.replace("DisplayUser.html");
                    }
                    else
                    {
                        alert("Authentication Failed:\nUser not found or password does not match");
                    }
                })                
                .catch((error) => {
                    console.error('Error:', error);
                });
        event.preventDefault();
    }

    goToCreateUser(){
        window.location.assign("CreateUser.html");
        
    }
    
}
const domContainer = document.querySelector('#login_container');
ReactDOM.render(e(AuthenticateUser), domContainer);