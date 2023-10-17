const Expense = require("../models/expense");
const nodemailer = require('nodemailer');

const addDebtEmail = async (req, res) => {

    const { type,
        desc,
        amount,
        cat,
        date,
        email,
        InterestType,
        percentage,} = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.email, // generated ethereal user
                pass: process.env.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.email, // sender address
            to: email, // list of receivers
            subject: "New Debt/Loan Added.", // Subject line
            html: `<p>A New Debt/Loan Was Added For Repayment Date :- ${date}</p>
            <p><br></p>
            <p>Type:- ${type}</p>
            <p>Description:- ${desc}</p>
            <p>Amount:- ${amount}</p>
            <p>Interest Percentage:- ${percentage}</p>
            <p>Interest Type:- ${InterestType}</p>
            <p>Category: - ${cat}`, // html body
        });
    } catch (error) {
        console.log(error);
    }
}

const showDebt = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id, type: "Debt/Loan" })
        res.json(expenses);
    } catch (err) {
        console.log(err);
    }
}

const deleteDebtEmail = async (req, res) => {
    let expense = await Expense.findById(req.params.id);
    const { email } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.email, // generated ethereal user
                pass: process.env.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.email, // sender address
            to: email, // list of receivers
            subject: "Debt/Loan Deleted.", // Subject line
            html: `<p>A Debt/Loan Was Deleted For Repayment Date :- ${(expense.date.toString()).slice(0,15)}</p>
            <p><br></p>
            <p>Type:- ${expense.type}</p>
            <p>Description:- ${expense.desc}</p>
            <p>Amount:- ${expense.amount}</p>
            <p>Interest Percentage:- ${expense.percentage}</p>
            <p>Interest Type:- ${expense.InterestType}</p>
            <p>Category: - ${expense.cat}`, // html body
        });

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { addDebtEmail, deleteDebtEmail,showDebt};