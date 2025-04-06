"use client"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function SectionCards(datas?: any) {
  const [invoices, setInvoices] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    setInvoices(datas.datas.invoices);
    setCompanies(datas.datas.companies);
    console.log(datas)
    console.log(invoices.length)
  }, []);

  useEffect(() => {
    setInvoices(datas.datas.invoices);
    setCompanies(datas.datas.companies);
  }, [datas, invoices, companies]);
 
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Faturas Cadastradas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {invoices?.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Última fatura cadastrada: {invoices.length > 0 ? new Date(invoices[invoices.length - 1]?.createdAt).toLocaleDateString() : "Cadastre uma fatura"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Empresas Cadastradas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {companies?.length}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Button
            className="h-8 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-card"
          >
            {companies.length > 0 ? "Gerencie Empresas" : "Cadastre uma Empresa"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

