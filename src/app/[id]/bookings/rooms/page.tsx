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

// Dummy data for locations, rooms, and bookings
const locations = [
  {
    id: "loc1",
    name: "Tagaytay",
    rooms: [
      {
        id: "room1",
        name: "Skyview Suite",
        description: "A cozy suite with a panoramic view of Taal.",
        amenities: ["WiFi", "Aircon", "Hot Shower", "TV", "Balcony"],
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
        ],
        price: 3500,
        bookings: ["2025-06-15", "2025-06-16", "2025-06-20"],
      },
      {
        id: "room2",
        name: "Garden Room",
        description: "Relaxing room with direct access to the garden.",
        amenities: ["WiFi", "Aircon", "Garden Access", "Breakfast"],
        images: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        ],
        price: 2800,
        bookings: ["2025-06-18", "2025-06-19"],
      },
    ],
  },
  {
    id: "loc2",
    name: "Baguio",
    rooms: [
      {
        id: "room3",
        name: "Pine Loft",
        description: "Loft room with pine forest view.",
        amenities: ["WiFi", "Heater", "Parking", "Breakfast"],
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        ],
        price: 3200,
        bookings: ["2025-06-21", "2025-06-22"],
      },
    ],
  },
];

// Helper to get days in month
function getDaysArray(year: number, month: number) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => i + 1);
}

const amenitiesIcons: { [key: string]: string } = {
  WiFi: "📶",
  Aircon: "❄️",
  "Hot Shower": "🚿",
  TV: "📺",
  Balcony: "🌅",
  "Garden Access": "🌳",
  Breakfast: "🥞",
  Heater: "🔥",
  Parking: "🅿️",
};

const RoomBooking: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedRoom, setSelectedRoom] = useState(selectedLocation.rooms[0]);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Update room when location changes
  const handleLocationChange = (locId: string) => {
    const loc = locations.find((l) => l.id === locId)!;
    setSelectedLocation(loc);
    setSelectedRoom(loc.rooms[0]);
    setSelectedDates([]);
    setCarouselIdx(0);
  };

  // Update selected room
  const handleRoomChange = (roomId: string) => {
    const room = selectedLocation.rooms.find((r) => r.id === roomId)!;
    setSelectedRoom(room);
    setSelectedDates([]);
    setCarouselIdx(0);
  };

  // Calendar navigation
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

  // Booking selection
  const handleDateClick = (date: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    );
  };

  // Calendar rendering
  const days = getDaysArray(calendarYear, calendarMonth);
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const bookedDates = selectedRoom.bookings;
  const monthStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}`;

  // ...existing code...

// ...existing code...

return (
  <div className="max-w-6xl mx-auto p-4">
    {/* Use grid-cols-1 for mobile, grid-cols-12 for large screens.
        Middle column gets col-span-6, sides get col-span-3 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Location and Room Selectors */}
      <div className="flex flex-col gap-4 lg:col-span-3">
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="location-select">Location</label>
          <select
            id="location-select"
            className="p-2 rounded border"
            value={selectedLocation.id}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="room-select">Room</label>
          <select
            id="room-select"
            className="p-2 rounded border"
            value={selectedRoom.id}
            onChange={(e) => handleRoomChange(e.target.value)}
          >
            {selectedLocation.rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle Column: Carousel and Room Info */}
      <div className="flex flex-col items-center lg:col-span-6">
        {/* Room Images Carousel */}
        <div className="w-full flex flex-col items-center mb-2">
  <div className="relative w-full max-w-2xl">
    <Carousel className="w-full" opts={{ loop: true }}>
      {/* Arrows absolutely positioned over the images */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20 px-2">
        <CarouselPrevious />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20 px-2">
        <CarouselNext />
      </div>
      <CarouselContent>
        {selectedRoom.images.map((img, idx) => (
          <CarouselItem key={img} className="flex items-center justify-center">
            <Image
              src={img}
              alt={selectedRoom.name}
              className="object-cover w-full max-w-2xl h-72 rounded"
              width={800}
              height={288}
              priority={idx === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
  {/* Dot indicators below the carousel */}
  <div className="flex justify-center items-center mt-2 w-full max-w-2xl">
    <div className="flex gap-1">
      {selectedRoom.images.map((_, i) => (
        <button
          key={i}
          className={`w-3 h-3 rounded-full border ${i === carouselIdx ? "bg-rose-500" : "bg-gray-300"}`}
          onClick={() => setCarouselIdx(i)}
          aria-label={`Show image ${i + 1}`}
          type="button"
        />
      ))}
    </div>
  </div>
</div>
        {/* Room Info */}
        <div className="flex flex-col gap-2 w-full border rounded p-4 bg-gray-50 mt-2">
          <div className="text-lg font-bold">{selectedRoom.name}</div>
          <div>{selectedRoom.description}</div>
          <div>
            <span className="font-semibold">Amenities:</span>{" "}
            {selectedRoom.amenities.map((a) => (
              <span key={a} className="inline-block mr-2">
                {amenitiesIcons[a] || "•"} {a}
              </span>
            ))}
          </div>
          <div className="font-semibold text-rose-600">
            ₱{selectedRoom.price.toLocaleString()} / night
          </div>
        </div>
      </div>

      {/* Right Column: Calendar and Booking Summary */}
      <div className="flex flex-col gap-4 lg:col-span-3">
        {/* Calendar */}
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
              const isBooked = bookedDates.includes(dateStr);
              const isSelected = selectedDates.includes(dateStr);
              return (
                <button
                  key={day}
                  className={`h-8 w-8 rounded text-xs font-bold
                    ${isBooked
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-rose-500 text-white"
                      : "bg-green-100 hover:bg-rose-100 border border-green-400"}
                  `}
                  disabled={isBooked}
                  onClick={() => handleDateClick(dateStr, isBooked)}
                  title={isBooked ? "Booked" : "Available"}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="mt-3 text-sm">
            <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-1 align-middle"></span> Booked &nbsp;
            <span className="inline-block w-3 h-3 bg-green-100 border border-green-400 rounded mr-1 align-middle"></span> Available &nbsp;
            <span className="inline-block w-3 h-3 bg-rose-500 rounded mr-1 align-middle"></span> Selected
          </div>
        </div>
        {/* Booking summary */}
        {selectedDates.length > 0 && (
          <div className="p-3 border rounded bg-green-50">
            <div className="font-semibold mb-1">Booking Summary</div>
            <div>
              <span className="font-bold">{selectedRoom.name}</span> at <span className="font-bold">{selectedLocation.name}</span>
            </div>
            <div>
              Dates:{" "}
              {selectedDates
                .sort()
                .map((d) => new Date(d).toLocaleDateString())
                .join(", ")}
            </div>
            <div>
              Total:{" "}
              <span className="font-bold text-rose-600">
                ₱{(selectedRoom.price * selectedDates.length).toLocaleString()}
              </span>
            </div>
            <button
              className="mt-2 px-4 py-1 rounded bg-rose-600 text-white font-bold"
              onClick={() => alert("Booking submitted!")}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ...existing code...

// ...existing code...
};

export default RoomBooking;