import _ from "lodash";

// Mui
import { Chip, Divider, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";


export const TechStackSelectArea = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [unselectedItems, setUnselectedItems] = useState(props.items);

    const handleOnSelect = (item) => {
        const newSelectedItems = [...selectedItems, item];
        const newUnselectedItems = unselectedItems.filter((unselectedItem) => !_.isEqual(unselectedItem, item));

        setSelectedItems(newSelectedItems);
        setUnselectedItems(newUnselectedItems);
        if (props.onSelectedChange) {
            props.onSelectedChange(newSelectedItems);
        }
    }

    const handleOnUnselect = (item) => {
        const newSelectedItems = selectedItems.filter((selectedItem) => !_.isEqual(selectedItem, item));
        const newUnselectedItems = [...unselectedItems, item];
        setSelectedItems(newSelectedItems);
        setUnselectedItems(newUnselectedItems);

        if (props.onSelectedChange) {
            props.onSelectedChange(newSelectedItems);
        }
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                border: '0.8px solid rgba(132, 132, 132, 0.5)',
                borderRadius: '8px',
                mb: '10px',
                p: '10px',
                backgroundColor: 'white'
            }}>
                <Typography fontSize={14}>필터링</Typography>
                <Switch />
                <Divider orientation="vertical" flexItem sx={{ ml: '10px', mr: '20px' }} />
                <ChipItemsArea items={selectedItems} onAction={handleOnUnselect}
                    isDelete={true} />
            </Box>
            <Box sx={{
                border: '0.8px solid rgba(132, 132, 132, 0.5)',
                borderRadius: '8px',
                p: '10px',
                backgroundColor: 'white'
            }}>
                <ChipItemsArea items={unselectedItems} onAction={handleOnSelect}
                    isDelete={false} />
            </Box>
        </Box>
    );
}

const ChipItemsArea = (props) => {
    const isDelete = props.isDelete;

    const handleAction = (item) => {
        props.onAction(item);
    }

    const items = [...props.items].sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0);

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
            {items.map((item, index) => {
                return (
                    <Chip key={item.name}
                        sx={{ mr: index !== items.length - 1 ? '10px' : '0px' }}
                        deleteIcon={isDelete ? <RemoveCircleOutlineIcon /> : <AddIcon />}
                        onDelete={() => handleAction(item)}
                        label={item.name + " (" + item.count + ")"}
                    />
                );
            })}
        </Box>
    );
}