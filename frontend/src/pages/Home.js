import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLogAction } from "../store/userReducer";

export const Home = ({ name }) => {
  return <h1>{name ? `Hi ${name}` : "Not Auth"}</h1>;
};
