import { useState } from "react";
import { creditProfiles, bnplApplications } from "../../constants/mockData";
import CreditScoreGauge from "../Shared/CreditScoreGauge";
import { Coins, CreditCard, TrendingUp, ArrowRight, BadgeCheck, Banknote, Calendar } from "lucide-react";
import Modal from "../Shared/Modal";

const activeProfile = creditProfiles[0];

const creditProducts = [
  {
    id: "cp_1",
    name: "Buy Now Pay Later (BNPL)",
    type: "bnpl" as const,
    description: "Purchase inventory now and pay over 30-90 days. Cooperative-backed credit for verified buyers.",
    interestRate: 4.5,
    maxTenor: 90,
    maxAmount: 5000000,
    collateralRequired: false,
  },
  {
    id: "cp_2",
    name: "Invoice Financing",
    type: "invoice" as const,
    description: "Get immediate liquidity against your outstanding invoices. Advance up to 80% of invoice value.",
    interestRate: 3.0,
    maxTenor: 60,
    maxAmount: 10000000,
    collateralRequired: true,
  },
  {
    id: "cp_3",
    name: "Equipment Financing",
    type: "equipment" as const,
    description: "Long-term financing for production equipment and machinery upgrades. Competitive rates for cooperative members.",
    interestRate: 6.0,
    maxTenor: 180,
    maxAmount: 15000000,
    collateralRequired: true,
  },
];

export default function CreditAssessment() {
  const [selectedProduct, setSelectedProduct] = useState<typeof creditProducts[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Credit Score Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <CreditScoreGauge profile={activeProfile} />
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Fulfillment Rate</p>
                <p className="text-2xl font-bold">{activeProfile.fulfillmentRate}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Available Credit</p>
                <p className="text-2xl font-bold">₦{(activeProfile.maxCreditLimit - activeProfile.activeBnplAmount).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Credit Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {creditProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl border p-5 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                {product.type === "bnpl" ? <CreditCard className="w-5 h-5" /> :
                 product.type === "invoice" ? <Coins className="w-5 h-5" /> :
                 <TrendingUp className="w-5 h-5" />}
              </div>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-lg">{product.interestRate}%</span>
                <span className="text-muted-foreground">{product.maxTenor} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credit History */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="font-semibold mb-4">Recent Credit Activity</h3>
        <div className="space-y-3">
          {activeProfile.transactionHistory.slice(0, 4).map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                  <span>· ₦{item.amount.toLocaleString()}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                item.type === "repayment" || item.type === "sale" ? "bg-green-100 text-green-700" :
                item.type === "bnpl" ? "bg-amber-100 text-amber-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name || ""}>
        {selectedProduct && (
          <div className="space-y-4">
            <p className="text-muted-foreground">{selectedProduct.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Interest Rate</p>
                <p className="text-xl font-bold">{selectedProduct.interestRate}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Max Tenor</p>
                <p className="text-xl font-bold">{selectedProduct.maxTenor} days</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Max Amount</p>
                <p className="text-xl font-bold">₦{selectedProduct.maxAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground">Collateral Required</p>
                <p className="text-xl font-bold">{selectedProduct.collateralRequired ? "Yes" : "No"}</p>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}