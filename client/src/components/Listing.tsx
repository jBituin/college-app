import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Props {
  data: any[];
  dataKeys: any[];
  headers: string[];
  onRowClick?: () => {};
}

function resolve(path: string, obj: {}, separator = '.') {
  const properties: any[] = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce(
    (prev: any, curr: string) => prev && prev[curr],
    obj
  );
}

const Listing: React.FC<Props> = ({ data, dataKeys, headers, onRowClick }) => {
  return (
    <Table
      variant="simple"
      my={8}
      maxHeight="300px"
      maxH="300px"
      height="300px"
      overflow="auto"
    >
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => {
          return (
            <Tr key={item._id} onClick={onRowClick}>
              {dataKeys.map((dataKey) => (
                <Td key={resolve(dataKey, item)}>{resolve(dataKey, item)}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default Listing;
