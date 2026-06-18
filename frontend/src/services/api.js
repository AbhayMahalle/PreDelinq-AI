import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};

export const fetchModelInfo = async () => {
  const res = await api.get('/model-info');
  return res.data;
};

export const fetchPortfolioSummary = async () => {
  const res = await api.get('/portfolio-summary');
  return res.data;
};

export const fetchRiskSegments = async () => {
  const res = await api.get('/risk-segments');
  return res.data;
};

export const fetchModelComparison = async () => {
  const res = await api.get('/model-comparison');
  return res.data;
};

export const predictCustomer = async (input) => {
  const res = await api.post('/predict', input);
  return res.data;
};

export const explainCustomer = async (input) => {
  const res = await api.post('/explain', input);
  return res.data;
};

export const searchPortfolio = async (page = 1, pageSize = 20, search = '', segment = '') => {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  if (search) params.set("search", search);
  if (segment) params.set("segment", segment);
  
  const res = await api.get(`/portfolio-search?${params.toString()}`);
  return res.data;
};
