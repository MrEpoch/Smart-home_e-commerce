import Home_top from './top__home__page';
import './home__page.css';
import Main__home from './main__home__page';

export default async function Home() {
  return (
    <div className="text-center container text-lg-start home__page">
        <Home_top />
        <Main__home />
    </div>
  )
}


