import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import Swal from "sweetalert2";
const initialState = {
  token: "",
  usuario: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: JSON.parse(localStorage.getItem("userInfo")) ?? initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
    logOut: (state) => {
      const newState = { ...state, ...initialState };
      localStorage.removeItem("userInfo");
      return newState;
    },
  },
});

export const { setUserInfo, logOut } = userInfoSlice.actions;

export const loginUser = (data) => (dispatch) => {
  axiosEcommerce
    .post("/usuarios/login", data)
    .then((response) => {
      dispatch(setUserInfo(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const registerUser = (data) => (dispatch) => {
  axiosEcommerce
    .post("/usuarios/signup", data)
    .then((response) => {
      dispatch(setUserInfo(response.data));
    })
    .catch((error) => {
      let errores = error.response.data.errors;
      if (errores) {
        let mensajes = "";
        for (const key in errores) {
          mensajes += errores[key].msg + "\n";
        }

        Swal.fire({
          icon: "warning",
          title: "¡Error!",
          text: mensajes,
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          localStorage.setItem("validacion", "false");
        });
      } else {
        let errrors = error.response.data.error.errors;
        let mensajes = "";
        errrors.forEach((element) => {
          mensajes += element.message + "\n";
        });

        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: mensajes,
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          localStorage.setItem("validacion", "false");
        });
      }
    });
};

export default userInfoSlice.reducer;
