import { Box, Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = chakra(motion.div);

function ProjectTable({ data }) {
  debugger;
  return (
    <AnimatePresence mode='wait'>
      {data.length > 0 && (
        <MotionBox
          as={Box}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Employee ID #1</Th>
            <Th>Employee ID #2</Th>
            <Th>Project ID</Th>
            <Th>Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.firstEmployeeId}</Td>
              <Td>{row.secondEmployeeId}</Td>
              <Td>{row.Project}</Td>
              <Td>{row.LongestPeroidOfTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </MotionBox>
      )}
    </AnimatePresence>
  );
}

export default ProjectTable;
