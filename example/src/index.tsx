import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import App from "./App";

firebase.initializeApp({
    apiKey: "AIzaSyD9I1zFksaRK5SgXmv82jEqXGv6R-jMd1k",
    authDomain: "gtools-1608479749339.firebaseapp.com",
    projectId: "gtools-1608479749339",
    storageBucket: "gtools-1608479749339.appspot.com",
    messagingSenderId: "622856920235",
    appId: "1:622856920235:web:3dac66274a96823502abee"
});

ReactDOM.render(
    <App />
    , document.getElementById("root")
);
