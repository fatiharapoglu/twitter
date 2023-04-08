"use client";

import { Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { TweetProps, TweetsArray } from "@/types/TweetProps";

export default function Tweets({ tweets }: TweetsArray) {
    return (
        <div>
            <List>
                {tweets.map((tweet: TweetProps) => {
                    return (
                        <div key={tweet.id}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText
                                        primary={tweet.text}
                                        secondary={tweet.author.username}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </div>
    );
}
