import React, { useEffect, useMemo, useState } from 'react'
import {
  Container,
  VStack,
  HStack,
} from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './components/ExcelDropzone/ExcelDropzone'
import  Scoreboard from './components/Scoreboard/Scoreboard'
import AddUserScore from './components/AddUserScore/AddUserScore'
import users from './data/users'
import scores from './data/scores'

export interface UserAndScore {
  name: string, 
  score: number,
}

export default function App() {
  

  const userNames: Record<number, string> = users.reduce((map, user) => {
    map[user._id] = user.name;
    return map;
  }, {} as Record<number, string>);

  //Memo not super needed here since we know the files it's coming from. But if we assume that the initial users and score can change often, possibly updating from somewhere else.
  const initialUsersAndScores = useMemo(() => {
    return scores.map(score => {
      const name = userNames[score.userId] || 'Unknown';
      return { name, score: score.score };
    });
  }, [users, scores]);
  const [usersAndScores, setUsersAndScores] = useState<UserAndScore[]>(initialUsersAndScores);

  function handleSheetData(data: ExcelRow[]) {
    const importedScores = data.filter(row => row.name && typeof row.score === 'number').map(row => ({
      name: row.name,
      score: row.score,
    }));
    setUsersAndScores(prevScores => [...prevScores, ...importedScores]);
  }

  return (
    <Container maxW="6xl" padding="4">
      <HStack spacing={10} align="flex-start">
        <VStack align="left">
          <AddUserScore 
            currentUsersAndScore={usersAndScores} 
            setUsersAndScores={(updatedUsersAndScores: UserAndScore[]) => setUsersAndScores(updatedUsersAndScores)} 
          />
        <ExcelDropzone onSheetDrop={handleSheetData} label="Import excel file here" />
        </VStack>
        <Scoreboard usersAndScores={usersAndScores} />
      </HStack>
    </Container>
  );
}
