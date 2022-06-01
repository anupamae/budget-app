export enum TransactionActionTypes {
    Add = 'ADD',
    Remove = 'REMOVE'
}

export enum TransactionTypes {
    Income = 'INCOME',
    Expense = 'EXPENSE'
}

export interface ITransactionAction {
    type: TransactionActionTypes,
    id?: string
    payload?: {
        date: string,
        desc: string,
        amount: number,
        type: TransactionTypes
    },
}

export const addIncome = (date: string, desc: string, amount: number): ITransactionAction => ({ type: TransactionActionTypes.Add, payload: { date: date, desc: desc, amount: amount, type: TransactionTypes.Income } });
export const addExpense = (date: string, desc: string, amount: number): ITransactionAction => ({ type: TransactionActionTypes.Add, payload: { date: date, desc: desc, amount: amount, type: TransactionTypes.Expense } });
export const removeTransaction = (id: string): ITransactionAction => ({ type: TransactionActionTypes.Remove, id: id });
