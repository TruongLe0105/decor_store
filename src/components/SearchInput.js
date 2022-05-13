import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";


function SearchInput({ handleSubmit }) {
    const [searchQuery, setSearchQuery] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(searchQuery);
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "40%" }}>
            <TextField
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                sx={{ width: "100%" }}
                size="small"
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
        </form>
    );
}

export default SearchInput;