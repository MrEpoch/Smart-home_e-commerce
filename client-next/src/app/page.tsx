import Home_top from '@/components/Home/HomeHeader';
import "@/styles/Home.css";
import Main__home from "@/components/Home/MainHome__page";

export default async function Home() {
  return (
    <div className="text-center container text-lg-start home__page">
        <Home_top />
        <Main__home />
    </div>
  )
}


