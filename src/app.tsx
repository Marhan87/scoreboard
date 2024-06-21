import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from '@chakra-ui/react'
import {
  Container,
  Box,
  P,
  VStack,
  HStack,
  H1,
  H2,
} from '@northlight/ui'
import { palette } from '@northlight/tokens'
import { ExcelDropzone, ExcelRow } from './components/ExcelDropzone/ExcelDropzone'
import  Scoreboard from './components/Scoreboard/Scoreboard'
import AddUserScore from './components/AddUserScore/AddUserScore'
import users from './data/users'
import scores from './data/scores'

interface ExternalLinkProps {
  href: string,
  children: ReactNode,
}
interface UserAndScore {
  name: string, 
  score: number,
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => <Link href={href} isExternal sx={ {color: palette.blue['500'], textDecoration: 'underline'} }>{ children }</Link>

export default function App() {
  const [usersAndScores, setUsersAndScores] = useState<UserAndScore[]>([]);

  const userNames: Record<number, string> = users.reduce((map, user) => {
    map[user._id] = user.name;
    return map;
  }, {} as Record<number, string>);

  const initialUsersAndScores: UserAndScore[] = scores.map(score => {
    const name = userNames[score.userId] || 'Unknown';
    return { name, score: score.score };
  });

  useEffect(() => {
    setUsersAndScores(initialUsersAndScores);
  }, []);

  function handleSheetData(data: ExcelRow[]) {
    const importedScores = data.map(row => ({
      name: row.name,
      score: row.score,
    }));
    setUsersAndScores(prevScores => [...prevScores, ...importedScores]);
  }

  return (
    <Container maxW="6xl" padding="4">
      <HStack spacing={10} align="flex-start">
        <ExcelDropzone onSheetDrop={handleSheetData} label="Import excel file here" />
        <VStack align="left">
          <Scoreboard usersAndScores={usersAndScores} />
          <AddUserScore 
            currentUsersAndScore={usersAndScores} 
            setUsersAndScores={(updatedUsersAndScores: UserAndScore[]) => setUsersAndScores(updatedUsersAndScores)} 
          />
        </VStack>
      </HStack>
    </Container>
  );
}
