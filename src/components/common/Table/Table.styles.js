import styled from 'styled-components';

const TableContainer = styled.table`
  margin-top: 16px;
`;

const TableHead = styled.thead`
  border-top: 1px solid #ef831f;
  border-bottom: 1px solid #ef831f;
  background-color: #ffffff;
  padding: 12px;

  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.42px;
`;

const TableBody = styled.tbody`
  color: #4d4d4d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const TableRow = styled.tr`
  th {
    padding: 12px 0px;
  }
`;

const TableCell = styled.td`
  padding: 20px 25px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center; /* 수평 가운데 정렬 */
  vertical-align: middle; /* 수직 가운데 정렬 */
`;

const NonDataText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 100px 0;
  margin: 0;
  width: 100%;

  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.39px;
  margin-right: 3px;
`;

export {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  NonDataText,
};
