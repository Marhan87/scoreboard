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
      <H1 marginBottom="4">Mediatool exercise</H1>
      <HStack spacing={10} align="flex-start">
        <ExcelDropzone onSheetDrop={handleSheetData} label="Import excel file here" />
        <VStack align="left">
          <Box>
            <H2>Initial site</H2>
            <P>
              Drop the excel file scores.xlsx that you will find in this repo in the area to the left and watch the log output in the console.
              We hope this is enough to get you started with the import.
            </P>
          </Box>
          <Box>
            <H2>Styling and Northlight</H2>
            <P>
              Styling is optional for this task and not a requirement. The styling for this app is using our own library Northlight which in turn is based on Chakra UI. You <i>may</i> use it to give some style to the application but again, it is entirely optional.
            </P>
            <P>
              Checkout <ExternalLink href="https://chakra-ui.com/">Chakra UI</ExternalLink> for layout components such as <ExternalLink href="https://chakra-ui.com/docs/components/box">Box</ExternalLink>, <ExternalLink href="https://chakra-ui.com/docs/components/stack">Stack</ExternalLink>, <ExternalLink href="https://chakra-ui.com/docs/components/grid">Grid</ExternalLink>, <ExternalLink href="https://chakra-ui.com/docs/components/flex">Flex</ExternalLink> and others.
            </P>
            <P>
              Checkout <ExternalLink href="https://northlight.dev/">Northlight</ExternalLink> for some of our components.
            </P>
          </Box>
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
