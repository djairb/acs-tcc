import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    // const [user, setUser] = useState({

    //     id_educador: null

    // });

    const [user, setUser] = useState({

        foto_perfil : null,
        id_educador : 1,
        nome : "Arthur Yure",
        senha : "senha123",
        usuario : "usuario1"

    });

   

    const toggleUser = (novoUsuario) => {
        
        setUser(novoUsuario);
    }

    return <UserContext.Provider value={{user, toggleUser}}>{children}</UserContext.Provider>


}