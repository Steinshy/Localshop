import { FetchManager } from '@utils/fetchManager';
import { ErrorObj } from '@interfaces/httpUtils';
import { handleError } from '@utils/fetchManager';

export const base_url = 'http://api.localshop.test:3005/v1',
  api = new FetchManager(base_url),
  error = (e: Error) => handleError( e as Error | ErrorObj | string)
