import { Link, redirect } from "react-router-dom";

const BASE_URL =
  "https://3001-santiagoss0-reactflaskl-n5ion485vbv.ws-eu84.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: false,
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-santiagoss0-reactflaskl-n5ion485vbv.ws-eu84.gitpod.io/api/login",
            options
          );
          if (resp.status === 200) {
            const data = await resp.json();
            localStorage.setItem("token", data.access_token);
            setStore({ token: data.access_token, logged: true });

            return true;
          } else {
            alert("An error ocurred");
            return false;
          }
        } catch (error) {
          console.log("There has been an error");
        }
      },

      syncToken: () => {
        const token = localStorage.getItem("token");
        token && token != "" && token != undefined && setStore({ token });
      },

      userSignup: async (email, password) => {
        const opts = {
          method: "POST",

          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            is_active: true,
          }),
        };
        try {
          const resp = await fetch(
            "https://3001-santiagoss0-reactflaskl-n5ion485vbv.ws-eu84.gitpod.io/api/signup",
            opts
          );
          if (resp.status !== 200) {
            alert("An error ocurred");
            return false;
          }
          const data = await resp.json();
          return true;
        } catch (error) {
          console.log("There has been an error", error);
        }
      },

      userValidation: async () => {
        const store = getStore();
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const res = await fetch(
            "https://3001-santiagoss0-reactflaskl-n5ion485vbv.ws-eu84.gitpod.io/api/private",
            requestOptions
          );
          const data = await res.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      UserLogout: () => {
        localStorage.removeItem("token");
        setStore({ token: null, logged: false });
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
