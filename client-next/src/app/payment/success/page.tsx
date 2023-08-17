import React from 'react'
import css from "./page.module.css";

export default function Page() {
    return (
        <section className="text-center container text-lg-start d-flex flex-column align-items-center justify-content-center">
            <h1 className={css.h1_text}>Payment success</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className={css.svg_success} viewBox="0 0 24 24"><title>check-bold</title><path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
        </section>
    )
}
