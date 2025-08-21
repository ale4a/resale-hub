import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Calendar, Filter, Search, RotateCcw } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    date: string;
  }) => void;
}

export const TicketFilters = ({ onFilterChange }: FilterProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { search, category, date, [field]: value };

    if (field === "search") setSearch(value);
    if (field === "category") setCategory(value);
    if (field === "date") setDate(value);

    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setDate("");
    onFilterChange({ search: "", category: "", date: "" });
  };

  return (
    <div className="bg-card rounded-xl border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filter Tickets</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category */}
        <Select
          value={category}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concierto">Concert</SelectItem>
            <SelectItem value="teatro">Theater</SelectItem>
            <SelectItem value="deportes">Sports</SelectItem>
            <SelectItem value="arte">Art & Exhibitions</SelectItem>
            <SelectItem value="conferencia">Conferences</SelectItem>
            <SelectItem value="festival">Festivals</SelectItem>
          </SelectContent>
        </Select>

        {/* Date */}
        <Select
          value={date}
          onValueChange={(value) => handleFilterChange("date", value)}
        >
          <SelectTrigger>
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="quarter">Next 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
