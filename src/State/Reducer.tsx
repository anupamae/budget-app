import { v4 as uuidv4 } from 'uuid';
import { ITransactionAction, TransactionActionTypes, TransactionTypes } from './Actions'

export interface ITransactionItem {
  id: string,
  date: string,
  desc: string,
  amount: number
}

export interface ITransactionState {
  list: ITransactionItem[]
}

const localStorageKey = 'transactionList';

export const loadState = (): ITransactionState => {
  try {
    const transactionList = JSON.parse(localStorage.getItem(localStorageKey) || '') as ITransactionItem[];
    if (transactionList) {
      return { list: transactionList };
    }
  } catch (_) {
  }
  return { list: [] };
};

export const saveState = (list: ITransactionItem[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(list));
};

export const transactionReducer = (state = loadState(), action: ITransactionAction) => {
  switch (action.type) {
    case TransactionActionTypes.Add:
      return {
        ...state,
        list: [
          {
            id: uuidv4(),
            date: action.payload!.date,
            desc: action.payload!.desc,
            amount: (action.payload!.type === TransactionTypes.Expense) ? 0 - action.payload!.amount : action.payload!.amount
          },
          ...state.list
        ]
      };

    case TransactionActionTypes.Remove:
      return {
        ...state,
        list: state.list.filter(trans => trans.id !== action.id)
      };

    default:
      return state;
  }
};
