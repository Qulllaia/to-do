import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { addLogAction } from "../store/userReducer";

export const Home = () =>{

    const [name, setName] = useState();

    const dispatch = useDispatch()

    const saveLogUser = (user) =>{
        dispatch(addLogAction(user))
    }

    useEffect(() => {
        (
            async () =>{
                const response = await fetch("http://localhost:8000/api/user",{
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    credentials:'include',
                })
            
                const content = await response.json()
            
                setName(content.name)
                saveLogUser(content)
            }
            
        )()
    });

    return(
        <h1>{name ? `Hi ${name}` : 'Not Auth'}</h1>
    )
}