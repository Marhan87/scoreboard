import React, { useMemo, useState } from 'react'
import IndividualUserScore from '../IndividualUserScore/IndividualUserScore';
import { Card, CardBody, Heading, ListItem, OrderedList, VStack } from '@chakra-ui/react';
import { UserAndScore } from '../../app';

interface ScoreboardProps {
  usersAndScores: UserAndScore[];
}

export default function Scoreboard({ usersAndScores }: ScoreboardProps) {

    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [userScoreModalOpen, setUserScoreModalOpen] = useState(false);

    const sortedScores = useMemo(() => {
        const scores = [...usersAndScores].sort((a, b) => b.score - a.score);
        return scores.filter((value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );
    }, [usersAndScores]);

    const handleUserClick = (user: UserAndScore) => {
        setSelectedUser(user.name);
        setUserScoreModalOpen(true);
    };

    return (
        <Card>
            <CardBody>
                <VStack spacing="2rem" align="flex-start">
                    <Heading size='md'>High scores</Heading>

                    <OrderedList>
                        {sortedScores.map((userScore) => (
                            <ListItem onClick={() => handleUserClick(userScore)} cursor="pointer">
                                {userScore.name}: {userScore.score}
                            </ListItem>
                        ))}
                    </OrderedList>

                    <IndividualUserScore 
                        usersAndScores={usersAndScores} 
                        modalOpen={userScoreModalOpen} 
                        setModalOpen={setUserScoreModalOpen} 
                        selectedUser={selectedUser} 
                        setSelectedUser={setSelectedUser}/>
                </VStack>
            </CardBody>
        </Card>
    );
}