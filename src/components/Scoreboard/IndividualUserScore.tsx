import { Modal } from '@chakra-ui/react';
import React from 'react';
import { UserAndScore } from '../../types';

interface IndividualUserScoreProps {
    usersAndScores: UserAndScore[];
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    selectedUser: string | null;
    setSelectedUser: (user: string | null) => void;
}

export default function IndividualUserScore({ usersAndScores, modalOpen, setModalOpen, selectedUser, setSelectedUser }: IndividualUserScoreProps) {
    const userScores = usersAndScores.filter(score => score.name === selectedUser).sort((a, b) => b.score - a.score);;

    return (
        <Modal isOpen={modalOpen} onClose={() => {setSelectedUser(null)}}>
            <h1>{selectedUser}'s Scores</h1>
            <ul>
                {userScores.map((score, index) => (
                    <li key={index}>{score.score}</li>
                ))}
            </ul>
            <button onClick={() => setModalOpen(false)}>Close</button>
        </Modal>

    )
}