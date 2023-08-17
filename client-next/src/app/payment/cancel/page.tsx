import React from 'react'
import css from "./page.module.css";

export default function Page() {
    return (
        <section className="text-center container text-lg-start d-flex flex-column align-items-center justify-content-center">
            <h1 className={css.h1_text}>Payment cancelled</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className={css.svg_cancel} viewBox="0 0 24 24"><title>close-circle</title><path fill='currentColor' d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
        </section>
    )
}
