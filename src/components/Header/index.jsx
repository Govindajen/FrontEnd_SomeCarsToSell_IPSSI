
import './header.css'
import { Link, useNavigate } from 'react-router-dom'


export default function Header () {
    const Navigate = useNavigate()

    const username = localStorage.getItem('username')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.assign('/login')    
    }

    return (
        <nav className="navbar">
            <Link to="/home">
              <h1 className='title'>SomeCarsToSell</h1>
            </Link>

            <div className='links'>
                <div>
                    <p className="logout" onClick={() => Navigate('/newAnnounce')}>Create Announce</p>
                </div>
                {/* <Link className="navItem" to='/home'>Home</Link> */}
                <span className='spacer'></span>
                <p className='welcome'>Welcome back! <span className='name'>{username}</span></p>
                <p className="logout" onClick={handleLogout}>Logout</p>
            </div>
        </nav>
    )
}