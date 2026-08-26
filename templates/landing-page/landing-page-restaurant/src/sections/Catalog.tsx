import CatalogGrid from "../components/CatalogGrid"
import { productsData } from "../data/productData"

function Catalog(){
    return (
        <section className="min-h-screen items-center section-container py-12 bg-base-base-100">
            <p className="uppercase text-primary mb-2">Daftar Makanan</p>
            <h3 className="text-2xl font-bold text-neutral md:text-4xl mb-12">Dari Dapur Kami</h3>
            <CatalogGrid 
                products={productsData}
            />
        </section>
    )
}

export default Catalog