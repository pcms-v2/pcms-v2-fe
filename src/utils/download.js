//download.js
import { saveAs } from 'file-saver';
import { ROUTING } from '../constants/apiEndpoint';
import api from './api';

// 배송 요청 템플릿 다운로드
export const donwloadTemplate = async () => {
  try {
    const response = await api.request({
      url: ROUTING.DELIVERY_TEMPLATE,
      method: 'GET',
      responseType: 'blob',
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // 현재 시간을 'YYYYMMDDHHmmss' 형식으로 변환
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

      const filename = `sms_delivery_template_${formattedDate}.xlsx`;
      saveAs(blob, filename);
    } else {
      console.error('파일 다운로드 실패:', response.statusText);
    }
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
  }
};

export const downloadTemplateURL = async url => {
  try {
    const response = await api.request({
      url: url,
      method: 'GET',
      responseType: 'blob',
    });
    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // 현재 시간을 'YYYYMMDDHHmmss' 형식으로 변환
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

      const filename = `sms_${url.includes('collect') ? 'collection' : url.includes('recovery') ? 'recovery' : 'sorting'}_template_${formattedDate}.xlsx`;
      saveAs(blob, filename);
    } else {
      console.error('파일 다운로드 실패:', response.statusText);
    }
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
  }
};
