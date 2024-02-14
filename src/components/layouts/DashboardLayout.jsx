import React from 'react'
import { Outlet } from 'react-router-dom'
import { useStore } from '../../store/rootStore.tsx';
import { observer } from 'mobx-react-lite';

const DashboardLayout = () => {
    const { rootStore: { authStore } } = useStore()
    const logout = async () =>{
        try {
            const resData = await authStore.logout()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <header><button onClick={logout}>logout</button></header>
    <Outlet/>
    </>
  )
}
export default observer(DashboardLayout)