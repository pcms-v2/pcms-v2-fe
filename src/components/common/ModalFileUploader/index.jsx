import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Content,
  DeliveryExcelResult,
  ErrorDownload,
  ErrorDownLoadBox,
  FileInputWrapper,
  FileName,
  ResultBox,
  ResultText,
  ResultTitle,
  Title,
  WarningText,
} from '@components/common/ModalFileUploader/ModalFileUploader.styles.js';
import { Separator } from '../../../components/common/Separator';
import { useModalStore } from '@contexts/useModalStore.jsx';
import Icon from '../Icon';
import { ROUTING } from '@constants/apiEndpoint.jsx';
import uploadApi from '@utils/uploadApi.jsx';

const ModalFileUploader = ({ type, title, setFileData, errorDownload }) => {
  const [fileName, setFileName] = useState('');
  const [fileData] = useState([]);
  const [dataCount, setDataCount] = useState(null);
  const [errorData] = useState([]);
  const [errorMessage] = useState('');
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

  const attachTemplateFile = async event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('template', file);

    await uploadApi
      .request({
        url: ROUTING.DELIVERY_VERIFY,
        method: 'POST',
        data: formData,
      })
      .then(response => {
        if (response.data) {
          setFileName(file.name);
          setFileData(file);
          setDataCount(response.data);
        }
      });
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
        onChange={attachTemplateFile}
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
                총 택배 회수 예정 수량 : {dataCount.totalCount}건
                <br />
                정상 건 : {dataCount.normalCount}건<br />
                오류 건 : {dataCount.errorCount}건
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
