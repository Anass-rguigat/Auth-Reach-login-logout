import { createContext, useContext } from "react";
import AuthStore from "./authStore.tsx"

export interface IRootStore {
    authStore: AuthStore;
    handleError: Function
}
export class RootStore implements IRootStore{
    authStore: AuthStore
    constructor() {
        console.log("RootStore")
        this.authStore = new AuthStore(this)
    }
    public handleError = (errorCode: number | null = null, errorMessage: string, errorData: any) =>{
        console.error("handleError :" , errorData )
        if(errorCode === 403 ){
            this.authStore.setIsAuthenticated(false)
            return null;
        }
    }
}
const rootStoreContext = createContext({
    rootStore: new RootStore()
})
export const useStore = () => useContext(rootStoreContext)