import {useState} from 'react'

const Home = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)

    const url = 'backend'     //for docker-compose file
    //const url = '/backend'    for k8s with ingess rule
    //const url = 'backend:9000'  for k8s with NodePort as service type for frontend and mongo-express 
    //const url = 'http://localhost:9000' // for local development
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (username.length === 0 || email.length === 0) {
            setErrorMsg('Incomplete user data')
            setSuccessMsg('')
            setTimeout(() => {
                setErrorMsg('') 
                setUsername('')
                setEmail('')        
            }, 3000)
        }else {
            fetch(url, {
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
                if (data.message === 'no_username') {
                    setErrorMsg('username is required')
                    setSuccessMsg('')
                    setTimeout(() => {
                        setErrorMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 3000)
                }else if (data.message === 'no_email') {
                    setErrorMsg('email is required')
                    setSuccessMsg('')
                    setTimeout(() => {
                        setErrorMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 3000)
                }else if (data.message === 'user_exist') {
                    setErrorMsg('User already exist')
                    setSuccessMsg('')
                    setTimeout(() => {
                        setErrorMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 3000)
                }else if (data.message === 'server_error') {
                    setErrorMsg('Error occured. Try again later')
                    setSuccessMsg('')
                    setTimeout(() => {
                        setErrorMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 3000)
                }else if (data.message === 'user_added') {
                    setSuccessMsg('User successfully created')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('') 
                        setUsername('')
                        setEmail('')        
                    }, 3000)
                    setCount(data.data.length)
                    setUsers(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
                setErrorMsg('Error occured. Try again later')
                setSuccessMsg('')
                setTimeout(() => {
                    setErrorMsg('') 
                    setUsername('')
                    setEmail('')        
                }, 3000)
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