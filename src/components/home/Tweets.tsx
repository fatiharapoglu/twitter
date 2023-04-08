"use client";

import { Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function Tweets() {
    return (
        <div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima possimus qui sequi quod, a repellendus, accusamus velit minus laboriosam similique eius at animi iure nisi sapiente quidem molestiae libero enim?" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}
