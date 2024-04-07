import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../themes/theme";
import { useSearch } from "../hooks/SearchProvider.jsx";

export default function SearchBar() {
  const { onSearch } = useSearch();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        variant="outlined"
        onChange={(e) => {
          onSearch(e.target.value)
        }}
        placeholder="Search for events..."
        sx={{
          width: "580px",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", 
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
