import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../features/user/products/productSlice';

function SortMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showValueSort, setShowValueSort] = React.useState("")
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const SortByPriceInc = () => {
        setShowValueSort("price_ascending")
        handleClose();
    };
    const SortByPriceDes = () => {
        setShowValueSort("price_decrease")
        handleClose();
    };
    const SortByNewwest = () => {
        setShowValueSort("newest")
        handleClose();
    }
    const SortByOldest = () => {
        setShowValueSort("oldest")
        handleClose();
    };

    React.useEffect(() => {
        if (showValueSort) dispatch(getProducts({ sortBy: showValueSort }))
    }, [showValueSort, dispatch]);

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                sx={{
                    mt: 1,
                    ml: 1,
                    mr: { xs: 1, sm: 5 },
                    width: { xs: "100px", sm: "140px", md: "180px" },
                    height: { xs: "20px", sm: "25px", md: "30px" },
                    fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                }}
            >
                Sắp xếp theo:
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={SortByPriceInc}>Giá tăng dần</MenuItem>
                <MenuItem onClick={SortByPriceDes}>Giá giảm dần</MenuItem>
                <MenuItem onClick={SortByNewwest}>Mới nhất</MenuItem>
                <MenuItem onClick={SortByOldest}>Cũ nhất</MenuItem>
            </Menu>
        </div>
    );
}

export default SortMenu;
