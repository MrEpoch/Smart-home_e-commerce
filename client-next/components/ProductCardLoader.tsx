import css from "@/styles/Home.module.css";

export default function Loader() {
    return (
        <div className={css.skeleton_container}>
            {
                [...Array(3)].map((item, index) => (
                    <div key={index} className={css.skeleton}></div>
                ))
            }
        </div>
    )
}
