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
    id?: String
    payload?: {
        date: String,
        desc: String,
        amount: Number,
        type: TransactionTypes
    },
}

export const addIncome = (date: String, desc: String, amount: Number): ITransactionAction => ({ type: TransactionActionTypes.Add, payload: { date: date, desc: desc, amount: amount, type: TransactionTypes.Income } });
export const addExpense = (date: String, desc: String, amount: Number): ITransactionAction => ({ type: TransactionActionTypes.Add, payload: { date: date, desc: desc, amount: amount, type: TransactionTypes.Expense } });
export const removeTransaction = (id: String): ITransactionAction => ({ type: TransactionActionTypes.Remove, id: id });
