import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { md5 } from "js-md5";

import { member, device } from "@/api";

interface State {
  user: Member | null;
  devices: Device[];
  todaySchedule: Record<string, DeviceFeedingPlanTodayNewResponse>;
  schedule: Record<string, DeviceFeedingPlanListResponse>;
}

interface Actions {
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getDevices: () => Promise<void>;
  getTodaySchedule: (deviceId: string) => Promise<void>;
  getSchedule: (deviceId: string) => Promise<void>;
}

const initialState: State = {
  user: null,
  devices: [],
  todaySchedule: {},
  schedule: {},
};

export const useStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      login: async (user: string, password: string) => {
        const res = await member.auth.login(user, md5(password));
        set({ user: res.data });
      },
      logout: async () => {
        set(initialState);
      },
      getDevices: async () => {
        const res = await device.device.list(get().user?.token!);
        set({ devices: res.data });
      },
      getTodaySchedule: async (deviceId: string) => {
        const res = await device.feedingPlan.todayNew(
          get().user?.token!,
          deviceId
        );
        set((state) => {
          state.todaySchedule[deviceId] = res.data;
        });
      },
      getSchedule: async (deviceId: string) => {
        const res = await device.feedingPlan.list(get().user?.token!, deviceId);
        set((state) => {
          state.schedule[deviceId] = res.data;
        });
      },
    })),
    {
      name: "storage",
    }
  )
);
