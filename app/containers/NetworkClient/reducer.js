import { fromJS } from 'immutable';
import {
  SET_SIGNER,
  LOADED_NETWORKS,
  UPDATE_NETWORKS,
  READER_ENABLED,
  WRITER_ENABLED,
  WRITER_DISABLED,
  LOAD_ACCOUNT,
  LOADED_ACCOUNT,
  SET_NETWORK,
  SET_IDENTITY,
  PUSH_TRANSACTION,
  TOGGLE_OFFLINE,
  UPDATE_PRODUCER_MONITOR,
  UPDATE_CHAIN_MONITOR,
  UPDATE_TOKEN_PRICES,
} from './constants';

const initialState = fromJS({
  readerLoading: true,
  writerLoading: false,
  accountLoading: false,
  networkSigner: false,
  networkReader: null,
  networkWriter: null,
  networkIdentity: null,
  networkAccount: null,
  networkSelected: null,
  networks: [],
  tokens: [],
  claims: [],
  producerMonitor: [],
  chainMonitor: null,
  transaction: null,
  offlineMode: false,
  override: true,
  networkTime: 0,
  tokenPrices: [],
});

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SIGNER:
      return state.set('networkSigner', action.networkSigner).set('writerLoading', true);
    case LOADED_NETWORKS:
      return state.set('networks', action.networks).set('networkSelected', action.defaultNetwork);
    case UPDATE_NETWORKS:
      return state.set('networks', action.networks);
    case READER_ENABLED:
      return state
        .set('networkReader', action.networkReader)
        .set('tokens', action.tokens)
        .set('claims', action.claims)
        .set('readerLoading', false);
    case WRITER_ENABLED:
      return state
        .set('networkWriter', action.networkWriter)
        .set('networkIdentity', action.networkIdentity)
        .set('writerLoading', false);
    case WRITER_DISABLED:
      return state
        .set('networkWriter', null)
        .set('networkAccount', null)
        .set('networkIdentity', null)
        .set('writerLoading', false);
    case LOAD_ACCOUNT:
      return state.set('accountLoading', true);
    case LOADED_ACCOUNT:
      return state.set('networkAccount', action.networkAccount).set('accountLoading', false);
    case SET_NETWORK:
      const validTime = state.get('networkTime') + 1000 * 30 < Date.now(); // wait 30 seconds between swaps
      if (action.override || (!state.get('override') && validTime)) {
        return state
          .set('networkSelected', action.networkSelected)
          .set('networkReader', null)
          .set('networkWriter', null)
          .set('readerLoading', true)
          .set('writerLoading', true)
          .set('networkTime', Date.now())
          .set('override', !!action.override);
      }
      return state;

    case SET_IDENTITY:
      return state
        .set('networkWriter', null)
        .set('networkAccount', null)
        .set('writerLoading', true);
    case PUSH_TRANSACTION:
      return state.set('transaction', action.transaction);
    case TOGGLE_OFFLINE:
      return state.set('offlineMode', !state.get('offlineMode'));
    case UPDATE_PRODUCER_MONITOR:
      return state.set('producerMonitor', action.producerMonitor);
    case UPDATE_CHAIN_MONITOR:
      return state.set('chainMonitor', action.chainMonitor);
    case UPDATE_TOKEN_PRICES:
      const prices = action.tokenPrices === null || action.tokenPrices === undefined ? [] : action.tokenPrices;
      return state.set('tokenPrices', prices);
    default:
      return state;
  }
}

export default clientReducer;
