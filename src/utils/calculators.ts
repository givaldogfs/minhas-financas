// Calculadora de Investimentos
export interface InvestmentCalculation {
  month: number;
  monthlyContribution: number;
  balance: number;
  earnings: number;
  totalContributed: number;
}

export const calculateInvestment = (
  initialAmount: number,
  monthlyContribution: number,
  monthlyRate: number,
  months: number
): InvestmentCalculation[] => {
  const results: InvestmentCalculation[] = [];
  let balance = initialAmount;
  let totalContributed = initialAmount;
  let totalEarnings = 0;

  for (let month = 1; month <= months; month++) {
    const earnings = balance * (monthlyRate / 100);
    totalEarnings += earnings;
    balance += earnings + monthlyContribution;
    totalContributed += monthlyContribution;

    results.push({
      month,
      monthlyContribution,
      balance,
      earnings: totalEarnings,
      totalContributed,
    });
  }

  return results;
};

// Calculadora de Financiamento - Tabela Price
export interface FinancingInstallment {
  installment: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export const calculateFinancingPrice = (
  loanAmount: number,
  monthlyRate: number,
  months: number
): FinancingInstallment[] => {
  const monthlyPayment =
    (loanAmount * (monthlyRate / 100)) /
    (1 - Math.pow(1 + monthlyRate / 100, -months));

  const results: FinancingInstallment[] = [];
  let remainingBalance = loanAmount;

  for (let i = 1; i <= months; i++) {
    const interest = remainingBalance * (monthlyRate / 100);
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    results.push({
      installment: i,
      payment: monthlyPayment,
      principal,
      interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return results;
};

// Calculadora de Financiamento - Sistema SAC
export const calculateFinancingSAC = (
  loanAmount: number,
  monthlyRate: number,
  months: number
): FinancingInstallment[] => {
  const principal = loanAmount / months;
  const results: FinancingInstallment[] = [];
  let remainingBalance = loanAmount;

  for (let i = 1; i <= months; i++) {
    const interest = remainingBalance * (monthlyRate / 100);
    const payment = principal + interest;
    remainingBalance -= principal;

    results.push({
      installment: i,
      payment,
      principal,
      interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return results;
};

// Calculadora de Empréstimo
export interface LoanCalculation {
  installment: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export const calculateLoan = (
  loanAmount: number,
  monthlyRate: number,
  months: number
): LoanCalculation[] => {
  const monthlyPayment =
    (loanAmount * (monthlyRate / 100)) /
    (1 - Math.pow(1 + monthlyRate / 100, -months));

  const results: LoanCalculation[] = [];
  let remainingBalance = loanAmount;

  for (let i = 1; i <= months; i++) {
    const interest = remainingBalance * (monthlyRate / 100);
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    results.push({
      installment: i,
      payment: monthlyPayment,
      principal,
      interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return results;
};

// Cálculos agregados
export const getTotalValues = (
  results: FinancingInstallment[] | LoanCalculation[]
): { totalPaid: number; totalInterest: number } => {
  const totalPaid = results.reduce((sum, item) => sum + item.payment, 0);
  const totalInterest = results.reduce((sum, item) => sum + item.interest, 0);
  return { totalPaid, totalInterest };
};
