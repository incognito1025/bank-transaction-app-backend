const { nanoid } = require('nanoid');

const transaction = [
    { id: nanoid(), item_name: "opening deposit", amount: 10000, date: "2024-07-01", from: "self", category: "income" },
    { id: nanoid(), item_name: "groceries", amount: -150, date: "2024-07-02", from: "supermarket", category: "expense" },
    { id: nanoid(), item_name: "salary", amount: 2000, date: "2024-07-03", from: "employer", category: "income" },
    { id: nanoid(), item_name: "utility bill", amount: -100, date: "2024-07-04", from: "electric company", category: "expense" },
    { id: nanoid(), item_name: "car payment", amount: -300, date: "2024-07-05", from: "bank", category: "expense" },
    { id: nanoid(), item_name: "dining out", amount: -50, date: "2024-07-06", from: "restaurant", category: "expense" },
    { id: nanoid(), item_name: "freelance work", amount: 500, date: "2024-07-07", from: "client", category: "income" },
    { id: nanoid(), item_name: "movie night", amount: -30, date: "2024-07-08", from: "cinema", category: "expense" },
    { id: nanoid(), item_name: "gift", amount: 100, date: "2024-07-09", from: "friend", category: "income" },
    { id: nanoid(), item_name: "rent", amount: -800, date: "2024-07-10", from: "landlord", category: "expense" },
    { id: nanoid(), item_name: "online subscription", amount: -15, date: "2024-07-11", from: "service provider", category: "expense" },
    { id: nanoid(), item_name: "credit card payment", amount: -200, date: "2024-07-12", from: "credit card company", category: "expense" },
    { id: nanoid(), item_name: "interest income", amount: 50, date: "2024-07-13", from: "bank", category: "income" },
    { id: nanoid(), item_name: "student loan payment", amount: -400, date: "2024-07-14", from: "loan provider", category: "expense" },
    { id: nanoid(), item_name: "investment dividend", amount: 150, date: "2024-07-15", from: "investment company", category: "income" },
    { id: "abc123", item_name: "opening deposit", amount: 10000, date: "2024-07-01", from: "self", category: "income" },
    { id: "def456", item_name: "groceries", amount: -150, date: "2024-07-02", from: "supermarket", category: "expense" },
    { id: "ghi789", item_name: "salary", amount: 2000, date: "2024-07-03", from: "employer", category: "income" },
];

module.exports = transaction;
