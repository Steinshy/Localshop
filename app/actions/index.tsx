import { FetchManager } from '@utils/fetchManager';

export const base_url = 'http://api.localshop.test:3005/v1',
  api = new FetchManager(base_url)
