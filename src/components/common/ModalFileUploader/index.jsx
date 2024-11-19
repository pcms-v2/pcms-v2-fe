import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Content,
  FileInputWrapper,
  FileName,
  ResultBox,
  ResultText,
  ResultTitle,
  Title,
  WarningText,
  DeliveryExcelResult,
  ErrorDownLoadBox,
  ErrorDownload,
} from '@components/common/ModalFileUploader/ModalFileUploader.styles.js';
import * as XLSX from 'xlsx';
import { Separator } from '../../../components/common/Separator';
import { useModalStore } from '@contexts/useModalStore.jsx';
import Icon from '../Icon';

const ModalFileUploader = ({ type, title, setFileData, errorDownload }) => {
  const [fileName, setFileName] = useState('');
  const [fileData, setLocalFileData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { setErrMsg } = useModalStore();

  const fileInputRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setFileData(fileInputRef.current.files[0]); // 상위 컴포넌트에 파일 전달
  }, [fileData, errorData]);

  useEffect(() => {
    if (errorData.length > 0) {
      setErrMsg('템플릿 파일에 오류가 있습니다.');
    } else {
      setErrMsg('');
    }
  }, [errorData]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = event => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 빈 배열 제거
        jsonData = jsonData.filter(row => row.length > 0);

        validateAndSetData(jsonData);
        setFileName(file.name);

        const formData = new FormData();
        formData.append(
          'template',
          new Blob([binaryStr], { type: 'application/octet-stream' })
        );
        setFileData(formData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const validateAndSetData = data => {
    const requiredColumns =
      type === 'delivery'
        ? [
            '운송장번호',
            '고객 이름',
            '고객 연락처',
            '고객 도로명 주소 (상세주소 포함)',
            '고객 지번 주소 (상세주소 포함)',
          ]
        : type === 'recovery'
          ? [
              '운송장번호',
              '고객 이름',
              '구분(반품, 프레시백)',
              '고객 연락처',
              '고객 도로명 주소 (상세주소 포함)',
              '고객 지번 주소 (상세주소 포함)',
            ]
          : type === 'collection'
            ? [
                '고객 이름',
                '고객 연락처',
                '고객 도로명 주소 (상세주소 포함)',
                '고객 지번 주소 (상세주소 포함)',
                '운송장번호',
                '택배사',
              ]
            : type === 'sorting'
              ? ['운송장번호', '라우트명']
              : [];

    if (data.length === 0) {
      setLocalFileData([]);
      setErrorData([]);
      setErrorMessage('시트가 비어 있습니다.');
      return;
    }

    const headers = data[0];
    const isValid = requiredColumns.every(col => headers.includes(col));
    if (isValid) {
      const validData = data.filter(
        (row, index) =>
          index === 0 ||
          ((type === 'collection'
            ? row.length >= 4
            : row.length === headers.length) &&
            !row.includes())
      );
      const invalidData = data.filter(
        (row, index) =>
          index !== 0 &&
          ((type === 'collection'
            ? row.length <= 3
            : row.length !== headers.length) ||
            row.includes())
      );

      setLocalFileData(validData.slice(1));
      setErrorData(invalidData);
      setErrorMessage('');
    } else {
      setLocalFileData([]);
      setErrorData([]);
      setErrorMessage('잘못된 템플릿 파일입니다.');
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Content>
        <FileInputWrapper>
          <FileName
            style={{
              color: `${fileName ? '#4D4D4D' : '#868686'}`,
            }}
          >
            {fileName || '파일을 첨부해주세요.'}
          </FileName>
        </FileInputWrapper>
        <Button onClick={handleButtonClick}>첨부</Button>
      </Content>
      <input
        ref={fileInputRef}
        type='file'
        accept='.xlsx, .xls'
        onChange={handleFileChange}
        style={{
          display: 'none',
        }}
      />
      <Separator $bottom={20} />

      {fileName ? (
        <>
          {errorMessage ? (
            <ResultBox>
              <ResultTitle>파일 첨부 결과 조회</ResultTitle>
              <ResultText>{errorMessage}</ResultText>
            </ResultBox>
          ) : (
            <ResultBox>
              <ResultTitle>파일 첨부 결과 조회</ResultTitle>
              <ResultText>
                총 택배 회수 예정 수량 : {fileData.length + errorData.length}건
                <br />
                정상 건 : {fileData.length}건<br />
                오류 건 : {errorData.length}건
              </ResultText>
              {type === 'sorting' && (
                <ErrorDownLoadBox
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={errorDownload}
                >
                  <ErrorDownload>오류 건 다운로드</ErrorDownload>
                  <Icon
                    iconType={
                      isHovered
                        ? 'errorDownloadDeactivate'
                        : 'errorDownloadActivate'
                    }
                  />
                </ErrorDownLoadBox>
              )}
            </ResultBox>
          )}
          <Separator $top={20} $bottom={20} />
        </>
      ) : (
        <>
          <DeliveryExcelResult>
            <p>
              파일을 첨부해 주시면
              <br />
              결과가 표시 됩니다.
            </p>
          </DeliveryExcelResult>
          <Separator $top={20} $bottom={20} />
        </>
      )}
      <WarningText>
        *오류 건은 추가 후 상세페이지에서 수정이 가능합니다.
        <br />
        *오류 건은 수정 또는 삭제 후 {type === 'sorting' ? '분류' : '택배 회수'}
        가 진행 됩니다.
      </WarningText>
    </Container>
  );
};

ModalFileUploader.propTypes = {
  type: PropTypes.oneOf(['delivery', 'recovery', 'collection', 'sorting'])
    .isRequired,
  title: PropTypes.string.isRequired,
  setFileData: PropTypes.func.isRequired, // 파일 데이터 설정 함수 PropTypes 추가
  errorDownload: PropTypes.func,
};

export default ModalFileUploader;
