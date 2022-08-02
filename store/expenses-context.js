import { createContext, useReducer } from "react";

const DUMMY_EXPENSES1 = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 89.99,
        date: new Date('2022-07-15'),
    },
    {
        id: 'e2',
        description: 'A pair of Trouser',
        amount: 79.99,
        date: new Date('2022-07-16'),
    },
    {
        id: 'e3',
        description: 'Bananas',
        amount: 3.99,
        date: new Date('2022-05-15'),
    },
    {
        id: 'e4',
        description: 'Book - Rich Dad',
        amount: 14.19,
        date: new Date('2022-07-19'),
    },
    {
        id: 'e5',
        description: 'Book - Bhokal',
        amount: 7.35,
        date: new Date('2022-07-22'),
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 89.99,
        date: new Date('2022-07-15'),
    },
    {
        id: 'e7',
        description: 'A pair of Trouser',
        amount: 79.99,
        date: new Date('2022-07-16'),
    },
    {
        id: 'e8',
        description: 'Bananas',
        amount: 3.99,
        date: new Date('2022-05-15'),
    },
    {
        id: 'e9',
        description: 'Book - Rich Dad',
        amount: 14.19,
        date: new Date('2022-07-19'),
    },
    {
        id: 'e10',
        description: 'Book - Bhokal',
        amount: 7.35,
        date: new Date('2022-07-22'),
    },
];

const DUMMY_EXPENSES = [];


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expenses) => {}, 
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [{...action.payload }, ...state]

        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default: 
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, [] );

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData })
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses});
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData} });
    }

    const value= {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;