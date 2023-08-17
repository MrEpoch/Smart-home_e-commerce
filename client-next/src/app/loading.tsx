import { CircularProgress } from "@mui/material";
import React from "react";
import css from "@/styles/Home.module.css";

export default function Loading() {    
  return (
    <div className={css.loader__container}>
        <CircularProgress />
    </div>
  );
}
