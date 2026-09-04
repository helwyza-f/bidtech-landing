export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  {
    value: 12400,
    suffix: "+",
    label: "Learner aktif di seluruh Indonesia",
  },
  {
    value: 42,
    label: "Mentor praktisi dari tech enterprise",
  },
  {
    value: 38,
    label: "Kelas praktis berbasis project industri",
  },
  {
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    label: "Tingkat kepuasan & relevansi materi",
  },
];
