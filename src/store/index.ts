import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { md5 } from "js-md5";

import { member, device } from "@/api";
import { PlanState } from "@/constants";

interface State {
  user: Member | null;
  devices: Device[];
  todaySchedule: Record<string, DeviceFeedingPlanTodayNewResponse>;
  schedule: Record<string, DeviceFeedingPlanListResponse>;
  workRecord: Record<string, DeviceWorkRecordListResponse>;
}

interface Actions {
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getDevices: () => Promise<void>;
  getTodaySchedule: (deviceId: string) => Promise<void>;
  getSchedule: (deviceId: string) => Promise<void>;
  getWorkRecord: (deviceId: string) => Promise<void>;
  enableFeedingPlanToday: (
    deviceId: string,
    planId: number,
    enable: boolean
  ) => Promise<void>;
  enableFeedingPlan: (
    deviceId: string,
    planId: number,
    enable: boolean
  ) => Promise<void>;
  updateFeedingPlan: (
    deviceId: string,
    plan: FeedingPlanSchedule
  ) => Promise<void>;
  addFeedPlan: (
    deviceId: string,
    plan: Partial<FeedingPlanSchedule>
  ) => Promise<void>;
  deleteFeedPlan: (deviceId: string, planId: number) => Promise<void>;
}

const initialState: State = {
  user: null,
  devices: [],
  todaySchedule: {},
  schedule: {},
  workRecord: {},
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
      getWorkRecord: async (deviceId: string) => {
        // 24 hours ago
        const startTime = new Date().getTime() - 24 * 60 * 60 * 1000;
        const endTime = new Date().getTime();
        const res = await device.workRecord.list(
          get().user?.token!,
          deviceId,
          startTime,
          endTime
        );
        set((state) => {
          state.workRecord[deviceId] = res.data;
        });
      },
      enableFeedingPlanToday: async (
        deviceId: string,
        planId: number,
        enable: boolean
      ) => {
        const res = await device.feedingPlan.enableTodaySingle(
          get().user?.token!,
          deviceId,
          planId,
          enable
        );
        if (res && res.code === 0) {
          set((state) => {
            const index = state.todaySchedule[deviceId].plans.findIndex(
              (p) => p.planId === planId
            );
            if (index !== -1) {
              const plan = state.todaySchedule[deviceId].plans[index];
              let newState = plan.state;
              switch (plan.state) {
                case PlanState.EnabledUpcoming:
                case PlanState.DisabledUpcoming:
                  newState = enable
                    ? PlanState.EnabledUpcoming
                    : PlanState.DisabledUpcoming;
                  break;
                default:
                  break;
              }
              state.todaySchedule[deviceId].plans[index].state = newState;
            }
          });
        }
      },
      enableFeedingPlan: async (
        deviceId: string,
        planId: number,
        enable: boolean
      ) => {
        const res = await device.feedingPlan.enable(
          get().user?.token!,
          deviceId,
          planId,
          enable
        );
        if (res && res.code === 0) {
          set((state) => {
            const index = state.schedule[deviceId].findIndex(
              (p) => p.id === planId
            );
            if (index !== -1) {
              const plan = state.schedule[deviceId][index];
              plan.enable = enable;
            }
          });
        }
      },
      updateFeedingPlan: async (
        deviceId: string,
        plan: FeedingPlanSchedule
      ) => {
        const res = await device.feedingPlan.update(get().user?.token!, plan);
        if (res && res.code === 0) {
          set((state) => {
            const index = state.schedule[deviceId].findIndex(
              (p) => p.id === plan.id
            );
            if (index !== -1) {
              state.schedule[deviceId][index] = plan;
            }
          });
        }
      },
      addFeedPlan: async (
        deviceId: string,
        plan: Partial<FeedingPlanSchedule>
      ) => {
        const res = await device.feedingPlan.add(get().user?.token!, plan);
        if (res && res.code === 0) {
          set((state) => {
            // TODO: don't coerce this type
            state.schedule[deviceId].push(plan as FeedingPlanSchedule);
          });
        }
      },
      deleteFeedPlan: async (deviceId: string, planId: number) => {
        const res = await device.feedingPlan.delete(
          get().user?.token!,
          deviceId,
          planId
        );
        if (res && res.code === 0) {
          set((state) => {
            const index = state.schedule[deviceId].findIndex(
              (p) => p.id === planId
            );
            if (index !== -1) {
              state.schedule[deviceId].splice(index, 1);
            }
          });
        }
      },
    })),
    {
      name: "storage",
    }
  )
);
