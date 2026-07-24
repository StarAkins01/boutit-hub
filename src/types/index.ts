export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  location: string;
  region: Region;
  producerName: string;
  producerId: string;
  totalCapacity: number;
  idleCapacityPct: number;
  pricePerUnit: number;
  moq: number;
  image: string;
  verified: boolean;
  description: string;
  tierPricing: TierPrice[];
  unit: string;
  createdAt: string;
}

export interface TierPrice {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
}

export type ProductCategory =
  | "Agro-Processing"
  | "Textiles & Apparel"
  | "Footwear & Leather"
  | "Plastics & Packaging"
  | "Light Machinery"
  | "Chemical Raw Materials";

export type Region =
  | "Lagos"
  | "Aba"
  | "Kano"
  | "Ibadan"
  | "Onitsha"
  | "Nnewi";

export interface BulkPool {
  id: string;
  title: string;
  category: ProductCategory;
  targetQuantity: number;
  currentQuantity: number;
  unitDiscountPrice: number;
  originalPrice: number;
  deadline: string;
  participantsCount: number;
  description: string;
  unit: string;
  participants: PoolParticipant[];
}

export interface PoolParticipant {
  id: string;
  name: string;
  quantity: number;
  joinedAt: string;
}

export interface CreditProfile {
  id: string;
  businessName: string;
  ownerName: string;
  monthlyVolume: number;
  fulfillmentRate: number;
  creditScore: number;
  maxCreditLimit: number;
  activeBnplAmount: number;
  riskGrade: RiskGrade;
  transactionHistory: TransactionRecord[];
}

export type RiskGrade = "A+" | "A" | "B+" | "B" | "C" | "D";

export interface TransactionRecord {
  date: string;
  type: "sale" | "purchase" | "bnpl" | "repayment";
  amount: number;
  description: string;
}

export interface Order {
  id: string;
  buyerName: string;
  buyerId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentType: "direct" | "bnpl";
  status: OrderStatus;
  deliveryRoute: string;
  createdAt: string;
  estimatedDelivery: string;
  tracking: TrackingEvent[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface LogisticsRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  estimatedHours: number;
  freightCostPerKg: number;
  bulkDiscountThreshold: number;
  bulkDiscountPct: number;
}

export interface DeliveryRequest {
  id: string;
  routeId: string;
  orderId: string;
  weightKg: number;
  status: "pending" | "in_transit" | "delivered";
  cost: number;
  estimatedDelivery: string;
  tracking: TrackingEvent[];
}

export interface Collateral {
  id: string;
  producerId: string;
  inventoryTitle: string;
  estimatedValue: number;
  loanValue: number;
  status: "active" | "released" | "liquidated";
  createdAt: string;
}

export interface BNPLApplication {
  id: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  termDays: 30 | 60 | 90;
  interestRate: number;
  monthlyPayment: number;
  status: "pending" | "approved" | "active" | "completed" | "defaulted";
  productId: string;
  productTitle: string;
  appliedAt: string;
  approvedAt?: string;
  repayments: Repayment[];
}

export interface Repayment {
  dueDate: string;
  amount: number;
  paid: boolean;
  paidAt?: string;
}

export type UserRole = "producer" | "buyer" | "lender" | "admin";

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  businessName: string;
}

export interface PlatformMetrics {
  totalTransactions: number;
  totalVolume: number;
  activePools: number;
  totalSavings: number;
  creditDistributed: number;
  fulfillmentRate: number;
  activeUsers: number;
  registeredProducers: number;
}