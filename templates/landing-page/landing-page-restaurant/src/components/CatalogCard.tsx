import { formatRupiah } from "../helpers/currency";
import defaultImage from "../assets/products/burger.jpg";

interface CatalogCardProps {
    name: string;
    description: string;
    image: string;
    price: number;
    isPopular?: boolean;
}

function CatalogCard({
    name = "Nama Produk",
    description = "Burger Spesial Daging Sapi Pilihan Juicy Luicy, Mahalini Pernah Makan Burger Ini Mantap Sekali... kalian harus cobain sekarang juga.",
    image = defaultImage,
    price = 999999,
    isPopular = false,
} : CatalogCardProps){
    return (
        <div className="relative flex h-full min-h-[500px] w-full flex-col">
            {isPopular && (
                <p className="py-1 px-2 rounded-full bg-primary text-primary-content absolute text-xs font-semibold top-4 right-4">Populer</p>
            )}
            <img src={image} alt={name} className="h-[270px] w-full rounded-t-4xl object-cover"/>
            <div className="p-4 text-neutral">
                <h3 className="font-bold">{name}</h3><br/>
                <p className="max-h-[50px] text-ellipsis overflow-hidden">{description}</p>
            </div>
            <button className="btn btn-primary btn-outline w-full border-1 p-4 rounded-full">{formatRupiah(price)}</button>
        </div>
    )
}

export default CatalogCard