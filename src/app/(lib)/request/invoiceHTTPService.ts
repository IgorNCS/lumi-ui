import { AxiosPromise } from "axios";
import { axiosApi } from "../axios";
import Cookies from "js-cookie";

interface IInvoiceHTTPService {
  getAll: (
    page?:number,
    limit?:number,
    initialDate?:string,
    finalDate?:string,
    minAmount?:string,
    maxAmount?:string,
    companiyIds?:string[],
    userIds?:string[]
  ) => Promise<AxiosPromise>;
  create: (areaCreate: IDocumentCreate) => Promise<AxiosPromise>;
  getOne: (documentationId: string) => Promise<AxiosPromise>;
  download: (invoiceId: string) => Promise<AxiosPromise>;
}

export interface IDocumentCreate {
  name: string;
  documentText: string;
  userId: string;
  url_image?: string;
  tools?: string[];
  areas?: string[];
  processes?: string[];
}

const InvoiceHTTPService: IInvoiceHTTPService = {
  getAll: function (
    page?:number,
    limit?:number,
    initialDate?:string,
    finalDate?:string,
    minAmount?:string,
    maxAmount?:string,
    companiyIds?:string[],
    userIds?:string[]
  ): Promise<AxiosPromise<any>> {
    const params = new URLSearchParams();
    if (initialDate) params.append("initialDate", initialDate);
    if (finalDate) params.append("finalDate", finalDate);
    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    if (minAmount) params.append("minAmount", minAmount);
    if (maxAmount) params.append("maxAmount", maxAmount);
    // if (companiyIds.length) params.append("companiyIds", companiyIds.join(","));
    // if (userIds.length) params.append("userIds", userIds.join(","));
    const token = Cookies.get("access_token");
    return axiosApi.get(`/invoice?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getOne: function (documentationId: string): Promise<AxiosPromise<any>> {
    const token = Cookies.get("access_token");
    return axiosApi.get(`/invoice/${documentationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  create(documentCreate: IDocumentCreate) {
    const token = Cookies.get("access_token");
    return axiosApi.post(`/invoice`, documentCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  download: function (id: string): Promise<AxiosPromise<any>> {
    const token = Cookies.get("access_token");
    return axiosApi.get(`/invoice/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

};

export default InvoiceHTTPService;
