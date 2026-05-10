import React, { useState } from 'react';
import { DollarSign, TrendingUp, Home, Banknote } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import InvestmentCalculator from './pages/InvestmentCalculator';
import FinancingCalculator from './pages/FinancingCalculator';
import LoanCalculator from './pages/LoanCalculator';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'investment':
        return <InvestmentCalculator />;
      case 'financing':
        return <FinancingCalculator />;
      case 'loan':
        return <LoanCalculator />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <DollarSign className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-white">Minhas Finanças</h1>
            </div>
            <p className="text-slate-400 text-sm">Calculadora Financeira Profissional</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                currentPage === 'dashboard'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('investment')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                currentPage === 'investment'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Investimentos
            </button>
            <button
              onClick={() => setCurrentPage('financing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                currentPage === 'financing'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              Financiamento
            </button>
            <button
              onClick={() => setCurrentPage('loan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                currentPage === 'loan'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Banknote className="w-4 h-4" />
              Empréstimo
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <p>© 2026 Minhas Finanças - App Profissional para Funcionários de Bancos</p>
        </div>
      </footer>
    </div>
  );
}
