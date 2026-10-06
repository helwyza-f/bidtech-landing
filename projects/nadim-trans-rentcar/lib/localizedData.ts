import { ALL_CARS, CATEGORIES, type Car, type CarSpec } from "@/lib/data";
import { ALL_FAQS, type FaqItem } from "@/lib/faqData";
import { formatCurrency, type Locale } from "@/lib/i18n";

type EnglishCarCopy = Pick<Car, "type" | "priceNote" | "description" | "features" | "included" | "terms"> & {
  specs: Partial<CarSpec>;
};

const ALL_IN_INCLUDED = [
  "Professional and experienced driver included",
  "Fuel is included",
  "Clean, fresh, and ready-to-go vehicle",
  "Hang Nadim Airport and Batam ferry-terminal pick-up service",
];

const ENGLISH_CARS: Record<number, EnglishCarCopy> = {
  1: {
    type: "Luxury Executive MPV",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "Automatic CVT", fuel: "Premium Petrol", acceleration: "8.9 seconds (0–100 km/h)" },
    description: "Toyota Alphard Gen 3 sets a high standard for executive travel in Batam. It is ideal for VVIP airport pick-ups, official visits, business guests from Singapore or Malaysia, weddings, and formal events.",
    features: ["Executive ottoman captain seats with heating and ventilation", "Dual electric panoramic sunroofs", "Rear-seat entertainment monitor and premium audio", "Automatic electric sliding doors on both sides", "Quiet cabin with high-privacy glass", "360-degree camera and Toyota Safety Sense"],
    included: ALL_IN_INCLUDED,
    terms: ["Please confirm the schedule at least one day in advance", "The All-In package covers the vehicle, driver, and fuel for up to 10 hours", "The rate applies to travel within Batam", "Overtime is available by prior arrangement"],
  },
  2: {
    type: "High-Capacity Passenger Minibus",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "5-speed manual", fuel: "Diesel", acceleration: "14.5 seconds (0–100 km/h)" },
    description: "Toyota Hiace Commuter is a high-capacity van for up to 15 passengers. It is a practical choice for sightseeing groups, company events, airport or ferry transfers, and study trips in Batam.",
    features: ["Spacious seating for up to 15 passengers", "Ceiling-ducted air conditioning to the rear rows", "Reclining ergonomic seats with individual seat belts", "Wide sliding door for easy boarding", "Comfortable suspension for longer trips", "Complete audio and multimedia system"],
    included: ALL_IN_INCLUDED,
    terms: ["Please confirm bookings one to two days in advance", "The All-In package covers the vehicle, driver, and fuel for up to 10 hours within Batam", "Maximum use is 10 hours per booking", "Overtime is subject to prior agreement"],
  },
  3: {
    type: "Premium Executive Minibus",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "6-speed manual", fuel: "Diesel", acceleration: "12.8 seconds (0–100 km/h)" },
    description: "Toyota Hiace Premio combines a modern semi-bonnet design with a spacious, quiet, and refined cabin. It is a dependable option for corporate delegates, official guests, and VIP family trips in Batam.",
    features: ["Modern aerodynamic semi-bonnet design", "Spacious cabin with captain-seat-style seating", "Quiet cabin insulation and comfortable suspension", "Touchscreen head unit and USB ports in every row", "Vehicle Stability Control and Hill Start Assist", "Emergency Brake Signal and dual SRS airbags"],
    included: ALL_IN_INCLUDED,
    terms: ["Booking is recommended at least two days before the event", "The All-In package includes vehicle, driver, and fuel for up to 10 hours in Batam", "Maximum capacity is 12 passengers for the best comfort", "Overtime is charged proportionally by hour"],
  },
  4: {
    type: "Premium Passenger Minibus",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "6-speed manual", fuel: "Diesel", acceleration: "12.8 seconds (0–100 km/h)" },
    description: "Toyota Hiace Premio Basic offers a roomy, modern cabin for group travel in Batam. It is well suited to family tours, company visits, airport transfers, and group journeys with a complete driver-and-fuel package.",
    features: ["Comfortable capacity for up to 12 passengers", "Ceiling-ducted air conditioning to the rear rows", "Spacious semi-bonnet cabin with reclining seats", "Wide sliding door for easy passenger access", "Audio system and USB ports for group trips", "Vehicle Stability Control and Hill Start Assist"],
    included: ALL_IN_INCLUDED,
    terms: ["Bookings are recommended at least one day in advance", "The All-In package includes vehicle, driver, and fuel for up to 10 hours in Batam", "Maximum use is 10 hours per booking", "Overtime is subject to prior agreement"],
  },
  5: {
    type: "Premium Tough SUV",
    priceNote: "/ day",
    specs: { transmission: "6-speed automatic sport", fuel: "Turbo diesel", acceleration: "9.2 seconds (0–100 km/h)" },
    description: "Toyota Fortuner GR Sport delivers capable performance with a bold Gazoo Racing-inspired presence. It suits industrial-site visits, business trips, and refined family travel around Batam.",
    features: ["Exclusive GR Sport body kit and badges", "More stable and comfortable GR Sport suspension", "Power back door with kick sensor", "9-inch head unit with smartphone mirroring", "360-degree surround monitor and blind-spot detection", "Dual-zone digital climate control"],
    included: ["Self-drive or professional-driver options", "All-risk vehicle insurance", "Regularly serviced vehicle in excellent condition", "24-hour roadside assistance"],
    terms: ["Original ID card and valid driving licence are required for self-drive", "A refundable security deposit is required before handover", "Minimum rental period is 24 hours", "A 12-hour car-and-driver package is available for Rp 2,000,000"],
  },
  6: {
    type: "Modern TNGA Crossover MPV",
    priceNote: "/ day",
    specs: { transmission: "Direct-Shift 10-speed CVT", fuel: "Petrol", acceleration: "9.6 seconds (0–100 km/h)" },
    description: "Toyota Innova Zenix uses a front-wheel-drive TNGA platform for a quiet ride, generous space, and sedan-like comfort. It is a customer favourite for business and family travel in Batam.",
    features: ["TNGA platform for excellent ride comfort", "Spacious seven-seat cabin with generous legroom", "10-inch infotainment with Apple CarPlay and Android Auto", "Electric parking brake with auto brake hold", "Fast-cooling dual-blower digital air conditioning", "Vehicle Stability Control and Hill Start Assist"],
    included: ["New, clean, and well-maintained vehicle", "Reliable vehicle insurance", "Self-drive or driver options", "24-hour customer support"],
    terms: ["Valid original ID card or passport", "Valid driving licence for self-drive rentals", "Refundable security deposit", "A 12-hour car-and-driver package is available for Rp 1,200,000"],
  },
  7: {
    type: "Reliable Mid-Size MPV",
    priceNote: "/ day",
    specs: { transmission: "6-speed automatic / manual", fuel: "Diesel / petrol", acceleration: "10.8 seconds (0–100 km/h)" },
    description: "Toyota Innova Reborn is a long-standing favourite for comfortable family travel in Indonesia. Its sturdy platform and supple suspension make it a reliable choice for every part of Batam.",
    features: ["Robust chassis and comfortable suspension", "Spacious seven-seat cabin with comfortable armrests", "Triple-blower air conditioning for every row", "Touchscreen multimedia system and clear audio", "Eco and Power driving modes", "Dual SRS airbags and ABS with EBD"],
    included: ["Always clean and fresh vehicle", "Vehicle insurance", "Self-drive or driver options", "Complimentary delivery to Batam airport or ferry areas"],
    terms: ["Original ID card and valid driving licence for self-drive", "Security deposit before vehicle collection", "Daily rental duration is 24 hours", "A 12-hour car-and-driver package is available for Rp 1,000,000"],
  },
  8: {
    type: "Futuristic Family MPV",
    priceNote: "/ day",
    specs: { transmission: "Automatic IVT", fuel: "Petrol", acceleration: "10.4 seconds (0–100 km/h)" },
    description: "Hyundai Stargazer combines a futuristic one-curve silhouette with an ergonomic, flexible cabin. Smart storage, even air conditioning, and quiet insulation make every journey more comfortable.",
    features: ["Futuristic horizontal DRL and distinctive H-rear lamp", "8-inch touchscreen with smartphone integration", "Wireless charger and USB ports", "Tyre Pressure Monitoring System", "Rear-view camera with dynamic guidelines", "Ample cup holders and clever storage"],
    included: ["Basic comprehensive insurance", "New, clean, smoke-free vehicle", "Complimentary Batam route advice", "24-hour customer care"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "For use within Batam city"],
  },
  9: {
    type: "Modern Compact MPV",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT / manual", fuel: "Petrol", acceleration: "11.2 seconds (0–100 km/h)" },
    description: "Toyota New Avanza offers a new front-wheel-drive platform, a quieter cabin, and flexible sofa-mode seating. It is an efficient and dependable family vehicle for daily travel in Batam.",
    features: ["Flexible long sofa-mode seating", "Modern 9-inch head unit with smartphone mirroring", "Tilt steering and push-button start", "Dual airbags and ABS, EBD, and BA", "Fast-cooling dual-blower air conditioning"],
    included: ["Clean, fresh, and ready-to-use vehicle", "Basic insurance cover", "24-hour customer support", "Optional delivery and collection"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "Return fuel at the same level as handover"],
  },
  10: {
    type: "Dynamic Family MPV",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT / manual", fuel: "Petrol", acceleration: "11.3 seconds (0–100 km/h)" },
    description: "Daihatsu New Xenia offers a sporty character, a roomy cabin, and excellent fuel efficiency. Its tight turning radius is ideal for relaxed outings and business travel in Batam.",
    features: ["Sporty exterior with shark-fin antenna", "Spacious seven-seat cabin with sofa mode", "Touchscreen head unit with Android Auto and CarPlay", "205 mm ground clearance", "Light and responsive electric power steering"],
    included: ["Clean vehicle with regular maintenance", "Basic travel insurance", "24-hour customer-care consultation"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "Return fuel at the same level as handover"],
  },
  11: {
    type: "Compact Turbo SUV",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT", fuel: "Petrol", acceleration: "10.0 seconds (0–100 km/h)" },
    description: "Toyota Raize blends a sporty SUV appearance with responsive turbo performance. It is agile in Batam traffic, easy to park, and ideal for travellers who value confident style.",
    features: ["Responsive and fuel-efficient turbocharged engine", "7-inch TFT digital instrument cluster", "9-inch floating touchscreen", "Paddle shift and Sport driving mode", "LED headlamps with sequential indicators"],
    included: ["Fresh and exceptionally clean vehicle", "Delivery to Batam hotels or airport", "Reliable vehicle insurance", "24-hour roadside assistance"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "For use on Batam Island only"],
  },
  12: {
    type: "Compact Urban SUV",
    priceNote: "/ day",
    specs: { transmission: "Automatic D-CVT", fuel: "Petrol", acceleration: "10.2 seconds (0–100 km/h)" },
    description: "Daihatsu Rocky delivers a capable urban-SUV style with a smooth D-CVT and high ground clearance. It suits travellers who want to explore Barelang and Batam's city corners with confidence.",
    features: ["Smooth D-CVT transmission", "Full digital meter cluster with four displays", "9-inch touchscreen with smartphone connection", "Quality active-subwoofer audio system", "Hill Start Assist and Vehicle Stability Control"],
    included: ["Clean vehicle with scheduled servicing", "Vehicle insurance", "Fast, punctual delivery and collection service"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "Return the vehicle in a tidy condition"],
  },
  13: {
    type: "Sporty Compact City Car",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT / manual", fuel: "Petrol", acceleration: "11.5 seconds (0–100 km/h)" },
    description: "Honda New Brio is a leading city car with sporty design, precise handling, a comfortable cabin, and excellent fuel economy. It is practical for solo travellers, couples, and quick business trips in Batam.",
    features: ["Class-leading 1.2L i-VTEC engine", "Rear parking camera and sensors", "Touchscreen audio with Bluetooth and USB", "Light and precise electric power steering", "Sporty grille and two-tone alloy wheels"],
    included: ["Thoroughly cleaned and fresh vehicle", "Reliable travel insurance", "Handover at Batam ferry terminal or airport", "Responsive 24-hour customer support"],
    terms: ["Valid original ID card and driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "For use on Batam Island only"],
  },
  14: {
    type: "Agile Modern City Car",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT", fuel: "Petrol", acceleration: "11.8 seconds (0–100 km/h)" },
    description: "Toyota New Agya has a newer platform for a more stable drive and a spacious interior. Efficient and agile on narrow streets, it is a great choice for exploring Batam's culinary destinations.",
    features: ["New platform for steadier handling", "Efficient and capable 1.2L WA-VE engine", "Modern 7-inch touchscreen head unit", "Paddle shift and dynamic driving mode", "Vehicle Stability Control and Hill Start Assist"],
    included: ["Clean and fresh vehicle", "Basic insurance cover", "Friendly, flexible vehicle delivery"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "Vehicle use is limited to Batam"],
  },
  15: {
    type: "Economy 7-Seater Family MPV",
    priceNote: "/ day",
    specs: { transmission: "Automatic / manual", fuel: "Petrol", acceleration: "12.0 seconds (0–100 km/h)" },
    description: "Toyota New Calya is an affordable seven-seat transport option in Batam. Its efficient fuel use and air-conditioned cabin offer practical comfort for families and work teams.",
    features: ["Flexible and economical seven-seat capacity", "Touchscreen head unit with Bluetooth and USB", "Rear air circulator for cooler back rows", "Electric power steering and ABS with EBD", "Larger boot space when the third row is folded"],
    included: ["Clean, well-maintained, ready-to-use vehicle", "Basic vehicle insurance", "Friendly service and 24-hour customer care"],
    terms: ["Valid ID card and driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "For travel within Batam"],
  },
  16: {
    type: "Flagship Luxury Hybrid MPV",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "Automatic e-CVT", fuel: "Hybrid petrol", acceleration: "8.9 seconds (0–100 km/h)" },
    description: "Toyota Alphard Gen 4 delivers a new standard of VIP travel in Batam, with elegant design, a quiet cabin, and first-class comfort. It is an exceptional choice for VVIP guests, business travel, weddings, and exclusive airport or ferry transfers.",
    features: ["Executive captain seats with ottoman and electric adjustment", "Dual power sliding doors and power back door", "Spacious cabin with zoned digital air conditioning", "Panoramic roof and premium cabin lighting", "Toyota Safety Sense and 360-degree camera", "Premium audio and charging ports"],
    included: ALL_IN_INCLUDED,
    terms: ["Please confirm the schedule at least one day in advance", "The All-In package covers the vehicle, driver, and fuel for up to 10 hours", "The rate applies to travel within Batam", "Overtime is available by prior arrangement"],
  },
  17: {
    type: "Premium Passenger Minibus",
    priceNote: "/ 10 hrs (All-In)",
    specs: { transmission: "6-speed manual", fuel: "Diesel", acceleration: "12.8 seconds (0–100 km/h)" },
    description: "Toyota Hiace Premio Basic provides a spacious, comfortable, and modern cabin for group travel in Batam. It is ideal for family tours, company visits, airport transfers, and group journeys with driver and fuel included.",
    features: ["Comfortable capacity for up to 12 passengers", "Ceiling-ducted air conditioning to the rear rows", "Spacious semi-bonnet cabin with reclining seats", "Wide sliding door for easy passenger access", "Audio system and USB ports for group travel", "Vehicle Stability Control and Hill Start Assist"],
    included: ALL_IN_INCLUDED,
    terms: ["Bookings are recommended at least one day in advance", "The All-In package includes vehicle, driver, and fuel for up to 10 hours in Batam", "Maximum use is 10 hours per booking", "Overtime is subject to prior agreement"],
  },
  18: {
    type: "Compact Economy City Car",
    priceNote: "/ day",
    specs: { transmission: "Automatic D-CVT / manual", fuel: "Petrol", acceleration: "12.2 seconds (0–100 km/h)" },
    description: "Daihatsu New Ayla is one of Batam's most economical rental choices. It is fuel-efficient, nimble, easy to park, and practical for daily personal travel or short business trips.",
    features: ["Excellent value and fuel efficiency", "Smooth D-CVT transmission", "Modern touchscreen with smartphone support", "Practical luggage room for daily essentials", "Dual SRS airbags and seat-belt reminder"],
    included: ["Clean, well-maintained vehicle", "Basic insurance", "Friendly and responsive customer service"],
    terms: ["Original ID card and valid driving licence", "Refundable security deposit", "Minimum rental period is 24 hours", "For use on Batam Island only"],
  },
  19: {
    type: "Modern Dynamic 7-Seater MPV",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT / manual", fuel: "Petrol", acceleration: "11.5 seconds (0–100 km/h)" },
    description: "Mitsubishi Xpander offers a bold Dynamic Shield design, generous ground clearance (220 mm), and a remarkably quiet cabin. It is a top choice for family trips, island sightseeing in Batam, and corporate transfers.",
    features: ["Roomy 7-seat cabin with flexible sofa-mode seating", "Smooth suspension and high ground clearance (220 mm)", "8-inch touchscreen with Apple CarPlay & Android Auto", "Digital air conditioning reaching third row", "Safety features including ASC, HSA, ABS, and Dual Airbags", "Convenient USB charging ports for all rows"],
    included: ["Clean, sanitized, ready-to-use vehicle", "Comprehensive vehicle insurance", "Self-drive 24h or driver options", "Complimentary delivery in Batam Center"],
    terms: ["Valid ID and driving licence for self-drive", "Refundable security deposit", "Minimum rental duration is 24 hours", "12-hour driver package available for Rp 950,000"],
  },
  20: {
    type: "Stylish Premium Compact SUV",
    priceNote: "/ day",
    specs: { transmission: "Automatic CVT", fuel: "Petrol", acceleration: "9.8 seconds (0–100 km/h)" },
    description: "All New Honda HR-V combines a sleek coupe-style SUV exterior with refined interior comfort and advanced features. Ideal for executives, couples on holiday, and business travellers in Batam.",
    features: ["Coupe-inspired sporty SUV exterior", "Advanced Honda SENSING safety suite", "8-inch audio touchscreen with smartphone mirroring", "Ultra Seats with 4-way interior versatility", "7-inch digital TFT instrument cluster & smart key", "Walk-away auto door lock and multi-angle rear camera"],
    included: ["Premium clean condition vehicle", "Full comprehensive insurance", "Self-drive 24h or professional driver option", "Delivery available across Batam"],
    terms: ["Valid original ID card / passport and driving licence", "Refundable security deposit", "Minimum rental duration is 24 hours", "12-hour driver package available for Rp 1,200,000"],
  },
  21: {
    type: "VIP Executive Captain Seat Van",
    priceNote: "/ 12 hrs (All-In)",
    specs: { transmission: "6-speed manual / automatic", fuel: "Diesel", acceleration: "12.0 seconds (0–100 km/h)" },
    description: "Toyota Hiace Premio Luxury delivers premier VIP road comfort in Batam. Equipped with plush reclining captain seats with legrests, ambient lighting, quiet acoustic insulation, and full multimedia entertainment for corporate delegates, dignitaries, and private family travel.",
    features: ["VIP executive captain seats with legrest & electric recline", "Refined interior with wooden accents & ambient lighting", "Ceiling-mounted TV / multimedia entertainment & audio", "Dedicated individual AC blowers for every seat", "Professional driver and fuel included for 12 hours", "Comfortable VIP capacity for up to 10 guests"],
    included: ALL_IN_INCLUDED,
    terms: ["Advance booking recommended at least 2 days prior", "All-In package includes vehicle, driver, and fuel for Batam routes", "Standard duration is 12 hours per day", "Hourly overtime available upon prior arrangement"],
  },
  22: {
    type: "High-Capacity Group Minibus (19-Seater)",
    priceNote: "/ 12 hrs (All-In)",
    specs: { transmission: "6-speed manual", fuel: "Diesel", acceleration: "15.0 seconds (0–100 km/h)" },
    description: "Isuzu Elf Long is the most practical and cost-effective passenger minibus for group travel in Batam. Seating up to 19 passengers with comfortable reclining seats, ample luggage space, and reliable performance for airport transfers, corporate outings, and island tours.",
    features: ["Generous capacity for up to 19 passengers", "Ceiling-ducted AC vents across all rows", "Ergonomic reclining seats with individual seat belts", "Driver and fuel included for 12 hours", "Spacious rear luggage space for baggage and cargo", "Public address microphone and audio system for guides"],
    included: ALL_IN_INCLUDED,
    terms: ["Advance booking required at least 1 day prior", "Rental covers 12 hours of operational use in Batam", "Maximum capacity is 19 passengers", "Parking fees and tourist attraction entrance tickets are excluded"],
  },
  23: {
    type: "Executive Tour & Charter Bus (34-Seater)",
    priceNote: "/ 12 hrs (All-In)",
    specs: { transmission: "Manual", fuel: "Diesel", acceleration: "N/A" },
    description: "Medium Tourism Bus (34 seats) provides executive mass transportation for tour groups, corporate gatherings, MICE delegations, and study trips in Batam. Fitted with full AC, karaoke audio system, comfortable 2-2 reclining seats, and smooth suspension.",
    features: ["Comfortable 34 passenger capacity (2-2 configuration)", "Full cabin air conditioning with even air distribution", "Karaoke entertainment system, LCD TV, and clear sound", "Reclining seats with armrests and USB charging ports", "Spacious undercarriage luggage bays for tour bags", "Experienced Batam tour driver and fuel included for 12 hours"],
    included: ALL_IN_INCLUDED,
    terms: ["Booking recommended at least 3 days in advance", "Package covers 12 hours of use in Batam City", "Full-day Barelang and Marina tour itineraries available", "Overtime available upon prior agreement"],
  },
  24: {
    type: "Grand Tourism Coach (50-Seater)",
    priceNote: "/ 12 hrs (All-In)",
    specs: { transmission: "6-speed manual", fuel: "Diesel", acceleration: "N/A" },
    description: "Big Tourism Coach (50 seats) is PT. Nadim Auto Transindo's largest vehicle for grand group journeys in Batam. Ideally suited for multinational company gatherings, school study tours, international conferences, and cross-border visitor groups from Singapore and Malaysia.",
    features: ["Extra-large capacity for up to 50 passengers (2-2 layout)", "Ergonomic reclining seats with generous legroom", "Complete entertainment: full AC, dual LED TVs, karaoke & mics", "Huge under-floor luggage compartments for dozens of suitcases", "Air suspension for a remarkably smooth and silent ride", "Experienced tourism coach captain and fuel included for 12 hours"],
    included: ALL_IN_INCLUDED,
    terms: ["Booking recommended 3–7 days before the event", "Standard usage covers 12 hours within Batam Island", "Maximum capacity of 50 passengers for safety and comfort", "Custom tour itinerary coordination available upon request"],
  },
};

const ENGLISH_CAR_COPY_KEY: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 11,
  11: 12,
  12: 13,
  13: 14,
  14: 15,
  15: 18,
  16: 16,
  17: 17,
  18: 19,
  19: 20,
  20: 21,
  21: 22,
  22: 23,
  23: 24,
};

const ENGLISH_FAQS: Record<number, Pick<FaqItem, "question" | "answer">> = {
  1: { question: "How do I rent a vehicle from NadimTrans RentCar?", answer: "Choose a vehicle, select your travel date and requirements, then submit a booking request. The NadimTrans team will confirm availability, schedule, pick-up point, and travel details." },
  2: { question: "What documents are required to rent a vehicle?", answer: "For self-drive rentals, please prepare a valid original ID card or passport and a valid driving licence. Additional identity verification may be requested based on the rental package." },
  3: { question: "What is the cancellation policy?", answer: "Please contact the NadimTrans team as early as possible if you need to change or cancel a booking. Any applicable cancellation terms will be confirmed with your reservation." },
  4: { question: "Which payment methods are accepted?", answer: "We accept official bank transfers and e-Wallet under the account name Dwi Gandhi Herdian: BNI (0352721997), BCA (0611847466), Mandiri (1090022349898), SeaBank (901960264464), and DANA (081276003870). Final settlement can also be made upon vehicle handover." },
  5: { question: "Can the vehicle pick me up at the airport or hotel?", answer: "Yes. Pick-up and drop-off can be arranged for Hang Nadim Airport, ferry terminals, hotels, and other locations in Batam. Share your pick-up point and destination when booking so the team can confirm the arrangement." },
  6: { question: "What is the minimum age for self-drive rental?", answer: "Self-drive renters must be at least 21 years old and hold a valid driving licence. Additional requirements may apply to selected vehicle categories." },
  7: { question: "Can foreign visitors rent a vehicle?", answer: "Yes. Foreign visitors should provide a valid passport and the driving documents required for a self-drive booking. Contact our team before booking to confirm the relevant requirements." },
  8: { question: "Is a security deposit required?", answer: "A refundable security deposit may be required for self-drive rentals and will be returned after the vehicle has been inspected at the end of the rental period." },
  9: { question: "When must the rental payment be settled?", answer: "The deposit and final payment schedule will be confirmed by the NadimTrans team when your reservation is arranged." },
  10: { question: "Are there any hidden fees beyond the listed rental price?", answer: "There are no hidden fees. For vehicles marked All In, the rate includes the vehicle, driver, and fuel for up to 10 hours within Batam. Additional charges may apply only to overtime or requirements outside the original agreement." },
  11: { question: "How long does a deposit refund take?", answer: "The refund timing for a self-drive security deposit will be confirmed by the NadimTrans team after the vehicle inspection is completed." },
  12: { question: "What insurance cover is included in the rental?", answer: "Please confirm the insurance cover that applies to your selected vehicle and rental package with the NadimTrans team before booking." },
  13: { question: "What is Super CDW (Zero Excess / Deductible)?", answer: "Super CDW is an additional protection option that may reduce the renter's out-of-pocket responsibility for eligible damage. Please confirm availability and terms with our team." },
  14: { question: "What should I do if there is a technical issue or incident?", answer: "Contact NadimTrans customer support immediately so the team can coordinate the appropriate assistance." },
  15: { question: "What is included in the All In package?", answer: "The All In package includes the vehicle, driver, and fuel for travel within Batam. It is available for Alphard Gen 3, Alphard Gen 4, Hiace Commuter, Hiace Premio Basic, and Hiace Premio VIP." },
  16: { question: "How long does the All In package last?", answer: "The All In package is valid for up to 10 hours per booking. If you need more time, please confirm overtime requirements with the NadimTrans team when booking." },
};

function formatPrice(value: number, locale: Locale): string {
  return formatCurrency(value, locale);
}

function getSimplePriceNote(note: string | undefined, locale: Locale): string {
  const isEnglish = locale === "en" || locale === "en-sg";
  if (!note) return isEnglish ? "/ day" : "/ hari";

  const lower = note.toLowerCase();
  const isAllIn = lower.includes("all in") || lower.includes("all-in") || lower.includes("jam") || lower.includes("hour");
  const is12Hours = note.includes("12");

  if (isAllIn) {
    if (is12Hours) {
      return isEnglish ? "/ 12 hrs (All-In)" : "/ 12 jam (All In)";
    }
    return isEnglish ? "/ 10 hrs (All-In)" : "/ 10 jam (All In)";
  }

  return isEnglish ? "/ day" : "/ hari";
}

function localizeCar(car: Car, locale: Locale): Car {
  const simpleNote = getSimplePriceNote(car.priceNote, locale);

  if (locale === "id") {
    return {
      ...car,
      priceFormatted: formatCurrency(car.price, "id"),
      priceNote: simpleNote,
    };
  }

  if (locale === "ms") {
    return {
      ...car,
      priceFormatted: formatCurrency(car.price, "ms"),
      priceNote: simpleNote,
    };
  }

  // Locale "en" & "en-sg"
  const copyKey = ENGLISH_CAR_COPY_KEY[car.id];
  const copy = copyKey ? ENGLISH_CARS[copyKey] : undefined;
  if (!copy) {
    return {
      ...car,
      priceFormatted: formatPrice(car.price, locale),
      priceNote: simpleNote,
    };
  }
  return {
    ...car,
    ...copy,
    priceFormatted: formatPrice(car.price, locale),
    priceNote: simpleNote,
    specs: { ...car.specs, ...(copy.specs || {}) },
  };
}

export function getCars(locale: Locale): Car[] {
  return ALL_CARS.map((car) => localizeCar(car, locale));
}

export function getCar(locale: Locale, slug: string): Car | undefined {
  const car = ALL_CARS.find((item) => item.slug === slug);
  return car ? localizeCar(car, locale) : undefined;
}

export function getRelatedCarsForLocale(locale: Locale, currentSlug: string, category: string, limit = 3): Car[] {
  const cars = getCars(locale);
  const sameCategory = cars.filter((car) => car.slug !== currentSlug && car.category === category);
  const otherCars = cars.filter((car) => car.slug !== currentSlug && car.category !== category);
  return [...sameCategory, ...otherCars].slice(0, limit);
}

export function getLocalizedCategories(locale: Locale): string[] {
  if (locale === "id" || locale === "ms") return [...CATEGORIES];
  return CATEGORIES.map((category) => (category === "Semua" ? "All" : category));
}

export function getFaqs(locale: Locale): FaqItem[] {
  if (locale === "id") return ALL_FAQS;
  return ALL_FAQS.map((faq) => ({ ...faq, ...ENGLISH_FAQS[faq.id] }));
}
