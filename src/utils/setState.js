import { setUserData } from "../redux/slices/userSlice";
import { get } from "./requests";
import { config } from '../Constants'


export function setState(navigate, dispatch) {
    if (sessionStorage.getItem('state')){
      const state = JSON.parse(sessionStorage.getItem('state'))
      console.log(state)
      dispatch(
        setUserData(state)
      )
    }else if (sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')
      const id = sessionStorage.getItem('id')
        get(
            `${config.API_URL}/users/${id}`,
            token
          ).then((res) => {
            const data = {
                name: res.data.name,
                lastname: res.data.lastname,
                phoneNumber: Number(res.data.phoneNumber),
                email: res.data.email,
                isDriver: res.data.isDriver,
            }
            sessionStorage.setItem("state",  JSON.stringify(data))
            dispatch(
              setUserData(data)
            )
          })
          return true
    }else{
      navigate("/login")
      return false
    }
}
