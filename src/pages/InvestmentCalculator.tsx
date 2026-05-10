import React, { useState } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { calculateInvestment, InvestmentCalculation } from '../utils/calculators';
import { formatCurrency } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(12);
  const [months, setMonths] = useState(60);
  const [results, setResults] = useState<InvestmentCalculation[]>([]);

  const monthlyRate = annualRate / 12;

  const handleCalculate = () => {
    const calculatedResults = calculateInvestment(
      initialAmount,
      monthlyContribution,
      monthlyRate,
      months
    );
    setResults(calculatedResults);
  };

  const finalResult = results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className="space-y-8">
      {/* Título */}
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-8 h-8 text-emerald-500" />
        <h2 className="text-3xl font-bold text-white">Calculadora de Investimentos</h2>
      </div>

      {/* Inputs */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-6">Parâmetros do Investimento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Capital Inicial */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Capital Inicial (R$)
            </label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Aporte Mensal */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Aporte Mensal (R$)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Taxa Anual */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Taxa Anual (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Meses */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Período (meses)
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Botão Calcular */}
        <button
          onClick={handleCalculate}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          Calcular Investimento
        </button>
      </div>

      {/* Resultados */}
      {finalResult && (
        <>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-emerald-500/30">
              <p className="text-slate-400 text-sm mb-2">Saldo Final</p>
              <p className="text-2xl font-bold text-emerald-400">
                {formatCurrency(finalResult.balance)}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-emerald-500/30">
              <p className="text-slate-400 text-sm mb-2">Total Investido</p>
              <p className="text-2xl font-bold text-blue-400">
                {formatCurrency(finalResult.totalContributed)}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-emerald-500/30">
              <p className="text-slate-400 text-sm mb-2">Rendimentos</p>
              <p className="text-2xl font-bold text-yellow-400">
                {formatCurrency(finalResult.earnings)}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-emerald-500/30">
              <p className="text-slate-400 text-sm mb-2">Rentabilidade</p>
              <p className="text-2xl font-bold text-purple-400">
                {((finalResult.earnings / finalResult.totalContributed) * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Gráfico */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-white">Evolução do Investimento</h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8"
                  label={{ value: 'Meses', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  label={{ value: 'Saldo (R$)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Saldo Total"
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  name="Rendimentos Acumulados"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela Detalhada */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Tabela Detalhada</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700 border-b border-slate-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">Mês</th>
                    <th className="px-4 py-3 text-right text-slate-300 font-semibold">Aporte</th>
                    <th className="px-4 py-3 text-right text-slate-300 font-semibold">Saldo</th>
                    <th className="px-4 py-3 text-right text-slate-300 font-semibold">Rendimentos</th>
                    <th className="px-4 py-3 text-right text-slate-300 font-semibold">Total Investido</th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, 12).map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 text-slate-300">{row.month}</td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatCurrency(row.monthlyContribution)}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-semibold">
                        {formatCurrency(row.balance)}
                      </td>
                      <td className="px-4 py-3 text-right text-yellow-400">
                        {formatCurrency(row.earnings)}
                      </td>
                      <td className="px-4 py-3 text-right text-blue-400">
                        {formatCurrency(row.totalContributed)}
                      </td>
                    </tr>
                  ))}
                  {results.length > 12 && (
                    <tr className="border-b border-slate-700 bg-slate-700/30">
                      <td colSpan={5} className="px-4 py-3 text-center text-slate-400">
                        ... {results.length - 12} registros omitidos (mostrando primeiros 12 meses)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
