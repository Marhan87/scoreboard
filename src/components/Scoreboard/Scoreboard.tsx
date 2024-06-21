import React, { useMemo, useState } from 'react'
import { UserAndScore } from '../../types';
import IndividualUserScore from './IndividualUserScore';

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
        <div>
            <h1>High scores</h1>
            <ul>
                {sortedScores.map((userScore, index) => (
                <li key={index} onClick={() => handleUserClick(userScore)}>
                    {userScore.name}: {userScore.score}
                </li>
                ))}
            </ul>
            <IndividualUserScore 
                usersAndScores={usersAndScores} 
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen} 
                selectedUser={selectedUser} 
                setSelectedUser={setSelectedUser}/>
        </div>
    );
}