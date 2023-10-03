import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCQ8ad-X16CB9yIzjbb3n5sU5k9uZJ-jWI",
  authDomain: "kanban-board-cbbb3.firebaseapp.com",
  databaseURL: "https://kanban-board-cbbb3-default-rtdb.firebaseio.com",
  projectId: "kanban-board-cbbb3",
  storageBucket: "kanban-board-cbbb3.appspot.com",
  messagingSenderId: "534189246455",
  appId: "1:534189246455:web:e4b10b92fa899988ed50f2",
  measurementId: "G-44GQTC06B6"
};
export const app = initializeApp(firebaseConfig);