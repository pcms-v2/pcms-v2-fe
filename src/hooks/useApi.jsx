// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../utils/api';

const useApi = (endpoint, method = 'GET', body = null, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.request({
          url: endpoint,
          method,
          data: body,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body, options]);

  return { data, loading, error };
};

export default useApi;
