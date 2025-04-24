import React from 'react';

// Enum for category values to ensure type safety
enum Category {
  All = '',
  Technology = 'technology',
  Sports = 'sports',
  Health = 'health',
  Business = 'business',
  Science = 'science',
}

// Category options for the select dropdown
const CATEGORY_OPTIONS = [
  { value: Category.All, label: 'All Categories' },
  { value: Category.Technology, label: 'Technology' },
  { value: Category.Sports, label: 'Sports' },
  { value: Category.Health, label: 'Health' },
  { value: Category.Business, label: 'Business' },
  { value: Category.Science, label: 'Science' },
];

type Props = {
  category: string;
  setCategory: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
};

// Search Input Component
const SearchInput: React.FC<Pick<Props, 'search' | 'setSearch'>> = ({ search, setSearch }) => (
  <div className="relative w-full md:w-1/2">
    <input
      type="text"
      placeholder="Search for news..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 pr-10 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
    />
    <svg
      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
);

// Category Select Component
const CategorySelect: React.FC<Pick<Props, 'category' | 'setCategory'>> = ({ category, setCategory }) => (
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full md:w-1/4 p-3 rounded-lg bg-white/90 text-gray-800 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 cursor-pointer"
  >
    {CATEGORY_OPTIONS.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Main Header Component
const Header: React.FC<Props> = ({ category, setCategory, search, setSearch }) => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-800 p-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <SearchInput search={search} setSearch={setSearch} />
        {/* Category Dropdown */}
        <CategorySelect category={category} setCategory={setCategory} />
      </div>
    </header>
  );
};

export default Header;