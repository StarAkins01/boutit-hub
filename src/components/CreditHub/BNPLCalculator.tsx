import { useState } from "react";
import { Calculator, Percent, Calendar, Banknote, ArrowRight } from "lucide-react";

export default function BNPLCalculator() {
  const [amount, setAmount] = useState(500000);
  const [tenor, setTenor] = useState(60);
  const interestRate = 4.5;

  const totalInterest = (amount * interestRate / 100) * (tenor / 30);
  const totalRepayment = amount + totalInterest;
  const monthlyInstallment = totalRepayment / (tenor / 30);
  const effectiveRate = ((totalRepayment / amount) - 1) * 100;

  return (
    <div className="bg-white rounded-xl border p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">BNPL Repayment Calculator</h3>
          <p className="text-xs text-muted-foreground">Estimate your buy-now-pay-later costs</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Purchase Amount: <span className="font-bold">₦{amount.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={10000}
            max={5000000}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₦10,000</span>
            <span>₦5,000,000</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Repayment Tenor: <span className="font-bold">{tenor} days</span>
          </label>
          <input
            type="range"
            min={15}
            max={180}
            step={15}
            value={tenor}
            onChange={(e) => setTenor(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>15 days</span>
            <span>180 days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted-foreground">Interest Rate</p>
          <p className="font-bold flex items-center gap-1">
            <Percent className="w-3.5 h-3.5 text-indigo-500" />
            {interestRate}%
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted-foreground">Total Interest</p>
          <p className="font-bold">₦{Math.round(totalInterest).toLocaleString()}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted-foreground">Monthly Installment</p>
          <p className="font-bold">₦{Math.round(monthlyInstallment).toLocaleString()}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted-foreground">Effective Rate</p>
          <p className="font-bold">{effectiveRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="p-4 bg-indigo-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Total Repayment</p>
          <p className="text-2xl font-bold text-indigo-600">₦{Math.round(totalRepayment).toLocaleString()}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Repay in {Math.ceil(tenor / 30)} monthly installments of ₦{Math.round(monthlyInstallment).toLocaleString()}
        </p>
        <button className="w-full mt-3 bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-sm">
          Apply for BNPL <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}