import Image from "next/image";
import Link from "next/link";

export default function InfoCard({ item }: { item: any }) {
    return (
            <Link href="/shop" className="main__home__popular card">  
                <Image
                  width={300}
                  height={250}
                  className="card-img main__home__popular-img"
                  src={item.image}
                  alt={item.name + " image"}
                />
                <div className="card-img-overlay main__home__popular-ImgOverlay">
                  <h5 className="card-title main__home__popular__title">
                    {item.name}
                  </h5>
                </div>
              </Link>
    )
}
