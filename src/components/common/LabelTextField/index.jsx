import { Stack, SvgIcon, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

LabelTextField.propTypes = {
  width: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default function LabelTextField(props) {
  const { width, label, defaultValue, disabled, ...rest } = props;

  return (
    <Stack
      alignItems='center'
      justifyContent='space-between'
      direction='row'
      spacing='14px'
    >
      <Typography
        sx={{
          width: '61px',
          color: '#4D4D4D',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 700,
        }}
      >
        {label}
      </Typography>

      <>
        {disabled ? (
          <Stack
            sx={{
              width: width,
              height: '34px',
              backgroundColor: '#F4F4F4',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: '11px',
              border: ' 1px solid #D5D5D5',
              borderRadius: '8px',
            }}
            direction='row'
          >
            <Typography
              sx={{ color: '#4D4D4D', fontSize: '16px', fontWeight: '600' }}
            >
              {defaultValue}
            </Typography>

            <SvgIcon sx={{ width: '11px', height: '15px' }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 11 15'
                fill='#EF831F'
                cursor='default'
              >
                <path d='M9.47678 5.80186V3.97523C9.47678 1.78328 7.6935 0 5.50155 0C3.3096 0 1.52322 1.78019 1.52322 3.97214V5.79876C0.665635 5.90402 0 6.63467 0 7.52012V12.4396C0 13.3963 0.780186 14.1765 1.73684 14.1765H9.26316C10.2198 14.1765 11 13.3963 11 12.4396V7.52012C11 6.63467 10.3344 5.90402 9.47678 5.79876V5.80186ZM6.05573 10.0031C6.06811 10.0495 6.0774 10.0991 6.0774 10.1517V11.8669C6.0774 12.1858 5.81734 12.4458 5.49845 12.4458C5.17957 12.4458 4.9195 12.1858 4.9195 11.8669V10.1517C4.9195 10.0991 4.92879 10.0526 4.94118 10.0031C4.57895 9.80495 4.33127 9.42415 4.33127 8.98142C4.33127 8.33746 4.85449 7.81115 5.50155 7.81115C6.14861 7.81115 6.67183 8.33437 6.67183 8.98142C6.67183 9.42415 6.42415 9.80495 6.06192 10.0031H6.05573ZM7.73994 5.78638H3.26006V3.97214C3.26006 2.73684 4.26625 1.73375 5.49845 1.73375C6.73065 1.73375 7.73684 2.73994 7.73684 3.97214V5.78638H7.73994Z' />
              </svg>
            </SvgIcon>
          </Stack>
        ) : (
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                width: width,
                height: '34px',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#D5D5D5',
                },
                '&:hover fieldset': {
                  borderColor: '#EF831F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#EF831F',
                },
              },
              '& .MuiInputBase-input': {
                color: '#4D4D4D',
                fontSize: '16px',
                fontWeight: 600,
                padding: '0px 11px',
                '&::placeholder': {
                  fontWeight: 500,
                },
              },
            }}
            defaultValue={defaultValue}
            {...rest}
          />
        )}
      </>
    </Stack>
  );
}
