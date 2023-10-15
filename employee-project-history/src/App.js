import React, { useState } from "react";
import {
  ChakraProvider,
  Heading,
  Container,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Papa from "papaparse";
import FileUploader from "./components/FileUploader";
import ProjectTable from "./components/ProjectTable";
import {
  buildEmployeeProjects,
  findLongestWorkingPair,
} from "./utils/employeeHelper";

function App() {
  const [resultPairs, setResultPairs] = useState([]);
  const [error, setError] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    setIsFileUploaded(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const csvData = result.data;
        const employeeProjects = buildEmployeeProjects(csvData);
        const bestPair = findLongestWorkingPair(employeeProjects);

        if (bestPair) {
          setResultPairs([bestPair]);
        } else {
          setError("No matching pairs found.");
        }
      },
      error: (err) => {
        setError("Error pasring the CSV file.");
      },
    });
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Container maxW="2xl">
          <Heading as="h1" size="xl" mb={6} textAlign="center">
            Employee Pair Work Duration
          </Heading>
          <FileUploader onFileUpload={handleFileUpload} />           
            {isFileUploaded && <Alert status="success"><AlertIcon />CSV file is uploaded.</Alert>}    
          {error && <Box>{error}</Box>}
          {resultPairs.length > 0 && <ProjectTable data={resultPairs} />}
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
