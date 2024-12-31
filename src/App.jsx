import { useState } from "react";
import logo from "./assets/clogo.jpg";
import "./App.css";

function App() {
	const [creditBalance, setCreditBalance] = useState("");
	const [interestRate, setInterestRate] = useState("");
	const [minimumPercentage, setMinimumPercentage] = useState("");
	const [fixedPayment, setFixedPayment] = useState("");
	const [selectedMode, setSelectedMode] = useState("");
	const [results, setResults] = useState([]);
	const [maxMonths, setMaxMonths] = useState("");
	const [desiredMonths, setDesiredMonths] = useState("");
	const [totalInterest, setTotalInterest] = useState(0);

	const [errors, setErrors] = useState({
		creditBalance: "",
		interestRate: "",
		minimumPercentage: "",
		fixedPayment: "",
		maxMonths: "",
	});

	const validateInput = () => {
		const newErrors = {};

		if (!creditBalance || isNaN(creditBalance)) {
			newErrors.creditBalance = "Please enter a valid credit balance.";
		}
		if (!interestRate || isNaN(interestRate)) {
			newErrors.interestRate = "Please enter a valid interest rate.";
		}

		if (selectedMode === "minimum") {
			if (!maxMonths || isNaN(maxMonths)) {
				newErrors.maxMonths = "Please enter the number of months.";
			}
			if (!minimumPercentage || isNaN(minimumPercentage)) {
				newErrors.minimumPercentage =
					"Please enter a valid minimum percentage.";
			}
		} else if (selectedMode === "fixed") {
			if (!fixedPayment || isNaN(fixedPayment)) {
				newErrors.fixedPayment = "Please enter a valid fixed payment amount.";
			}
		} else if (selectedMode === "desiredMonths") {
			if (!desiredMonths || isNaN(desiredMonths)) {
				newErrors.desiredMonths = "Please enter a valid number of months.";
			}
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const initializeRepaymentVariables = () => ({
		breakdown: [],
		months: 0,
		totalInterestPaid: 0,
	});

	const calculateMinimumRepayments = (balance, monthlyInterestRate) => {
		const { breakdown } = initializeRepaymentVariables();
		let { months, totalInterestPaid } = initializeRepaymentVariables(); // Use `let` here

		const minPercentage = parseFloat(minimumPercentage) / 100;

		while (balance > 0 && months < parseInt(maxMonths, 10)) {
			const interest =
				monthlyInterestRate > 0 ? balance * monthlyInterestRate : 0;
			const payment = Math.max(balance * minPercentage, 5); // Minimum payment

			totalInterestPaid += interest;

			breakdown.push({
				month: months + 1,
				balance: balance.toFixed(2),
				interest: interest.toFixed(2),
				payment: payment.toFixed(2),
			});

			balance += interest - payment;
			if (balance < 0) balance = 0; // Avoid negative balance
			months++;
		}

		return { breakdown, totalInterestPaid };
	};

	const calculateFixedRepayments = (balance, monthlyInterestRate) => {
		const { breakdown } = initializeRepaymentVariables();
		let { months, totalInterestPaid } = initializeRepaymentVariables();
		const fixedPaymentValue = parseFloat(fixedPayment);

		while (balance > 0) {
			const interest =
				monthlyInterestRate > 0 ? balance * monthlyInterestRate : 0;

			totalInterestPaid += interest;

			breakdown.push({
				month: months + 1,
				balance: balance.toFixed(2),
				interest: interest.toFixed(2),
				payment: fixedPaymentValue.toFixed(2),
			});

			balance += interest - fixedPaymentValue;
			if (balance < 0) balance = 0; // Avoid negative balance
			months++;
		}

		return { breakdown, totalInterestPaid };
	};

	const calculateDesiredMonthsRepayments = (balance, monthlyInterestRate) => {
		const { breakdown } = initializeRepaymentVariables();
		let { months, totalInterestPaid } = initializeRepaymentVariables();
		const totalMonths = parseInt(desiredMonths, 10);
		let monthlyPayment;

		if (monthlyInterestRate === 0) {
			monthlyPayment = balance / totalMonths;
		} else {
			monthlyPayment =
				(balance * monthlyInterestRate) /
				(1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
		}

		while (balance > 0 && months < totalMonths) {
			const interest =
				monthlyInterestRate > 0 ? balance * monthlyInterestRate : 0;

			totalInterestPaid += interest;

			breakdown.push({
				month: months + 1,
				balance: balance.toFixed(2),
				interest: interest.toFixed(2),
				payment: monthlyPayment.toFixed(2),
			});

			balance += interest - monthlyPayment;
			if (balance < 0) balance = 0; // Avoid negative balance
			months++;
		}

		return { breakdown, totalInterestPaid };
	};

	const calculateRepayments = () => {
		if (!validateInput()) {
			return;
		}

		let balance = parseFloat(creditBalance);
		const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
		let results, totalInterestPaid;

		if (selectedMode === "minimum") {
			({ breakdown: results, totalInterestPaid } = calculateMinimumRepayments(
				balance,
				monthlyInterestRate
			));
		} else if (selectedMode === "fixed") {
			({ breakdown: results, totalInterestPaid } = calculateFixedRepayments(
				balance,
				monthlyInterestRate
			));
		} else if (selectedMode === "desiredMonths") {
			({ breakdown: results, totalInterestPaid } =
				calculateDesiredMonthsRepayments(balance, monthlyInterestRate));
		}

		setResults(results);
		setTotalInterest(totalInterestPaid);
	};

	return (
		<>
			<div className="logo-container">
				<img src={logo} className="logo" alt="Calculator logo" />
			</div>
			<div className="heading">Credit Repayment Calculator</div>
			<div className="calculator-card">
				<form
					className="credit-value-input"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="input-heading">
						<label>Credit balance: </label>
						<input
							type="number"
							value={creditBalance}
							onChange={(e) => setCreditBalance(e.target.value)}
						/>
						{errors.creditBalance && (
							<p className="error-message">{errors.creditBalance}</p>
						)}
						<br />
					</div>
					<div className="input-heading">
						<label>Interest rate (%): </label>
						<input
							type="number"
							value={interestRate}
							onChange={(e) => setInterestRate(e.target.value)}
						/>
						{errors.interestRate && (
							<p className="error-message">{errors.interestRate}</p>
						)}
						<br />
					</div>
					<div className="new-input-section">
						<label htmlFor="min-payments">
							Calculate providers minimum payment each month
						</label>
						<input
							type="radio"
							value="minimum"
							id="min-payments"
							checked={selectedMode === "minimum"}
							onChange={(e) => {
								setSelectedMode(e.target.value);
							}}
						/>
						<br />
					</div>
					<div className="input-heading">
						<label htmlFor="repayments">
							How long this will it take to repay at value provided
						</label>
						<input
							type="radio"
							value="fixed"
							id="repayments"
							checked={selectedMode === "fixed"}
							onChange={(e) => {
								setSelectedMode(e.target.value);
							}}
						/>
					</div>
					<div className="input-heading">
						<label htmlFor="month-repayments">Repay in X Months</label>
						<input
							type="radio"
							value="desiredMonths"
							id="month-repayments"
							checked={selectedMode === "desiredMonths"}
							onChange={(e) => setSelectedMode(e.target.value)}
						/>
					</div>
					{selectedMode === "minimum" && (
						<>
							<div>
								<div className="new-input-section">
									<label>Minimum monthly repayment as a (%) </label>
									<input
										type="number"
										value={minimumPercentage}
										onChange={(e) => setMinimumPercentage(e.target.value)}
									/>
									{errors.minimumPercentage && (
										<p className="error-message">{errors.minimumPercentage}</p>
									)}
									<br />
								</div>
								<div className="input-heading">
									<label>Number of months to calculate:</label>
									<input
										type="number"
										value={maxMonths}
										onChange={(e) => setMaxMonths(e.target.value)}
									/>
									{errors.maxMonths && (
										<p className="error-message">{errors.maxMonths}</p>
									)}
								</div>
							</div>
						</>
					)}

					{selectedMode === "fixed" && (
						<>
							<div className="new-input-section">
								<label>How much do you want to repay each month? </label>
								<input
									type="number"
									value={fixedPayment}
									onChange={(e) => setFixedPayment(e.target.value)}
								/>
								{errors.fixedPayment && (
									<p className="error-message">{errors.fixedPayment}</p>
								)}
							</div>
						</>
					)}

					{selectedMode === "desiredMonths" && (
						<>
							<div className="new-input-section">
								<label>How many months do you want to payback over? </label>
								<input
									type="number"
									value={desiredMonths}
									onChange={(e) => setDesiredMonths(e.target.value)}
								/>
								{errors.desiredMonths && (
									<p className="error-message">{errors.desiredMonths}</p>
								)}
							</div>
						</>
					)}
				</form>

				<button
					className="clear-button"
					onClick={() => window.location.reload()}
				>
					Clear
				</button>

				<button className="calculate-button" onClick={calculateRepayments}>
					Calculate
				</button>
			</div>

			{results.length > 0 && (
				<>
					<div className="results-summary">
						<h2>Total Interest Paid</h2>
						<p>£{totalInterest.toFixed(2)}</p>
					</div>
					<div className="results-table">
						<h2>Repayment Breakdown</h2>
						<table>
							<thead>
								<tr>
									<th>Month</th>
									<th>Balance</th>
									<th>Interest</th>
									<th>Payment</th>
								</tr>
							</thead>
							<tbody>
								{results.map((row) => (
									<tr key={row.month}>
										<td>{row.month}</td>
										<td>£{row.balance}</td>
										<td>£{row.interest}</td>
										<td>£{row.payment}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</>
	);
}

export default App;
