import css from "@/styles/Shop.module.css";

export default function Loading() {
    return (
        <div className={css.loading}>
            <div className={css.skeleton_text}></div>
            <div className={css.skeleton_container}>
                <div className={css.skeleton_buttons}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={css.skeleton_button}></div>
                    ))}
                </div>
                {[...Array(10)].map((_, index) => (
                    <div key={index} className={css.skeleton}></div>
                ))}
             </div>
        </div>
    )            
}
