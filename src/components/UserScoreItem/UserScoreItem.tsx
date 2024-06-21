import React from 'react';
import { ListItem } from "@chakra-ui/react";
import { UserAndScore } from "../../app";

interface UserScoreItemProps {
  userScore: UserAndScore;
  onUserClick: (user: UserAndScore) => void;
}

export default function UserScoreItem({ userScore, onUserClick }: UserScoreItemProps) {
    return (
        <ListItem onClick={() => onUserClick(userScore)} cursor="pointer">
            {userScore.name}: {userScore.score}
        </ListItem>
    );
};