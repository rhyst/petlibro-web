import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { md5 } from "js-md5";

import { member, device } from "@/api";
import { PlanState, ShareType, SharedDeviceState } from "@/constants";

interface State {
  user: Member | null;
  notificationCount: number;
  notifications: PLNotification[];
  devices: Device[];
  sharedDevices: SharedDevice[]
  todayFeedingPlan: Record<string, DeviceFeedingPlanTodayNewResponse>;
  feedingPlan: Record<string, DeviceFeedingPlanListResponse>;
  workRecord: Record<string, DeviceWorkRecordListResponse>;
}

interface Actions {
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUnreadNotificationCount: () => Promise<void>;
  getNotifications: () => Promise<void>;
  getNotification: (id: string) => Promise<void>;
  getDevices: () => Promise<void>;
  getSharedDevices: () => Promise<void>;
  confirmSharedDevice: (shareId: number, accept: boolean) => Promise<void>;
  quitSharedDevice: (deviceId: string, shareId: number) => Promise<void>;
  getTodayFeedingPlan: (deviceId: string) => Promise<void>;
  getFeedingPlan: (deviceId: string) => Promise<void>;
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
  updateFeedingPlan: (deviceId: string, plan: FeedingPlan) => Promise<void>;
  addFeedPlan: (deviceId: string, plan: Partial<FeedingPlan>) => Promise<void>;
  deleteFeedPlan: (deviceId: string, planId: number) => Promise<void>;
  manualFeed: (deviceId: string, grainNum: number) => Promise<void>;
}

const initialState: State = {
  user: null,
  notificationCount: 0,
  notifications: [],
  devices: [],
  sharedDevices: [],
  todayFeedingPlan: {},
  feedingPlan: {},
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
      getUnreadNotificationCount: async () => {
        const res1 = await device.msg.unreadQuantity(get().user?.token!);
        if (res1.code !== 0) {
          return;
        }
        set((state) => {
          state.notificationCount = res1.data.device + res1.data.notify;
        });
      },
      getNotifications: async () => {
        // TODO: handle pagination
        const res = await device.msg.page(get().user?.token!, "device", 1, 5);
        if (res.code !== 0) {
          return;
        }
        set((state) => {
          state.notifications = res.data.result;
        });
      },
      getNotification: async (id: string) => {
        const res = await device.msg.detail(get().user?.token!, id);
        if (res.code !== 0) {
          return;
        }
        set((state) => {
          const index = state.notifications.findIndex((n) => n.id === id);
          if (index !== -1) {
            state.notifications[index] = res.data;
          }
        });
      },
      getDevices: async () => {
        const res = await device.device.list(get().user?.token!);
        set({ devices: res.data });
      },
      getSharedDevices: async () => {
        const res = await device.deviceShare.myShareList(get().user?.token!, ShareType.SharedToMe);
        if (res.code !== 0) {
          return;
        }
        set({ sharedDevices: res.data });
      },
      confirmSharedDevice: async (shareId: number, accept: boolean) => {
        const res = await device.deviceShare.rec(get().user?.token!, shareId, accept);
        if (res.code !== 0) {
          return;
        }
        set((state) => {
          const index = state.sharedDevices.findIndex((d) => d.id === shareId);
          if (index !== -1) {
            state.sharedDevices[index].state = accept ? SharedDeviceState.Accepted : SharedDeviceState.Rejected;
          }
        });
      },
      quitSharedDevice: async (deviceId: string, shareId: number) => {
        const res = await device.deviceShare.quit(get().user?.token!, deviceId, shareId);
        if (res.code !== 0) {
          return;
        }
        set((state) => {
          const index = state.sharedDevices.findIndex((d) => d.id === shareId);
          if (index !== -1) {
            state.sharedDevices[index].state = SharedDeviceState.Quit;
          }
        });
      },
      getTodayFeedingPlan: async (deviceId: string) => {
        const res = await device.feedingPlan.todayNew(
          get().user?.token!,
          deviceId
        );
        set((state) => {
          state.todayFeedingPlan[deviceId] = res.data;
        });
      },
      getFeedingPlan: async (deviceId: string) => {
        const res = await device.feedingPlan.list(get().user?.token!, deviceId);
        set((state) => {
          state.feedingPlan[deviceId] = res.data;
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
            const index = state.todayFeedingPlan[deviceId].plans.findIndex(
              (p) => p.planId === planId
            );
            if (index !== -1) {
              const plan = state.todayFeedingPlan[deviceId].plans[index];
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
              state.todayFeedingPlan[deviceId].plans[index].state = newState;
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
            const index = state.feedingPlan[deviceId].findIndex(
              (p) => p.id === planId
            );
            if (index !== -1) {
              const plan = state.feedingPlan[deviceId][index];
              plan.enable = enable;
            }
          });
        }
      },
      updateFeedingPlan: async (deviceId: string, plan: FeedingPlan) => {
        const res = await device.feedingPlan.update(get().user?.token!, plan);
        if (res && res.code === 0) {
          set((state) => {
            const index = state.feedingPlan[deviceId].findIndex(
              (p) => p.id === plan.id
            );
            if (index !== -1) {
              state.feedingPlan[deviceId][index] = plan;
            }
          });
        }
      },
      addFeedPlan: async (deviceId: string, plan: Partial<FeedingPlan>) => {
        const res = await device.feedingPlan.add(get().user?.token!, plan);
        if (res && res.code === 0) {
          set((state) => {
            // TODO: don't coerce this type
            state.feedingPlan[deviceId].push(plan as FeedingPlan);
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
            const index = state.feedingPlan[deviceId].findIndex(
              (p) => p.id === planId
            );
            if (index !== -1) {
              state.feedingPlan[deviceId].splice(index, 1);
            }
          });
        }
      },
      manualFeed: async (deviceId: string, grainNum: number) => {
        const res = await device.device.manualFeeding(
          get().user?.token!,
          deviceId,
          grainNum
        );
        if (res && res.code === 0) {
          // Do something
        }
      },
    })),
    {
      name: "storage",
      skipHydration: true,
    }
  )
);

export const isReady = () => useStore?.persist?.hasHydrated();
