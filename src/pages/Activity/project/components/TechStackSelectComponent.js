import _ from "lodash";

// Mui
import { Chip, Divider, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";


export const TechStackSelectArea = (props) => {
    const [selectedItems, setSelectedItems] = useState(props.items);
    const [unselectedItems, setUnselectedItems] = useState([]);
    const [isActive, setIsActive] = useState(false);

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

    const handleOnSwitchChange = (event) => {
        setIsActive(event.target.checked);
    }


    return (
        <Box>
            <Box sx={{
                border: '0.8px solid rgba(132, 132, 132, 0.5)',
                borderRadius: '8px',
                p: '10px',
                backgroundColor: 'white',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: '10px',
                }}>
                    <Typography fontSize={14} color='rgba(0, 0, 0, 0.7)'>필터링</Typography>
                    <Switch onChange={handleOnSwitchChange} />
                    <Divider orientation="vertical" flexItem sx={{ ml: '10px', mr: '20px' }} />
                    <ChipItemsArea items={isActive ? selectedItems : props.items} onAction={handleOnUnselect}
                        isDelete={true} active={isActive} />
                </Box>
                {
                    isActive && <Box>
                        <Divider sx={{ margin: '10px 0px ' }} />
                        <Box sx={{
                            p: '10px',
                            minHeight: '20px'
                        }}>
                            <ChipItemsArea items={unselectedItems} onAction={handleOnSelect}
                                isDelete={false} active={isActive} />
                        </Box>
                    </Box>
                }

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
            gap: '12px 10px',
        }}>
            {items.map((item, index) => {
                return (
                    <Chip key={item.name}
                        sx={{
                            backgroundColor: !isDelete || !props.active ? 'white' : '#F4F4F4',
                            boxShadow: !isDelete || !props.active ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            border: '0.8px solid rgba(132, 132, 132, 0.5)',
                            color: !isDelete || !props.active ? 'rgba(0, 0, 0, 0.7)' : '#000000',
                            p: '5px',
                        }}
                        deleteIcon={isDelete ? <RemoveCircleOutlineIcon /> : <AddIcon />}
                        onDelete={props.active ? () => handleAction(item) : null}
                        label={item.name + " (" + item.count + ")"}
                    />
                );
            })}
        </Box>
    );
}