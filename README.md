# Credit Repayment Calculator

This is a simple single-page application (SPA) built using React that allows users to calculate credit repayments. The app lets users input a credit balance, interest rate, and either a fixed monthly payment or a percentage-based minimum monthly repayment. It then calculates and displays the repayment schedule, showing the breakdown of the balance, interest, and payments for each month.

## Features

- Input the credit balance, interest rate, and either fixed or minimum monthly payment.
- Choose between two modes:
  - **Fixed Payment Mode**: Calculate repayments based on a fixed monthly payment amount.
  - **Minimum Payment Mode**: Calculate repayments based on a percentage of the balance.
- Displays a detailed repayment breakdown with balance, interest, and monthly payments.
- Input validation to ensure all fields contain valid data.

## Prerequisites

Before running the application, ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the application locally:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/your-username/credit-repayment-calculator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd credit-repayment-calculator
   ```

3. Install the necessary dependencies using npm or yarn:

   ```bash
   npm install
   ```

   Or if you're using Yarn:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   Or with Yarn:

   ```bash
   yarn start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## How to Use

1. Enter your **credit balance** (the amount you owe).
2. Enter the **interest rate** (annual percentage rate) for the credit.
3. Choose between two repayment modes:
   - **Minimum Payment Mode**: Enter the percentage of your balance that you want to pay as the minimum monthly payment, and the number of months you want to calculate the repayment for.
   - **Fixed Payment Mode**: Enter a fixed monthly payment amount you can afford.
4. Click the **Calculate** button to generate the repayment breakdown.
5. The repayment schedule will display below, showing each month's balance, interest, and payment.

## Application Structure

- `App.js`: Contains the main logic and UI components for the credit repayment calculator.
- `App.css`: Contains the styling for the app's layout and appearance.
- `assets/clogo.jpg`: Image for the logo displayed at the top of the app.

## Error Handling

The app validates user input and displays error messages if:

- Credit balance or interest rate is not a valid number.
- Fixed payment or minimum payment percentage is not provided.
- Maximum months is required when using the minimum payment mode.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Please make sure to write tests and document any changes you make.

## Acknowledgments

- Thanks to the React team for providing the tools to build this app.
- Logo image was created with GPT4.0
