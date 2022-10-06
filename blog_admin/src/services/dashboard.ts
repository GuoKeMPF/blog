import { dashboard } from './api';
import { Get } from './requset';

export const getDashboard = async () => Get(dashboard);
