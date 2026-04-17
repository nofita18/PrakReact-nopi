import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
    /** Deklrasai Logic Search & Filter **/
    const _searchTerm = searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
        framework.name
                    .toLowerCase()
                    .includes(_searchTerm) ||
        framework.description
                    .toLowerCase()
                    .includes(_searchTerm);

        const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];
    return (
        // Container utama dengan background soft pink yang sangat muda
        <div className="min-h-screen bg-[#fff5f6] p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-[#86444c] mb-8 text-center italic">
                    Framework Collections
                </h1>
                <input
                type="text"
                name="searchTerm"
                placeholder="Search framework..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                name="selectedTag"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={(e) => setSelectedTag(e.target.value)}
                >
                <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                        {tag}
                        </option>
                    ))}
                </select>
                
                {filteredFrameworks.map((item) => (
                    <div 
                        key={item.id} 
                        className="group relative border-none p-6 mb-8 rounded-4xl shadow-xl shadow-rose-100/50 bg-white/80 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 ease-in-out"
                    >
                        {/* Aksen dekoratif pink di pojok */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-tr-4xl rounded-bl-full -z-10 group-hover:bg-rose-100 transition-colors" />

                        <h2 className="text-xl font-black text-[#5a2e33] mb-2 tracking-tight">
                            {item.name}
                        </h2>
                        
                        <p className="text-gray-500 leading-relaxed mb-4 text-sm">
                            {item.description}
                        </p>
                        
                        <p className="text-[#a07076] text-sm mb-4">
                            Developed by: <span className="font-semibold text-[#86444c]">{item.details.developer}</span> 
                            <span className="mx-2 opacity-30">|</span>
                            <span className="italic">{item.details.releaseYear}</span>
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-rose-50 text-rose-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border border-rose-100 shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={item.details.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-bold text-white bg-rose-400 hover:bg-rose-500 px-5 py-2.5 rounded-full transition-all shadow-lg shadow-rose-200 no-underline"
                            >
                                Visit Website
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}