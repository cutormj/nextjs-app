"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// List of all locations
const allLocations = [
  { id: "loc1", name: "Manila" },
  { id: "loc2", name: "Cebu" },
  { id: "loc3", name: "Davao" },
  { id: "loc4", name: "Baguio" },
];

// Cars with allowable locations
const cars = [
  {
    id: "car1",
    name: "Toyota Vios",
    plate: "ABC-1234",
    description: "Reliable sedan, perfect for city driving.",
    features: ["Automatic", "Aircon", "Bluetooth", "4 Seats", "Petrol"],
    images: [
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    ],
    price: 1800,
    bookings: ["2025-06-15", "2025-06-16", "2025-06-20"],
    locations: ["loc1", "loc2"],
  },
  {
    id: "car2",
    name: "Honda CR-V",
    plate: "XYZ-5678",
    description: "Spacious SUV for family trips.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel", "GPS"],
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2800,
    bookings: ["2025-06-18", "2025-06-19"],
    locations: ["loc1", "loc3"],
  },
  {
    id: "car3",
    name: "Suzuki Ertiga",
    plate: "DEF-1357",
    description: "Compact MPV, great for group travel.",
    features: ["Manual", "Aircon", "7 Seats", "Petrol"],
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2200,
    bookings: ["2025-06-21", "2025-06-22"],
    locations: ["loc2", "loc4"],
  },
  {
    id: "car4",
    name: "Hyundai Accent",
    plate: "JKL-2468",
    description: "Fuel efficient and easy to drive.",
    features: ["Automatic", "Aircon", "Bluetooth", "4 Seats", "Diesel"],
    images: [
      "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
    ],
    price: 1600,
    bookings: ["2025-06-22"],
    locations: ["loc1", "loc4"],
  },
  {
    id: "car5",
    name: "Ford Ranger",
    plate: "MNO-8642",
    description: "Rugged pickup for any adventure.",
    features: ["Manual", "Aircon", "Bluetooth", "5 Seats", "Diesel"],
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2500,
    bookings: ["2025-06-25"],
    locations: ["loc2", "loc3"],
  },
  {
    id: "car6",
    name: "Toyota Innova",
    plate: "PQR-1122",
    description: "Spacious and comfortable for families.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel"],
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2400,
    bookings: [],
    locations: ["loc2", "loc3", "loc4"],
  },
  {
    id: "car7",
    name: "Mitsubishi Mirage",
    plate: "STU-3344",
    description: "Compact hatchback, easy to park.",
    features: ["Automatic", "Aircon", "Bluetooth", "4 Seats", "Petrol"],
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    ],
    price: 1500,
    bookings: ["2025-06-10", "2025-06-11"],
    locations: ["loc3"],
  },
  {
    id: "car8",
    name: "Isuzu MU-X",
    plate: "VWX-5566",
    description: "Powerful SUV for long drives.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel", "GPS"],
    images: [
      "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=400&q=80",
    ],
    price: 3200,
    bookings: [],
    locations: ["loc3", "loc4"],
  },
  {
    id: "car9",
    name: "Kia Picanto",
    plate: "YZA-7788",
    description: "Small car, perfect for city and mountain roads.",
    features: ["Manual", "Aircon", "4 Seats", "Petrol"],
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    ],
    price: 1400,
    bookings: ["2025-06-13"],
    locations: ["loc4"],
  },
  {
    id: "car10",
    name: "Nissan Terra",
    plate: "BCD-9900",
    description: "SUV with great ground clearance.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel", "GPS"],
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    ],
    price: 3100,
    bookings: [],
    locations: ["loc4", "loc1"],
  },
  // More sample cars
  {
    id: "car11",
    name: "Mazda 3",
    plate: "EFG-2025",
    description: "Sporty sedan with premium features.",
    features: ["Automatic", "Aircon", "Bluetooth", "4 Seats", "Petrol", "GPS"],
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2100,
    bookings: ["2025-06-17"],
    locations: ["loc1", "loc2"],
  },
  {
    id: "car12",
    name: "Chevrolet Trailblazer",
    plate: "HIJ-3345",
    description: "SUV with strong performance and comfort.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel", "Bluetooth"],
    images: [
      "https://images.unsplash.com/photo-1503736317-1c6f5e8b8b8e?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2950,
    bookings: [],
    locations: ["loc2", "loc3"],
  },
  {
    id: "car13",
    name: "Hyundai Tucson",
    plate: "KLM-5567",
    description: "Modern crossover for city and out-of-town trips.",
    features: ["Automatic", "Aircon", "Bluetooth", "5 Seats", "Diesel"],
    images: [
      "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=400&q=80",
    ],
    price: 2300,
    bookings: ["2025-06-23"],
    locations: ["loc1", "loc4"],
  },
  {
    id: "car14",
    name: "Toyota Fortuner",
    plate: "NOP-7788",
    description: "Premium SUV, perfect for family and business.",
    features: ["Automatic", "Aircon", "7 Seats", "Diesel", "Bluetooth", "GPS"],
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    ],
    price: 3400,
    bookings: [],
    locations: ["loc3", "loc4"],
  },
];

// Dummy reviews data (attach to each car by id)
const carReviews: { [carId: string]: Array<{ 
  user: string; 
  rating: number; 
  comment: string; 
  images: string[]; 
  date: string;
}> } = {
  car1: [
    {
      user: "Anna D.",
      rating: 5,
      comment: "Very clean and smooth ride. Owner was responsive.",
      images: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-05-10"
    },
    {
      user: "Mark P.",
      rating: 4,
      comment: "Great for city driving. Would rent again.",
      images: [],
      date: "2025-04-22"
    }
  ],
  car2: [
    {
      user: "Liza S.",
      rating: 5,
      comment: "Perfect for our family trip to Tagaytay!",
      images: [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-03-18"
    },
    {
      user: "Benjie T.",
      rating: 4,
      comment: "Comfortable and spacious. Fuel efficient.",
      images: [],
      date: "2025-03-20"
    }
  ],
  car3: [
    {
      user: "Carlos G.",
      rating: 4,
      comment: "Spacious and comfortable. Manual transmission was smooth.",
      images: [],
      date: "2025-05-30"
    }
  ],
  car4: [
    {
      user: "Mia R.",
      rating: 5,
      comment: "Very fuel efficient and easy to drive.",
      images: [],
      date: "2025-06-01"
    }
  ],
  car5: [
    {
      user: "Rico S.",
      rating: 5,
      comment: "Great for our mountain adventure!",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-06-05"
    }
  ],
  car6: [
    {
      user: "Lara P.",
      rating: 4,
      comment: "Spacious and clean. Good for big families.",
      images: [],
      date: "2025-06-07"
    }
  ],
  car7: [
    {
      user: "Jomar V.",
      rating: 4,
      comment: "Easy to park and drive around the city.",
      images: [],
      date: "2025-06-10"
    }
  ],
  car8: [
    {
      user: "Dianne S.",
      rating: 5,
      comment: "Powerful SUV, perfect for our road trip.",
      images: [
        "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-06-12"
    }
  ],
  car9: [
    {
      user: "Miko L.",
      rating: 4,
      comment: "Small but reliable for Baguio roads.",
      images: [],
      date: "2025-06-13"
    }
  ],
  car10: [
    {
      user: "Rhea G.",
      rating: 5,
      comment: "Great ground clearance, smooth ride.",
      images: [],
      date: "2025-06-14"
    }
  ],
  car11: [
    {
      user: "Sam C.",
      rating: 5,
      comment: "Sporty and fun to drive!",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-06-17"
    }
  ],
  car12: [
    {
      user: "Tina Y.",
      rating: 4,
      comment: "Comfortable for long drives.",
      images: [],
      date: "2025-06-18"
    }
  ],
  car13: [
    {
      user: "Paolo D.",
      rating: 5,
      comment: "Modern and stylish, loved the Bluetooth feature.",
      images: [],
      date: "2025-06-19"
    }
  ],
  car14: [
    {
      user: "Grace F.",
      rating: 5,
      comment: "Perfect for our family and business trips.",
      images: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80"
      ],
      date: "2025-06-20"
    }
  ],
};

const featureIcons: { [key: string]: string } = {
  Automatic: "⚙️",
  Manual: "🕹️",
  Aircon: "❄️",
  Bluetooth: "🔊",
  "4 Seats": "🧑‍🤝‍🧑",
  "7 Seats": "👨‍👩‍👧‍👦",
  Petrol: "⛽",
  Diesel: "🛢️",
  GPS: "📡",
};

const allFeatures = Array.from(
  new Set(cars.flatMap((car) => car.features))
);

const featureOrder = [
  "Automatic",
  "Manual",
  "Aircon",
  "Bluetooth",
  "GPS",
  "4 Seats",
  "7 Seats",
  "Petrol",
  "Diesel",
];

const orderedFeatures = featureOrder.filter((f) => allFeatures.includes(f));

// Helper to get days in month
function getDaysArray(year: number, month: number) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => i + 1);
}

// Coding rules: last digit to restricted weekday (0=Monday, 1=Monday, 2=Tuesday, etc.)
const codingRules: { [key: string]: number[] } = {
  Monday: [1, 2],
  Tuesday: [3, 4],
  Wednesday: [5, 6],
  Thursday: [7, 8],
  Friday: [9, 0],
};

function getPlateLastDigit(plate: string) {
  const match = plate.match(/\d$/);
  return match ? parseInt(match[0], 10) : null;
}

function isCodingDay(date: Date, plate: string) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const lastDigit = getPlateLastDigit(plate);
  if (lastDigit === null) return false;
  const restrictedDigits = codingRules[day];
  return restrictedDigits ? restrictedDigits.includes(lastDigit) : false;
}

// "No car selected" option
const NO_CAR_OPTION = {
  id: "none",
  name: "No car selected",
  plate: "",
  description: "Please select a car to see details and reviews.",
  features: [],
  images: [
    "https://cdn-icons-png.flaticon.com/512/61/61168.png"
  ],
  price: 0,
  bookings: [],
  locations: allLocations.map(l => l.id),
};

const carsWithNone = [NO_CAR_OPTION, ...cars];

const CarBooking: React.FC = () => {
  // State
  const [selectedLocation, setSelectedLocation] = useState(allLocations[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string>("none");
  // Removed carouselIdx and bookedDates as they are unused

  // Cars for location and features (include "No car selected" always)
  const carsForLocation = carsWithNone.filter((car) => car.locations.includes(selectedLocation.id));
  const filteredCars = carsForLocation.filter((car) =>
    selectedFeatures.length === 0
      ? true
      : selectedFeatures.every((f) => car.features.includes(f))
  );

  // Keep "No car selected" as default if nothing is selected or car is filtered out
  React.useEffect(() => {
    if (!filteredCars.some((c) => c.id === selectedCarId)) {
      setSelectedCarId("none");
    }
    // eslint-disable-next-line
  }, [selectedLocation, selectedFeatures, filteredCars.length]);

  const selectedCar = filteredCars.find((c) => c.id === selectedCarId) || NO_CAR_OPTION;

  // Calendar
  const days = getDaysArray(calendarYear, calendarMonth);
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const monthStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}`;
  // Removed bookedDates
  const codingDates = selectedDates.filter((d) => {
    if (selectedLocation.name !== "Manila" || selectedCar.id === "none") return false;
    const dateObj = new Date(d);
    const day = dateObj.getDay();
    if (day === 0 || day === 6) return false;
    return isCodingDay(dateObj, selectedCar.plate);
  });

  // Handlers
  const handleLocationChange = (locId: string) => {
    const loc = allLocations.find((l) => l.id === locId)!;
    setSelectedLocation(loc);
    setSelectedFeatures([]);
    setSelectedDates([]);
    setSelectedCarId("none");
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
    setSelectedDates([]);
    setSelectedCarId("none");
  };

  const handleDateClick = (date: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    );
  };

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
    setSelectedDates([]);
  };

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  function maskPlate(plate: string) {
    let lastCharIndex = -1;
    for (let i = plate.length - 1; i >= 0; i--) {
      if (plate[i] !== '-') {
        lastCharIndex = i;
        break;
      }
    }
    return plate
      .split("")
      .map((c, i) =>
        c === "-" ? "-" : i === lastCharIndex ? c : "*"
      )
      .join("");
  }

  // --- Render ---
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          {/* Where to go */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="location-select">Where do you want to go?</label>
            <select
              id="location-select"
              className="p-2 rounded border"
              value={selectedLocation.id}
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              {allLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          {/* When to go (Calendar) */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">When do you want to go?</label>
            <div className="bg-white border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <button onClick={prevMonth} className="px-2 py-1 rounded bg-gray-200">&lt;</button>
                <div className="font-bold">
                  {new Date(calendarYear, calendarMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <button onClick={nextMonth} className="px-2 py-1 rounded bg-gray-200">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold mb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array(firstDay)
                  .fill(null)
                  .map((_, i) => (
                    <div key={"empty" + i}></div>
                  ))}
                {days.map((day) => {
                  const dateStr = `${monthStr}-${String(day).padStart(2, "0")}`;
                  const dateObj = new Date(dateStr);
                  const isBooked = selectedCar.bookings.includes(dateStr);
                  const isSelected = selectedDates.includes(dateStr);
                  const isCoding =
                    selectedLocation.name === "Manila" &&
                    selectedCar.id !== "none" &&
                    isCodingDay(dateObj, selectedCar.plate) &&
                    dateObj.getDay() !== 0 &&
                    dateObj.getDay() !== 6;
                  return (
                    <button
                      key={day}
                      className={`h-8 w-8 rounded text-xs font-bold 
                        ${isBooked || isCoding
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-rose-500 text-white"
                          : "bg-green-100 hover:bg-rose-100 border border-green-400"}
                      `}
                      disabled={isBooked || isCoding}
                      onClick={() => handleDateClick(dateStr, isBooked || isCoding)}
                      title={
                        isBooked
                          ? "Booked"
                          : isCoding
                          ? "Restricted by coding"
                          : "Available"
                      }
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-sm">
                <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-1 align-middle"></span> Booked/Restricted &nbsp;
                <span className="inline-block w-3 h-3 bg-green-100 border border-green-400 rounded mr-1 align-middle"></span> Available &nbsp;
                <span className="inline-block w-3 h-3 bg-rose-500 rounded mr-1 align-middle"></span> Selected
              </div>
              {selectedCar.id !== "none" && selectedLocation.name === "Manila" && (
                <div className="mt-2 text-xs text-red-700">
                  <b>Note:</b> Dates disabled due to number coding are not allowed for this cars plate in Manila.
                </div>
              )}
            </div>
          </div>
          {/* Feature Filter */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Filter by Features</label>
            <div className="flex flex-wrap gap-2">
              {orderedFeatures.map((feature) => (
                <label key={feature} className="flex items-center gap-1 text-xs border rounded px-2 py-1 bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureChange(feature)}
                  />
                  {featureIcons[feature] || "•"} {feature}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex flex-col gap-4 lg:col-span-6">
          {/* Car List */}
          <div>
            <label className="font-semibold text-lg mb-2 block">Available Cars</label>
            <div className="flex flex-col gap-4">
              {filteredCars.length === 0 ? (
                <div className="text-gray-500 text-center py-4 border rounded bg-gray-50">
                  No cars match selected features
                </div>
              ) : (
                filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className={`border rounded p-4 flex flex-col md:flex-row gap-4 transition cursor-pointer
                      ${selectedCarId === car.id
                        ? "border-rose-500 bg-rose-50 shadow"
                        : "border-gray-200 bg-white hover:border-rose-300"}
                    `}
                    onClick={() => handleCarSelect(car.id)}
                  >
                    {/* Carousel of images */}
                    <div className="w-full md:w-64 flex-shrink-0">
                      <Carousel className="w-full" opts={{ loop: true }}>
                        <div className="absolute inset-y-0 left-0 flex items-center z-20 px-2">
                          <CarouselPrevious />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center z-20 px-2">
                          <CarouselNext />
                        </div>
                        <CarouselContent>
                          {car.images.map((img, idx) => (
                            <CarouselItem key={img} className="flex items-center justify-center">
                              <Image
                                src={img}
                                alt={car.name}
                                className="object-cover w-full h-40 rounded"
                                width={256}
                                height={160}
                                priority={idx === 0}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                    {/* Car Info */}
                    <div className="flex flex-col flex-1 gap-1">
                      <span className="font-bold text-lg">{car.name}</span>
                      {car.id !== "none" && (
                        <>
                          <span className="text-xs text-gray-500">
                            Plate: <span className="font-mono bg-gray-100 px-1 rounded">{maskPlate(car.plate)}</span>
                          </span>
                          <span className="text-xs mb-1">{car.description}</span>
                          <div className="flex flex-wrap gap-1 text-xs mb-1">
                            {orderedFeatures
                              .filter((f) => car.features.includes(f))
                              .map((f) => (
                                <span key={f} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded">
                                  {featureIcons[f] || "•"} {f}
                                </span>
                              ))}
                          </div>
                          <span className="font-semibold text-rose-600 text-base mt-1">
                            ₱{car.price.toLocaleString()} / day
                          </span>
                        </>
                      )}
                      {car.id === "none" && (
                        <span className="text-xs text-gray-500">{car.description}</span>
                      )}
                    </div>
                    {/* Radio for single select */}
                    <div className="flex items-center ml-4">
                      <input
                        type="radio"
                        checked={selectedCarId === car.id}
                        onChange={() => handleCarSelect(car.id)}
                        onClick={e => e.stopPropagation()}
                        className="w-5 h-5 accent-rose-500"
                        aria-label={`Select ${car.name}`}
                        name="car-select"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          {/* Booking summary */}
          <div className="p-4 border rounded bg-green-50 shadow mt-4 lg:mt-0">
            <div className="font-bold text-lg mb-2 text-green-900 flex items-center gap-2">
              <span>Booking Summary</span>
              <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {selectedDates.length} {selectedDates.length === 1 ? "day" : "days"}
              </span>
            </div>
            {selectedCar && selectedCar.id !== "none" ? (
              <>
                <div className="mb-2">
                  <span className="font-semibold">{selectedCar.name}</span>
                  <span className="mx-1 text-gray-400">|</span>
                  <span className="font-semibold">{selectedLocation.name}</span>
                  <span className="mx-1 text-gray-400">|</span>
                  <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded">{maskPlate(selectedCar.plate)}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Dates:</span>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {selectedDates
                      .sort()
                      .map((d) => {
                        const dateObj = new Date(d);
                        const isCoding =
                          selectedLocation.name === "Manila" &&
                          isCodingDay(dateObj, selectedCar.plate) &&
                          dateObj.getDay() !== 0 &&
                          dateObj.getDay() !== 6;
                        return (
                          <li key={d} className={isCoding ? "text-red-600 font-semibold" : ""}>
                            {dateObj.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                            {isCoding && (
                              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                                Coding Day (Not Allowed)
                              </span>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                {codingDates.length > 0 && (
                  <div className="mb-2 text-red-700 bg-red-100 rounded px-2 py-1 text-sm">
                    <b>Warning:</b> The selected car is not allowed on the following date{codingDates.length > 1 ? "s" : ""} due to plate number coding in Manila:
                    <ul className="list-disc list-inside ml-4">
                      {codingDates.map((d) => {
                        const dateObj = new Date(d);
                        return (
                          <li key={d}>
                            {dateObj.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </li>
                        );
                      })}
                    </ul>
                    Please remove these dates or select another car.
                  </div>
                )}
                <div className="mb-2">
                  <span className="font-semibold">Total:</span>{" "}
                  <span className="font-bold text-rose-600 text-lg">
                    ₱{(selectedCar.price * (selectedDates.length - codingDates.length)).toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({selectedCar.price.toLocaleString()} x {selectedDates.length - codingDates.length} day{selectedDates.length - codingDates.length > 1 ? "s" : ""})
                  </span>
                </div>
                <button
                  className={`mt-2 px-4 py-2 rounded font-bold w-full transition ${
                    codingDates.length > 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                  onClick={() => {
                    if (codingDates.length === 0) {
                      alert("Car booking submitted!");
                    }
                  }}
                  disabled={codingDates.length > 0 || selectedCar.id === "none" || selectedDates.length === 0}
                >
                  Book Now
                </button>
              </>
            ) : (
              <div className="text-gray-500 text-center py-4">
                Select a car to see booking summary.
              </div>
            )}
          </div>
          {/* Reviews for selected car */}
          {selectedCar && selectedCar.id !== "none" && (
            <div className="w-full border rounded p-4 bg-white mt-2">
              <div className="font-bold text-lg mb-2 flex items-center gap-2">
                <span>Reviews & Feedback</span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                  {carReviews[selectedCar.id]?.length || 0}
                </span>
              </div>
              {carReviews[selectedCar.id]?.length ? (
                <div className="flex flex-col gap-4">
                  {carReviews[selectedCar.id].map((review, idx) => (
                    <div key={idx} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.user}</span>
                        <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                        <span className="flex items-center text-yellow-500 text-xs ml-2">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <div className="mb-1 text-sm">{review.comment}</div>
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mt-1">
                          {review.images.map((img, i) => (
                            <Image
                              key={i}
                              src={img}
                              alt="Review photo"
                              width={80}
                              height={60}
                              className="rounded border object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No reviews yet for this car.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarBooking;