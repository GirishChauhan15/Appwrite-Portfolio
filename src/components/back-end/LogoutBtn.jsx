import React from 'react'
import service from "../../appwrite/auth";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import {Button} from './index'
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        service.logout().then(()=>(
          dispatch(logout()),
          navigate('/admin')
        ))
        .catch(()=>
          navigate('/admin')
        )
    };

return (
<Button
type='button'
onClick={logoutHandler}
>Logout</Button>
  )
}

export default LogoutBtn