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
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Image, Link, Spacer, Stack, Text, Badge, Heading, Icon, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, CardHeader } from "@chakra-ui/react"
import { RiBillLine, RiFilePdf2Fill } from "react-icons/ri";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState();
  const [invoices, setInvoices] = useState();
  const [invoiceList, setInvoiceList] = useState([]);
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
      const list = response.data;
      setInvoiceList(response.data.list);
      setInvoices(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function download(id: string) {
    const response = await InvoiceHTTPService.download(id);
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
  }
  console.log(invoices)

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
          <Box bg='gray.200' w='100v' height='100%' p={4} color={'gray.900'} mb={4}>
            <Flex w="100%" my="6" mx="auto" px="60">
              <Box bg='gray.200' w='100%' height='100vh' p={4} color={'gray.900'}>

                <Card
                  direction="column"
                  overflow="hidden"
                  variant="outline"
                  boxShadow="xl"
                  m={4}
                >
                  <Box
                    width="100%"
                    height="200px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative" 
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      bgImage={'https://plus.unsplash.com/premium_vector-1729152931190-e0e39785e05b?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                    />
                    <CardHeader position="relative" zIndex={1}>
                      <Heading
                        borderRadius={15}
                        p={5}
                        color="white"
                        fontSize="6xl"
                        fontWeight="bold"
                        textShadow="1px 1px 5px rgba(60, 255, 0, 0.8)"
                        textAlign="center"
                      >
                        Faturas
                      </Heading>
                    </CardHeader>

                  </Box>
                  <Stack>
                    <Flex justifyContent="space-between" mt={4}>
                      <CardBody>
                        <Heading size="sm">Faturas</Heading>
                        <Text py="1">Controle suas faturas conosco</Text>
                      </CardBody>
                      <Badge
                        alignSelf="flex-end"
                        rounded='sm'
                        bgColor={'yellow.400'}
                        borderRadius={5}
                        mr={2}
                        size={8}
                      >
                        <Icon as={RiBillLine} boxSize={5} />
                        Faturas: {invoices?.totalItems || 0}
                      </Badge>
                    </Flex>
                  </Stack>
                </Card>

                <TableContainer>
                  <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Faturas Recentes</TableCaption>
                    <Thead bgColor={'green.800'} color={'white'}>
                      <Tr>
                        <Th color={'white'}>Nome</Th>
                        <Th color={'white'}>Distribuidora</Th>
                        <Th color={'white'}>Número do cliente</Th>
                        <Th color={'white'} textAlign="center">Faturas</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {companies?.map((company) => (
                        <Tr key={company.id}>
                          <Td whiteSpace='pre-wrap' wordBreak='break-word' maxW={150}>{company?.companyInvoices[0]?.name}</Td>
                          <Td whiteSpace='pre-wrap' wordBreak='break-word' maxW={150}>{company?.companyInvoices[0]?.distributor}</Td>
                          <Td whiteSpace='pre-wrap' wordBreak='break-word' maxW={150}>{company?.companyInvoices[0]?.client}</Td>
                          <Td>
                            <Stack direction="row" spacing={2}>
                              {company?.companyInvoices.map((invoice) => (
                                <Stack key={invoice.id} direction="column" alignItems="center">
                                  <Text fontSize="xs" fontWeight="bold">{invoice.referencyMonth}</Text>
                                  <Button onClick={() => download(invoice.id)}>
                                    <Icon as={RiFilePdf2Fill} boxSize={5} m={0} />
                                  </Button>
                                </Stack>
                              ))}
                            </Stack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                {/* <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>

                  </Tbody>
                </Table>
              </TableContainer> */}
              </Box>
            </Flex>
          </Box>
        </Box>
      </SidebarInset >
    </SidebarProvider >
  )
}

