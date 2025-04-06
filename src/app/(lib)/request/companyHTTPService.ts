import { AxiosPromise } from "axios";
import { axiosApi } from "../axios";
import Cookies from "js-cookie";
interface ICompanyHTTPService {
  getAll: (areaGetAll?: IAreaGetAll) => Promise<AxiosPromise>;
  create: (areaCreate: IAreaCreate) => Promise<AxiosPromise>;
  getOne: (areaId: string) => Promise<AxiosPromise>;
  getNames: () => Promise<AxiosPromise>;
  getEmployees: (areaId: string) => Promise<AxiosPromise>;
}

interface IAreaGetAll {
  page?: number;
  limit?: number;
  initialDate?: string;
  finalDate?: string;
  search?: string;
  role?: string;
}

interface IAreaCreate {
  name: string;
  description?: string;
  responsables?: string[];
  url_image?: string;
}
const CompanyHTTPService: ICompanyHTTPService = {
  getAll: function (areaGetAll?: IAreaGetAll): Promise<AxiosPromise<any>> {
    const params = new URLSearchParams();
    if (areaGetAll) {
      const { page, limit, initialDate, finalDate, search, role } = areaGetAll;
      if (initialDate) params.append("initialDate", initialDate);
      if (finalDate) params.append("finalDate", finalDate);
      if (page) params.append("page", String(page));
      if (limit) params.append("limit", String(limit));
      if (search) params.append("search", search);
      if (role) params.append("role", role);
    }
    const token = Cookies.get("access_token");
    return axiosApi.get(`/company?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getOne: function (areaId: string): Promise<AxiosPromise<any>> {
    const token = Cookies.get("access_token");
    return axiosApi.get(`/company/${areaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getNames: function (): Promise<AxiosPromise<any>> {
    const token = Cookies.get("access_token");
    return axiosApi.get(`/company/names`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getEmployees: function (areaId: string): Promise<AxiosPromise<any>> {
    const token = Cookies.get("access_token");
    return axiosApi.get(`/company/${areaId}/employers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  create(areaCreate: IAreaCreate) {
    const token = Cookies.get("access_token");
    return axiosApi.post(`/company`, areaCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default CompanyHTTPService;
