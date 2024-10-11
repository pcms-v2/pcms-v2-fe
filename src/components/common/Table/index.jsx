import PropTypes from 'prop-types';
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NonDataText,
} from './Table.styles';
import { TABLE_HEADER } from '../../../constants/text';
import { camelToUpperSnakeCase } from '../../../utils/common';

const Table = ({ tableType, data }) => {
  const reversedData = [...data].reverse();

  return data.length === 0 ? (
    <NonDataText>{TABLE_HEADER.NO_DATA}</NonDataText>
  ) : (
    <TableContainer>
      <TableHead>
        <TableRow>
          {reversedData?.length > 0 &&
            Object.keys(reversedData[0]).map(key => (
              <th key={key}>
                {
                  TABLE_HEADER[camelToUpperSnakeCase(tableType)][
                    camelToUpperSnakeCase(key)
                  ]
                }
              </th>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {reversedData?.map((item, index) => (
          <TableRow key={index}>
            {Object.values(item).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

Table.propTypes = {
  tableType: PropTypes.oneOf([
    'routeType',
    'route',
    'deliveryDriver',
    'deliveryRound',
    'sortingRound',
    'recoveryRound',
    'collectionRound',
    'collectionInventory',
    'adminUser',
    'shipper',
  ]).isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
