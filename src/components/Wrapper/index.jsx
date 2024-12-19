import Header from "../Header"
import './wrapper.css'

export default function Wrapper({ children }) {

    return (
        <div className="wrapper">
            <div className="header">
                <Header />

            </div>
            <div className="content">
                {children}
            </div>
        </div>

    )
}