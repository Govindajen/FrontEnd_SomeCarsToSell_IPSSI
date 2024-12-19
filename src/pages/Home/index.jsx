import { useEffect, useState } from "react";
import { AnnounceElement, AnnounceCards } from "../../components/Announce/announceCard";
import axios from "axios";
import './home.css'

export default function Home() {

    const [announces, setAnnounces] = useState([])

    useEffect( () => {
        axios.get("http://localhost:3001/announces", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }}).then((response) => {
                setAnnounces(response.data)
            }).catch((error) => {  
                console.log(error)
            })

    }, [])

    return (
        <div className="homeContent">
            <p>All announces:</p>
            <div className="allAnnounceCards">
                {location.pathname.includes("/announce") ? 
                    <AnnounceElement announces={announces}/> :
                    <AnnounceCards announces={announces} />
                }
            </div>
        </div>
    )
}