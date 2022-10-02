import React, { useContext } from "react";
import { MainContext } from "../../../context/context";

const AdminContest = () => {
  const { question, setQuestion } = useContext(MainContext);
  return <div>AdminContest</div>;
};

export default AdminContest;
