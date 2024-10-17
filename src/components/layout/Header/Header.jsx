import PropTypes from 'prop-types';
import { memo } from 'react';
import {
  HeaderContainer,
  TopContainer,
  MainTitle,
  BottomContainer,
  FilterContainer,
  ButtonContainer,
  BottomLeftContainer,
  StatusBoxContainer,
  SubTitle,
  SecondStatusTitle,
} from './Header.styles';
import CommonButton from '../../common/Button';
import SearchInput from '../../common/SearchInput';
import CalenderPicker from '../../common/CalenderPicker';
import Filter from '../../common/Filter';
import SectionDivider from '../../common/SectionDivider';
import StatusBox from '../../common/StatusBox';
import Select from '../../common/Select';
import RequsetStatusBox from '../../common/RequsetStatusBox';

const Header = ({
  title = '',
  subTitle = '',
  buttonLabel = [],
  calenderPicker = false,
  calenderPickerTitle,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  search = false,
  searchPlaceholder = '',
  onSearch,
  filter = false,
  filterType,
  selectLabel = '',
  selectOptions = [],
  statusNumber,
  statusTitle = [],
  statusValue = [],
  sectionDivider = false,
  onButtonClick = [],
  onFilterChange,
  onSelectChange = [], // 수정된 부분
  requestStatusBox = false,
  requestStatusBoxTitle = '',
  requestStatusButtonTitle = [],
  requestStatusBoxOnclick,
  middleElement = false,
  sectionDividerMargin = [],
  secondStatus = [],
}) => {
  return (
    <HeaderContainer>
      <TopContainer>
        <MainTitle>
          {title}
          <SubTitle>{subTitle}</SubTitle>
        </MainTitle>
        <ButtonContainer>
          {buttonLabel.map((buttonLabel, index) => (
            <CommonButton
              key={index}
              label={buttonLabel}
              type='black'
              onClick={onButtonClick[index]}
            />
          ))}
        </ButtonContainer>
      </TopContainer>
      <BottomContainer
        style={middleElement ? { alignItems: 'flex-end' } : null}
      >
        <BottomLeftContainer
          style={
            middleElement ? { gap: '16px', flexDirection: 'column' } : null
          }
        >
          {statusNumber !== 0 && statusNumber && (
            <div>
              <StatusBoxContainer>
                {Array.from({ length: statusNumber }).map((_, index) => (
                  <StatusBox
                    key={index}
                    title={statusTitle[index]}
                    value={statusValue[index]}
                  />
                ))}
              </StatusBoxContainer>
              {secondStatus.length !== 0 && (
                <StatusBoxContainer
                  style={{
                    marginTop: '16px',
                  }}
                >
                  <SecondStatusTitle>집하주소</SecondStatusTitle>
                  {secondStatus.map((status, index) => (
                    <StatusBox
                      key={index}
                      title={status.key}
                      value={status.value}
                    />
                  ))}
                </StatusBoxContainer>
              )}
            </div>
          )}
          {filter && (
            <FilterContainer>
              <Filter type={filterType} onFilterChange={onFilterChange} />
            </FilterContainer>
          )}
          <div
            style={{
              display: 'flex',
              gap: '26px',
            }}
          >
            {selectLabel &&
              selectLabel.map((label, index) => (
                <Select
                  key={index}
                  label={label}
                  options={selectOptions[index] || []} // 배열이 아닌 경우 빈 배열로 대체
                  onChange={onSelectChange[index]} // 수정된 부분
                />
              ))}
            {requestStatusBox && (
              <RequsetStatusBox
                label={requestStatusBoxTitle}
                buttonTitle={requestStatusButtonTitle}
                onClick={requestStatusBoxOnclick}
              />
            )}
          </div>
        </BottomLeftContainer>
        <>
          {search && (
            <SearchInput placeholder={searchPlaceholder} onSearch={onSearch} />
          )}
          {calenderPicker && (
            <CalenderPicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              calenderPickerTitle={calenderPickerTitle}
            />
          )}
        </>
      </BottomContainer>
      {sectionDivider && <SectionDivider margin={sectionDividerMargin || []} />}
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonLabel: PropTypes.array,
  calenderPicker: PropTypes.bool,
  calenderPickerTitle: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  search: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  filter: PropTypes.bool,
  filterType: PropTypes.oneOf(['route', 'deliveryDriver', 'sortRound']),
  selectLabel: PropTypes.array,
  selectOptions: PropTypes.arrayOf(PropTypes.array), // 배열의 배열로 PropTypes 정의
  statusNumber: PropTypes.number,
  statusTitle: PropTypes.array,
  statusValue: PropTypes.array,
  sectionDivider: PropTypes.bool,
  onButtonClick: PropTypes.array,
  onFilterChange: PropTypes.func,
  onSelectChange: PropTypes.arrayOf(PropTypes.func), // 수정된 부분
  requestStatusBox: PropTypes.bool,
  requestStatusBoxTitle: PropTypes.string,
  requestStatusButtonTitle: PropTypes.array,
  requestStatusBoxOnclick: PropTypes.arrayOf(PropTypes.func),
  middleElement: PropTypes.bool,
  sectionDividerMargin: PropTypes.array,
  secondStatus: PropTypes.array,
};

export default memo(Header);
