import styled from 'styled-components';
import MainDetailTitle from '@components/common/MainDetailTitle/index.jsx';
import PropTypes from 'prop-types';
import routeTableNonDataImg from '../../../assets/images/routerTableNonData.png';
import { Box, TableCell } from '@mui/material';

VehicleDockTable.propTypes = {
  headerStrings: PropTypes.array,
  title: PropTypes.array,
  data: PropTypes.array,
  subTitle: PropTypes.string,
  dockHandler: PropTypes.func,
  type: PropTypes.string,
};

export default function VehicleDockTable({
  headerStrings = [],
  title = [],
  data = [],
  subTitle = '',
  dockHandler,
  type = 'display',
}) {
  const oneTone = data
    ?.filter(item => item.dockName.split(' - ')[0] == '1T')
    ?.map((item, index) => (
      <TableRow key={index}>
        {Object.values(item).map((value, index) => (
          <BasicTableCell key={index}>{value}</BasicTableCell>
        ))}
      </TableRow>
    ));
  const ldv = data
    ?.filter(item => item.dockName.split(' - ')[0] == 'LDV')
    ?.map((item, index) => (
      <TableRow key={index}>
        {Object.values(item).map((value, index) => (
          <BasicTableCell key={index}>{value}</BasicTableCell>
        ))}
      </TableRow>
    ));

  function LabelCell({ children, borderTop }) {
    return (
      <TableCell sx={{ padding: '6px', borderTop }} colSpan={4}>
        <Box
          sx={{
            height: '40px',
            alignContent: 'center',
            backgroundColor: '#F2F2F2',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 700,
            color: '#4D4D4D',
          }}
        >
          {children}
        </Box>
      </TableCell>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <MainDetailTitle
          title={title}
          customStyle={{
            color: '#FFF',
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '-0.54px',
            padding: '15px 20px',
            gap: '10px',
          }}
          iconType='whiteSidebarArrow'
        />
        {subTitle !== '' && <p onClick={dockHandler}>{subTitle}</p>}
      </TitleContainer>
      {data.length === 0 ? (
        type === 'display' && (
          <div
            style={{
              minWidth: '40vw',
              width: '100%',
              height: '100%',
              borderRadius: '10px',
              border: '1px solid #D5D5D5',
              background: '#FFF',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <img src={routeTableNonDataImg} width={448} height={287}></img>
            <p
              style={{
                color: '#3C3C3C',
                textAlign: 'center',
                fontFamily: 'Pretendard',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                letterSpacing: '-0.6px',
              }}
            >{`[진행 작업 없음]`}</p>
          </div>
        )
      ) : (
        <TableContainer>
          {oneTone.length > 0 && (
            <>
              <TableHeader>
                <LabelCell>{`1T 출하 도크`}</LabelCell>
                <TableRow>
                  {headerStrings?.length > 0 &&
                    headerStrings.map((str, i) => <th key={i}>{str}</th>)}
                </TableRow>
              </TableHeader>
              <TableBody>{oneTone}</TableBody>
            </>
          )}

          {ldv.length > 0 && (
            <>
              <TableHeader>
                <LabelCell
                  borderTop={'1px solid #D5D5D5'}
                >{`LDV 출하 도크`}</LabelCell>
                <TableRow>
                  {headerStrings?.length > 0 &&
                    headerStrings.map((str, i) => <th key={i}>{str}</th>)}
                </TableRow>
              </TableHeader>
              <TableBody>{ldv}</TableBody>
            </>
          )}
        </TableContainer>
      )}
    </Container>
  );
}

const BasicTableCell = styled.td`
  padding: 11px 25px;
  border-bottom: 1px solid #d8d8d8;
  align-content: center;
`;

const TableBody = styled.tbody`
  color: #828282;
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
    border-bottom: 1px solid #ccc;

    padding: 12px 20px;
  }
`;

const TableHeader = styled.thead`
  color: #4d4d4d;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Container = styled.div`
  width: 100%;
`;

const TableContainer = styled.table`
  margin-top: 16px;
  background: #fff;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #ccc;
  border-radius: 10px;

  tr:last-child td {
    border-bottom: none;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #3c3c3c;
  display: flex;
  justify-content: space-between;

  & p {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.48px;
    padding: 15px 20px;
  }
`;
