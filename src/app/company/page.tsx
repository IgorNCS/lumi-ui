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
import { Box } from "@chakra-ui/react"

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
  console.log(invoices[0])

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
        <Box w='100%' minHeight='100%' p={4}>
          This is the Box
        </Box>
      </SidebarInset>
    </SidebarProvider>
  )
}

