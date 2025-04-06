"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import CompanyHTTPService from "@/app/(lib)/request/companyHTTPService"
import { useEffect, useState } from "react"
import InvoiceHTTPService from "@/app/(lib)/request/invoiceHTTPService"
import { ComponentBar } from "@/components/chart-bar"

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [initialDate, setInitialDate] = useState<string | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    getAll(page);
    getAllInvoice(page);
  }, []);

  async function getAll(page: number) {
    setLoading(true);
    try {
      const response = await CompanyHTTPService.getAll(page, limit, initialDate, finalDate);
      const list = response.data.list;
      setCompanies(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllInvoice(page: number) {
    setLoading(true);
    try {
      const response = await InvoiceHTTPService.getAll(page, limit, initialDate, finalDate,);
      const list = response.data.list;
      setInvoices(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards datas={{ companies, invoices }} />
              <div className="px-4 lg:px-6">
                <ComponentBar data={invoices} />
              </div>
           
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
