import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { productsData } from "../data/productData";
import { useState } from "react";

function Gallery() {
    const bentoClasses = [
        "md:col-span-2 md:row-span-2",
        "md:col-span-2",
        "md:col-span-1",
        "md:col-span-1",
        "md:col-span-2",
        "md:col-span-2",
    ];

    const previewItems = productsData.slice(0, 6);
    const hiddenCount = productsData.length - previewItems.length;

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = productsData[activeIndex];

    const openGallery = (index: number) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    const nextImage = () => {
        setActiveIndex((current) => (current + 1) % productsData.length);
    };

    const prevImage = () => {
        setActiveIndex((current) => current === 0 ? productsData.length - 1 : current - 1);
    };

    return (
        <>
            <section className="bg-base-200 py-20">
                <div className="mx-auto section-container">
                    <div className="mb-10 flex flex-col gap-4">
                        {/* Title Section */}
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase text-primary">Koleksi Menu</p>
                            <h2 className="text-2xl font-bold text-neutral md:text-4xl mb-12">Galeri</h2>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 auto-rows-[240px] gap-5 sm:grid-cols-2 md:grid-cols-4">
                            {previewItems.map((item, index) => {
                                const isMoreTile = index === previewItems.length - 1 && hiddenCount > 0;

                                return (  
                                    <button
                                        key={item.id}
                                        className={`group relative overflow-hidden rounded-lg bg-base-200 ${bentoClasses[index] ?? ""}`}
                                        onClick={() => openGallery(index)}
                                        type="button"
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${isMoreTile ? "blur-[2px] scale-105" : ""}`} 
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-neutral/80 via-neutral/20 to-transparent" />

                                        {isMoreTile ? (
                                            <div className="absolute inset-0 grid place-items-center bg-neutral/50 text-white">
                                                <span className="text-5xl font-bold">+{hiddenCount}</span>
                                            </div>
                                        ) : (
                                            <div className="absolute bottom-0 p-5 text-white">
                                                <p className="mb-1 text-xs font-semibold uppercase text-start">
                                                        {item.category}
                                                </p>
                                                <h3 className="text-xl font-bold">{item.name}</h3>
                                            </div>                                        
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {isOpen && activeItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral/90 px-4 py-8">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-circle btn-ghost absolute right-5 top-5 text-white"
                    >
                        <X />
                    </button>

                    <button
                        type="button"
                        onClick={prevImage}
                        className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="w-full section-container text-white">
                        <img 
                            src={activeItem.image} 
                            alt={activeItem.name}
                            className="max-h-[75vh] w-full rounded-lg object-contain" 
                        />

                        <div className="mt-4 flex items-center justify-betweeen gap-4">
                            <div>
                                <p className="text-sm opacity-70">
                                    {activeIndex + 1} / {productsData.length}
                                </p>
                                <h3 className="text-2xl font-bold">{activeItem.name}</h3>
                            </div>

                            <p className="rounded-full bg-white/10 px-4 py-2 text-sm">
                                {activeItem.category}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={nextImage}
                        className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </>
    );
}

export default Gallery;