import React from 'react';
import { ListItem, Modal, ModalBody, ModalHeader, OrderedList } from '@northlight/ui';
import { UserAndScore } from '../../app';

interface IndividualUserScoreProps {
    usersAndScores: UserAndScore[];
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    selectedUser: string | null;
    setSelectedUser: (user: string | null) => void;
}

const IndividualUserScore = ({ usersAndScores, modalOpen, setModalOpen, selectedUser, setSelectedUser }: IndividualUserScoreProps) => {
    const userScores = usersAndScores.filter(score => score.name === selectedUser).sort((a, b) => b.score - a.score);

    const closeModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    }

    return (
        <Modal isOpen={modalOpen} onClose={closeModal}>
            <ModalHeader>{selectedUser}'s Scores</ModalHeader>
            <ModalBody>
                <OrderedList>
                    {userScores.map((score, index) => (
                        <ListItem key={index}>{score.score}</ListItem>
                    ))}
                </OrderedList>
            </ModalBody>
        </Modal>

    )
}

export default IndividualUserScore