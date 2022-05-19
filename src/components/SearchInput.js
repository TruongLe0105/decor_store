import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";


function SearchInput({ handleSubmit }) {
    const [searchQuery, setSearchQuery] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(searchQuery);
        setSearchQuery("")
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "45%" }}>
            <TextField
                size="small"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                sx={{
                    width: "100%",
                    height: "40px",
                    border: "none"
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                color="primary"
                                aria-label="search by name"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form >
    );
}

export default SearchInput;