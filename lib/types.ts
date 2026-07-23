export type Order = {
  id: number;
  name: string;
  whatsapp: string;
  company: string;
  service: string;
  description: string;
  status: "baru" | "dihubungi" | "selesai";
  created_at: string;
};
