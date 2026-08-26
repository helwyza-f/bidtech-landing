import { useEffect, useMemo, useState } from "react";
import CatalogCard from "./CatalogCard";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    isPopular?: boolean;
}

interface CatalogGridProps {
    products: Product[];
}

export default function CatalogGrid({ products }: CatalogGridProps){
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1280) {
                setItemsPerPage(4);
            } else if (width >= 768) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(2);
            }
        };

        updateItemsPerPage();

        window.addEventListener("resize", updateItemsPerPage);

        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
        };
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(products.map((product) => product.category)),
        ];

        return ["Semua", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "Semua") {
            return products;
        }

        return products.filter(
            (product) => product.category === selectedCategory
        );
    }, [products, selectedCategory]);

    const totalPage = Math.max(
        1, Math.ceil(filteredProducts.length / itemsPerPage)
    );

    useEffect(() => {
        setCurrentPage((prevPage) =>
            Math.min(Math.max(prevPage, 1), totalPage)
        );
    }, [totalPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);

        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        const validPage = Math.min(
            Math.max(page, 1),
            totalPage
        );

        setCurrentPage(validPage);
    };    
    
    return (
        <div className="w-full overflow-x-hidden">
            <div className="flex justify-end gap-3 overflow-x-auto mb-8 ">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`
                            px-5 py-2 rounded-full
                            whitespace-nowrap
                            font-semibold
                            transition
                            ${
                                selectedCategory === category
                                    ? "bg-primary text-primary-content"
                                    : "bg-base-200 hover:bg-base-300"
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait" custom={currentPage}>
                <motion.div
                    key={`${selectedCategory}-${currentPage}`}
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    exit={{
                        x: -100,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7"
                >
                    {currentProducts.map((product) => (
                        <CatalogCard
                        key={product.id}
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        isPopular={product.isPopular}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="
                        p-2
                        rounded-full
                        hover:bg-base-200
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        transition
                    "
                >
                    <ChevronLeft size={20} />
                </button>

                {Array.from(
                    { length: totalPage },
                    (_, index) => {
                        const page = index + 1;

                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`
                                    w-10
                                    h-10
                                    rounded-full
                                    font-semibold
                                    transition
                                    ${
                                        currentPage === page
                                            ? "bg-primary text-primary-content"
                                            : "bg-base-200 hover:bg-base-300"
                                    }
                                `}
                            >
                                {page}
                            </button>
                        );
                    }
                )}

                <button
                    onClick={() =>
                        handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPage}
                    className="
                        p-2
                        rounded-full
                        hover:bg-base-200
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        transition
                    "
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}