"use client";

import { SignInWall } from "@/components/dapp/SignInWall";
import {
  AskScreen,
  ContactsScreen,
  InboxScreen,
  InviteScreen,
  LinksScreen,
  OverviewScreen,
  ReceiveScreen,
  ScheduledScreen,
  SendScreen,
  SplitScreen,
} from "@/components/dapp/screens/AccountScreens";
import {
  BridgeScreen,
  BudgetsScreen,
  CardScreen,
  GoalsScreen,
  HistoryScreen,
  MarketsScreen,
  PortfolioScreen,
  ReportsScreen,
  VaultScreen,
  XeroTokenScreen,
  YieldScreen,
} from "@/components/dapp/screens/MoneyScreens";
import {
  DiscloseScreen,
  NetworkScreen,
  NumbersScreen,
  PayrollScreen,
  PrivacyScreen,
  SettingsScreen,
} from "@/components/dapp/screens/SystemScreens";
import { useDappSession } from "@/components/dapp/session/DappSession";
import type { ComponentType } from "react";

const screens: Record<string, ComponentType> = {
  "/dapp": OverviewScreen,
  "/dapp/send": SendScreen,
  "/dapp/receive": ReceiveScreen,
  "/dapp/inbox": InboxScreen,
  "/dapp/contacts": ContactsScreen,
  "/dapp/split": SplitScreen,
  "/dapp/links": LinksScreen,
  "/dapp/scheduled": ScheduledScreen,
  "/dapp/ask": AskScreen,
  "/dapp/invite": InviteScreen,
  "/dapp/vault": VaultScreen,
  "/dapp/portfolio": PortfolioScreen,
  "/dapp/markets": MarketsScreen,
  "/dapp/yield": YieldScreen,
  "/dapp/goals": GoalsScreen,
  "/dapp/budgets": BudgetsScreen,
  "/dapp/bridge": BridgeScreen,
  "/dapp/history": HistoryScreen,
  "/dapp/reports": ReportsScreen,
  "/dapp/card": CardScreen,
  "/dapp/xero": XeroTokenScreen,
  "/dapp/payroll": PayrollScreen,
  "/dapp/disclose": DiscloseScreen,
  "/dapp/privacy": PrivacyScreen,
  "/dapp/numbers": NumbersScreen,
  "/dapp/network": NetworkScreen,
  "/dapp/settings": SettingsScreen,
};

export function DappRoute({
  href,
  headline,
  body,
}: {
  href: string;
  headline: string;
  body: string;
}) {
  const { connected, ready } = useDappSession();
  if (!ready) {
    return <div className="relative z-[1] min-h-[40vh]" />;
  }
  if (!connected) {
    return <SignInWall headline={headline} body={body} />;
  }
  const Screen = screens[href] ?? OverviewScreen;
  return <Screen />;
}
