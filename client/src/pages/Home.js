import {useState} from 'react'

const Home = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)

    const url = "/backend"
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (username.length === 0 || email.length === 0) {
            setErrorMsg('Incomplete user data')
            setSuccessMsg('')
        }else {
            fetch(`${url}/add-user`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({username, email})     
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                if (data.message === 'no_input') {
                    setErrorMsg('All input fields are required')
                    setSuccessMsg('')
                }else if (data.message === 'user_created') {
                    setSuccessMsg('User successfully created')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 2000)
                    fetch(`${url}/get-users`)
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                        setCount(result.message.length)
                        setUsers(result.message)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <div className="username">
                        <span className="username-text">Username:</span>
                        <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <span className="email-text">Email:</span>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="btn-div">
                        <button>Save</button>
                    </div>
                    {errorMsg && <p className="error-msg">{errorMsg}</p>}
                    {successMsg && <p className="success-msg">{successMsg}</p>}
                </form>
            </div>
            <hr></hr>
            <div className="users-container">
                <div className="users-count">
                    <h3>All Users</h3>
                    <p>Count : <span className="count">{count}</span></p>
                </div>
                <div className="users">
                    {users.map((user) => (
                        <p key={user._id}>{user.username}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home