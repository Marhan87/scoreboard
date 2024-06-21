import React, { useState } from 'react';
import { UserAndScore } from '../../types';

interface AddUserScoreProps {
    currentUsersAndScore: UserAndScore[];
    setUsersAndScores: (updatedUsersAndScores: UserAndScore[]) => void;
}

const AddUserScore = ({ currentUsersAndScore, setUsersAndScores }:AddUserScoreProps) => {
    const [newUser, setNewUser] = useState<string>('');
    const [newScore, setNewScore] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newUser.trim() === '' || isNaN(Number(newScore))) {
            alert('Please enter a valid username and score.');
            return;
        }

        const newUserAndScore: UserAndScore = {
            name: newUser,
            score: Number(newScore)
        };
        
        setUsersAndScores([...currentUsersAndScore, newUserAndScore]);
        setNewUser('');
        setNewScore('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newUser">Enter new user</label>
                <input
                    id="newUser"
                    type="text"
                    name="user"
                    placeholder="username"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <label htmlFor="newScore">Enter new score</label>
                <input
                    id="newScore"
                    type="number"
                    name="score"
                    placeholder="score"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                />
                <button type="submit">Add Score</button>
            </form>
        </div>
    );
};

export default AddUserScore;