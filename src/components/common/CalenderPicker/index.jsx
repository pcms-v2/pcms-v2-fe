import { forwardRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import {
  DateBox,
  DateContainer,
  DateTitle,
  CustomDateInput,
} from './CalenderPicker.styles';
import { TITLE } from '../../../constants/text';
import Icon from '../Icon';
import { setToEndOfDay, setToStartOfDay } from '../../../utils/setDate';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <CustomDateInput ref={ref}>
    <input type='text' value={value} readOnly onClick={onClick} />
    <Icon iconType='calendar' onClick={onClick} />
  </CustomDateInput>
));

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

CustomInput.displayName = 'CustomInput';

const CalenderPicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  calenderPickerTitle,
}) => {
  const today = new Date();

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const handleStartDateChange = date => {
    onStartDateChange(setToStartOfDay(date));
  };

  const handleEndDateChange = date => {
    onEndDateChange(setToEndOfDay(date));
  };

  return (
    <DateBox>
      <DateContainer>
        <DateTitle>
          {calenderPickerTitle || TITLE.DATE.RECOVERY_REQUEST}
        </DateTitle>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat='yy-MM-dd'
          customInput={<CustomInput ref={startDatePickerRef} />}
          maxDate={endDate}
          ref={startDatePickerRef}
        />
        <span> ~ </span>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat='yy-MM-dd'
          customInput={<CustomInput ref={endDatePickerRef} />}
          maxDate={today}
          minDate={startDate}
          ref={endDatePickerRef}
        />
      </DateContainer>
    </DateBox>
  );
};

CalenderPicker.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  calenderPickerTitle: PropTypes.string,
};

export default CalenderPicker;
