import React from 'react'
import { useStore } from '../store/rootStore.tsx';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const PrivateRoute: React.FC<{
    element: JSX.Element;
}> = ({element}) => {
    const { rootStore: {authStore}} = useStore()
    const isAuthenticated = authStore.isAuthenticated
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
  return element;
}

export default observer(PrivateRoute)