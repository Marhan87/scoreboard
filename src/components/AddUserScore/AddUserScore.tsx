import React, { useState } from 'react';
import { UserAndScore } from '../../types';
import { Form, TextField, NumberInput, Button, Input, InputGroup, VStack } from '@northlight/ui';

interface AddUserScoreProps {
    currentUsersAndScore: UserAndScore[];
    setUsersAndScores: (updatedUsersAndScores: UserAndScore[]) => void;
}

const AddUserScore = ({ currentUsersAndScore, setUsersAndScores }:AddUserScoreProps) => {
    const [newUser, setNewUser] = useState<string>('');
    const [newScore, setNewScore] = useState<string>('');

    const handleClick = () => {
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
        <InputGroup>
            <VStack>
                <Input
                    id="newUser"
                    type="text"
                    name="user"
                    placeholder="username"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <Input
                    id="newScore"
                    name="score"
                    placeholder="score"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                />
                <Button onClick={handleClick}>Add Score</Button>
            </VStack>
        </InputGroup>
    );
};

export default AddUserScore;