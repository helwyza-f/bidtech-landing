import { reviews } from "../data/reviews";
import { Star } from "lucide-react";
import { motion, type Variants } from "motion/react";

export default function Rating(){
    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const item: Variants = {
        hidden: {
            opacity: 0,
            y: 24,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

    return (
        <>
            <section className="bg-base-100 py-20 section-container">
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div
                        variants={item}
                        className="mb-10"
                    >
                        <h2 className="text-3xl font-bold text-neutral max-md:text-4xl text-center">
                            Apa Kata Tamu Kami
                        </h2>
                    </motion.div>

                </motion.div>
            </section>
        </>
    )
}