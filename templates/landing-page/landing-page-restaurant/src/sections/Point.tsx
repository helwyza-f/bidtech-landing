import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sprout, CookingPot, Truck } from 'lucide-react';

function Point() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity1 = useTransform(
        scrollYProgress,
        [0, 0.2],
        [0, 1]
    );

    const opacity2 = useTransform(
        scrollYProgress,
        [0.25, 0.45],
        [0, 1]
    );

    const opacity3 = useTransform(
        scrollYProgress,
        [0.5, 0.7],
        [0, 1]
    );

    const y1 = useTransform(
        scrollYProgress,
        [0, 0.2],
        [40, 0]
    );

    const y2 = useTransform(
        scrollYProgress,
        [0.25, 0.45],
        [40, 0]
    );

    const y3 = useTransform(
        scrollYProgress,
        [0.5, 0.7],
        [40, 0]
    );

    return (
        <section
            ref={sectionRef}
            className="min-h-[200vh] bg-base-200"
        >
            <div className="sticky top-0 flex min-h-screen items-center">
                <div className="mx-auto grid section-container grid-cols-3 gap-8">

                    <motion.div
                        style={{
                            opacity: opacity1,
                            y: y1,
                        }}
                        className="text-center items-center"
                    >
                        <Sprout className="size-16 p-5 rounded-full bg-base-100 shadow-sm mx-auto text-orange-700 mb-4"/>
                        <h2 className="font-semibold text-xl">Bahan Segar Dari Petani</h2><br/>
                        <p>Diambil setiap hari dari pertanian organik lokal untuk memastikan kualitas tertinggi dan rasa musiman yang optimal.</p>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: opacity2,
                            y: y2,
                        }}
                        className="text-center items-center"
                    >
                        <CookingPot className="size-16 p-5 rounded-full bg-base-100 shadow-sm mx-auto text-orange-700 mb-4"/>
                        <h2 className="font-semibold text-xl">Resep Racikan Koki</h2><br/>
                        <p>Koki berbintang Michelin kami menembus batas dengan teknik inovatif dan profil rasa yang seimbang.</p>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: opacity3,
                            y: y3,
                        }}
                        className="text-center items-center"
                    >
                        <Truck className="size-16 p-5 rounded-full bg-base-100 shadow-sm mx-auto text-orange-700 mb-4"/>
                        <h2 className="font-semibold text-xl">Pengiriman Ramah Lingkungan</h2><br/>
                        <p>Nikmati pengalaman restoran di rumah dengan kemasan 100% komposable dan pengiriman bebas emisi.</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default Point;