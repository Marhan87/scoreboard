import React, { useCallback, useState } from 'react';
import { Button, Input, InputGroup, VStack } from '@northlight/ui';
import { UserAndScore } from '../../app';

interface AddUserScoreProps {
    currentUsersAndScore: UserAndScore[];
    setUsersAndScores: (updatedUsersAndScores: UserAndScore[]) => void;
}

const AddUserScore = ({ currentUsersAndScore, setUsersAndScores }:AddUserScoreProps) => {
    const [newUser, setNewUser] = useState<string>('');
    const [newScore, setNewScore] = useState<string>('');

    const isValidInput = (name: string, score: string): boolean => {
        return name.trim() !== '' && !isNaN(Number(score));
    };

    const addUserScore = (name: string, score: string) => {
        const newUserAndScore: UserAndScore = { name, score: Number(score) };
        setUsersAndScores([...currentUsersAndScore, newUserAndScore]);
    };

    const handleClick = useCallback(() => {
        if (isValidInput(newUser, newScore)) {
            addUserScore(newUser, newScore);
            setNewUser('');
            setNewScore('');
        } else {
            alert('Username or score cannot be empty and score needs to be a number, please try again.');
        }
    }, [newUser, newScore, currentUsersAndScore]);

    return (
        <InputGroup>
            <VStack align='flex-start'>
                <h2>You can add your own high score here</h2>
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