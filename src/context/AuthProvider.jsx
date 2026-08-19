// import { useReducer } from "react";
// import { AuthContext } from "./AuthContext";
// const initialState = {
//   username: "",
//   photo_profile: "",
// };

// const authReducer = (prevState, action) => {
//   switch (action.type) {
//     case "Login":
//       return {
//         ...prevState,
//         username: action.payload.username,
//         photo_profile: action.payload.photo_profile,
//       };
//     case "Edit":
//       return {
//         ...prevState,
//         username: action.payload.username,
//         photo_profile: action.payload.photo_profile,
//       };
//     case "Logout":
//       return initialState;
//     default:
//       return prevState;
//   }
// };

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
import { useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = savedUser || {
  username: "",
  photo_profile: "",
};

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "Login":
    case "Edit":
      return {
        ...prevState,
        username: action.payload.username,
        photo_profile: action.payload.photo_profile,
      };
    case "Logout":
      return {
        username: "",
        photo_profile: "",
      };
    default:
      return prevState;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    if (state.username) {
      localStorage.setItem("user", JSON.stringify(state));
    } else {
      localStorage.removeItem("user");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
