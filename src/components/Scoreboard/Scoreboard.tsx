import React, { useMemo, useState } from 'react'
import { UserAndScore } from '../../types';
import IndividualUserScore from '../IndividualUserScore/IndividualUserScore';
import { Box, Card, CardBody, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

interface ScoreboardProps {
  usersAndScores: UserAndScore[];
}

export default function Scoreboard({ usersAndScores }: ScoreboardProps) {

    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const sortedScores = useMemo(() => {
        const scores = [...usersAndScores].sort((a, b) => b.score - a.score);
        return scores.filter((value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );
    }, [usersAndScores]);

    const handleUserClick = (user: UserAndScore) => {
        setSelectedUser(user.name);
        setModalOpen(true);
    };

    return (
        <Card>
            <CardBody>
                <Heading>High scores</Heading>

                <UnorderedList>
                    {sortedScores.map((userScore, index) => (
                    <ListItem key={index} onClick={() => handleUserClick(userScore)}>
                        {userScore.name}: {userScore.score}
                    </ListItem>
                    ))}
                </UnorderedList>

                <IndividualUserScore 
                    usersAndScores={usersAndScores} 
                    modalOpen={modalOpen} 
                    setModalOpen={setModalOpen} 
                    selectedUser={selectedUser} 
                    setSelectedUser={setSelectedUser}/>
            </CardBody>
        </Card>
    );
}