import React from 'react';
import { UserAndScore } from '../../types';
import { Modal, ModalBody, ModalHeader } from '@northlight/ui';

interface IndividualUserScoreProps {
    usersAndScores: UserAndScore[];
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    selectedUser: string | null;
    setSelectedUser: (user: string | null) => void;
}

export default function IndividualUserScore({ usersAndScores, modalOpen, setModalOpen, selectedUser, setSelectedUser }: IndividualUserScoreProps) {
    const userScores = usersAndScores.filter(score => score.name === selectedUser).sort((a, b) => b.score - a.score);

    function closeModal(){
        setSelectedUser(null);
        setModalOpen(false);
    }

    return (
        <Modal isOpen={modalOpen} onClose={() => {closeModal()}}>
            <ModalHeader>{selectedUser}'s Scores</ModalHeader>
            <ModalBody>
            <ul>
                {userScores.map((score, index) => (
                    <li key={index}>{score.score}</li>
                ))}
            </ul>
            </ModalBody>
        </Modal>

    )
}