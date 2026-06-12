import { useEffect, useState } from "react";
import { User, MessageCircle, Loader2, AlertCircle, RefreshCw, Sparkles, Building2, Search, X } from "lucide-react";

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: number;
}

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://bookingadmin.wayanadbeehive.com/api/public/rooms");
      if (!response.ok) {
        throw new Error(`Failed to fetch room data (Status: ${response.status})`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format received from server");
      }
      
      // Filter out empty or obviously broken elements if any, or sort them nicely
      // But keep all data as requested. Let's sort by ID to stay consistent
      const sortedData = [...data].sort((a, b) => a.id - b.id);
      setRooms(sortedData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while fetching the rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate some high-end, elegant matching subtle style accents based on ID or Name
  const getRoomStyle = (roomName: string, id: number) => {
    const lName = roomName.toLowerCase();
    if (lName.includes("deluxe")) {
      return {
        bgGradient: "from-amber-50/70 to-orange-50/40",
        borderAccent: "border-amber-200",
        badgeBg: "bg-amber-100 text-amber-800",
        pillBg: "bg-amber-500",
        patternColor: "rgba(245, 158, 11, 0.05)",
        subtitle: "Premium comfort with refined finishings"
      };
    }
    if (lName.includes("suite")) {
      return {
        bgGradient: "from-rose-50/70 to-stone-100/40",
        borderAccent: "border-rose-200",
        badgeBg: "bg-rose-100 text-rose-800",
        pillBg: "bg-rose-500",
        patternColor: "rgba(244, 63, 94, 0.05)",
        subtitle: "Our most spacious and luxurious sanctuary"
      };
    }
    if (lName.includes("standard")) {
      return {
        bgGradient: "from-sky-50/70 to-slate-50/40",
        borderAccent: "border-sky-200",
        badgeBg: "bg-sky-100 text-sky-800",
        pillBg: "bg-sky-500",
        patternColor: "rgba(14, 165, 233, 0.05)",
        subtitle: "Intimate design focusing on key essentials"
      };
    }
    if (lName.includes("family")) {
      return {
        bgGradient: "from-emerald-50/70 to-teal-50/40",
        borderAccent: "border-emerald-200",
        badgeBg: "bg-emerald-100 text-emerald-800",
        pillBg: "bg-emerald-500",
        patternColor: "rgba(16, 185, 129, 0.05)",
        subtitle: "Generous space tailored for your loved ones"
      };
    }
    
    // Fallback/Default style variants based on ID to make the list look rich and varied
    const colorSchemes = [
      {
        bgGradient: "from-slate-50 to-neutral-50",
        borderAccent: "border-neutral-200",
        badgeBg: "bg-neutral-100 text-neutral-800",
        pillBg: "bg-neutral-500",
        patternColor: "rgba(115, 115, 115, 0.04)",
        subtitle: "Cozy accommodation optimized for relaxation"
      },
      {
        bgGradient: "from-indigo-50/50 to-slate-50/30",
        borderAccent: "border-indigo-200",
        badgeBg: "bg-indigo-100 text-indigo-800",
        pillBg: "bg-indigo-500",
        patternColor: "rgba(99, 102, 241, 0.04)",
        subtitle: "Charming space with modern ambient touch"
      },
      {
        bgGradient: "from-violet-50/50 to-stone-50/30",
        borderAccent: "border-violet-200",
        badgeBg: "bg-violet-100 text-violet-800",
        pillBg: "bg-violet-500",
        patternColor: "rgba(139, 92, 246, 0.04)",
        subtitle: "A delightful retreat in a tranquil setting"
      }
    ];
    return colorSchemes[id % colorSchemes.length];
  };

  const handleWhatsAppClick = (room: Room) => {
    const textMessage = `Hello,
I am interested in booking:

Room: ${room.name}
Price: ₹${room.price}
Capacity: ${room.capacity}

Please provide availability details.`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-50/55 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Page Typography Header */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 tracking-wider uppercase mb-2">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            Executive Stays
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
            Premium Room Showcase
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal">
            Browse our carefully curated suites and residences. Click any WhatsApp button to directly check live availability with our team.
          </p>
        </div>

        {/* Search Input Bar */}
        {!loading && !error && rooms.length > 0 && (
          <div className="max-w-md mx-auto mb-16 relative">
            <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm focus-within:shadow-md focus-within:border-slate-300/80 transition-all p-1">
              <div className="pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search rooms by name (e.g. Deluxe, Suite)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-1 text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none focus:ring-0 text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 mr-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading State with Skeletal Shimmer Pattern */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6"
              >
                {/* Simulated Visual Accent Area */}
                <div className="h-28 w-full bg-slate-100/80 rounded-2xl animate-pulse" />
                
                {/* Title skeleton */}
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-slate-100/80 rounded-md animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-100/80 rounded-md animate-pulse" />
                </div>
                
                {/* Details skeleton */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="h-4 w-1/3 bg-slate-100/80 rounded-md animate-pulse" />
                  <div className="h-4 w-1/4 bg-slate-100/80 rounded-md animate-pulse" />
                </div>
                
                {/* Button skeleton */}
                <div className="h-12 w-full bg-slate-100/80 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Error State Banner */}
        {error && !loading && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-red-100 shadow-xl shadow-red-500/5 text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Failed to Load Showcase</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We encountered an error while trying to fetch our showcase from the booking system. Please make sure you are connected to the internet and try again.
              </p>
              {error && (
                <p className="text-xs font-mono text-red-500 bg-red-50/50 p-2 rounded-lg border border-red-100/40 inline-block overflow-x-auto max-w-full">
                  {error}
                </p>
              )}
            </div>
            <button
              onClick={fetchRooms}
              className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 active:scale-95 transition-all text-sm shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Try Reconnecting
            </button>
          </div>
        )}

        {/* Empty State when API successfully returns empty array */}
        {!loading && !error && rooms.length === 0 && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-slate-100 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto border border-slate-100 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">No Rooms Available</h2>
              <p className="text-sm text-slate-500">
                There are currently no rooms available in our showcase directory. Please check back later.
              </p>
            </div>
          </div>
        )}

        {/* Room Grid Showcase Container */}
        {!loading && !error && rooms.length > 0 && (
          <>
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredRooms.map((room) => {
                  const style = getRoomStyle(room.name, room.id);

                  return (
                    <div
                      key={room.id}
                      id={`room-card-${room.id}`}
                      className="group relative bg-white rounded-[32px] border border-slate-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 duration-300 transition-all overflow-hidden flex flex-col h-full"
                    >
                      {/* Decorative Geometric Header Panel - premium minimalist design style */}
                      <div className={`h-24 px-6 md:px-8 pt-6 relative flex items-start justify-between bg-gradient-to-br ${style.bgGradient}`}>
                        {/* SVG abstract architectural outline rendering behind card */}
                        <div className="absolute inset-0 opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-300 pointer-events-none">
                          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id={`grid-${room.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect width="20" height="20" fill="none" />
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${room.id})`} style={{ color: style.patternColor }} />
                          </svg>
                        </div>

                        <div className="relative z-10 flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${style.pillBg}`} />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                            ID: 0{room.id}
                          </span>
                        </div>

                        <span className={`relative z-10 text-xs font-semibold px-3 py-1 rounded-full ${style.badgeBg} shadow-sm border border-black/5`}>
                          {room.capacity > 4 ? "Sanctuary" : room.price >= 3000 ? "Luxury" : "Comfort"}
                        </span>
                      </div>

                      {/* Main Card Information Area */}
                      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-6">
                        <div className="space-y-3">
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-slate-900/90 transition-colors line-clamp-1 tracking-tight font-display">
                            {room.name}
                          </h2>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                            {style.subtitle}
                          </p>
                        </div>

                        {/* Pricing and Details Rows */}
                        <div className="pt-4 border-t border-slate-100/80 space-y-4">
                          {/* Pricing Row */}
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              Price per Night
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                ₹{room.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>

                          {/* Guest Capacity Row */}
                          <div className="flex items-center justify-between py-1.5 px-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                              <User className="w-4 h-4 text-slate-400" />
                              Guest Capacity
                            </span>
                            <span className="text-xs font-bold text-slate-800">
                              {room.capacity} Guests
                            </span>
                          </div>
                        </div>

                        {/* Direct inquiry CTA */}
                        <button
                          onClick={() => handleWhatsAppClick(room)}
                          className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-semibold text-sm transition-all duration-250 shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/15 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-emerald-500 stroke-[2.5px]" />
                          Request on WhatsApp
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="max-w-md mx-auto bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm text-center space-y-6 mt-6">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto border border-slate-105 shadow-inner">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 font-display">No Match Found</h2>
                  <p className="text-sm text-slate-500">
                    We couldn't find any rooms matching "<span className="font-semibold">{searchQuery}</span>". Try tweaking your search query.
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-2 justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 active:scale-95 transition-all text-xs shadow-sm cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom Attribution Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-200/60 text-center text-xs text-slate-400">
          <p className="flex items-center justify-center gap-1">
            <span>Built by</span>
            <a 
              href="https://realamericantechnologies.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-slate-600 hover:text-emerald-600 transition-colors underline decoration-slate-200 hover:decoration-emerald-350 underline-offset-4"
            >
              Real American Technologies
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
