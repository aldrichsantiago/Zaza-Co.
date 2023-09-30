import { PropsWithChildren, createContext, useState } from 'react'

const AuthContext = createContext({});


export interface UseAuthProps {
    auth?: any
    setAuth?: React.Dispatch<React.SetStateAction<{}>>
  }


export const AuthProvider = ({ children }:PropsWithChildren ) => {
    const [auth, setAuth] = useState<UseAuthProps>({})
    console.log(auth);
    
    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext