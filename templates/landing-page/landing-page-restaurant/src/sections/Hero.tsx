import { motion, type Variants } from "motion/react";
import banner1024 from "../assets/banner-1024.jpg";
import banner2048 from "../assets/banner-2048.jpg";

function Hero(){

    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const item: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    };

    return (
<section className="relative min-h-screen pt-12 pb-12 bg-dark xl:pt-24 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">

    <div className="absolute inset-0 overflow-hidden">
        <motion.img
            className="object-cover w-full h-full"
            src={banner2048}
            // srcSet: browser memilih file sesuai lebar layar & kerapatan piksel,
            // jadi HP tidak ikut mengunduh gambar 2048px.
            srcSet={`${banner1024} 1024w, ${banner2048} 2048w`}
            sizes="100vw"
            // Hero adalah elemen LCP: JANGAN lazy-load, dan beri prioritas tinggi.
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={2048}
            height={1273}
            alt="" 
            initial={{
                scale: 1.1,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            transition={{
                duration: 1.5,
                ease: "easeOut",
            }}
        />
    </div>

    <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/60 to-transparent" />

    <motion.div variants={container} initial="hidden" animate="visible" className="relative">
        <div className="mx-auto section-container">
            <div className="w-full lg:w-2/3 xl:w-1/2">
                <motion.h1 variants={item} className="font-sans text-base font-normal tracking-tight text-white text-opacity-70">CHEF'S TABLE AUTHENTIC</motion.h1>
                <p className="mt-6 tracking-tighter text-white">
                    <motion.span variants={item} className="font-sans font-normal text-7xl">Bahan Segar</motion.span><br />
                    <motion.span variants={item} className="font-serif italic font-normal text-8xl">Rasa Tak Terlupakan</motion.span>
                </p>
                <motion.p variants={item} className="mt-12 font-sans text-base font-normal leading-7 text-white text-opacity-70">Rasakan seni kuliner kelas atas dengan kesegaran langsung dari ladang di setiap gigitan.</motion.p>
                <motion.p variants={item} className="mt-8 font-sans text-xl font-normal text-white">Promo Mulai Dari Rp.20k-an*</motion.p>
            </div>
        </div>
    </motion.div>
</section>
    )
}

export default Hero