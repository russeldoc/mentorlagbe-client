export type UserRole = "student" | "tutor" | "admin";
export type SubscriptionPlan = "free" | "pro";

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  plan: SubscriptionPlan;
  createdAt?: string;
}

export interface TuitionItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage?: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt?: string;
  tutorProfile?: Partial<UserProfile> | null;
}

export interface TuitionApplication {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote?: string;
  status: "pending" | "accepted" | "rejected";
  appliedAt?: string;
}

export interface PaymentTransaction {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: string;
}