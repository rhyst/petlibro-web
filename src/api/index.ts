const API_BASE = "https://api.us.petlibro.com";

export const TokenExpiredEvent = "token-expired";

const headers = (token?: string): HeadersInit => {
  const headers = {
    "Accept-Encoding": "gzip",
    "Content-Type": "application/json; charset=utf-8",
    Language: "EN",
    Source: "ANDROID",
    Timezone: "Europe/London",
    Version: "1.2.91",
  } as Record<string, string>;
  if (token) {
    headers["token"] = token;
  }
  return headers;
};

const request = async (
  method: string,
  url: string,
  body: any,
  params: Record<string, string> = {},
  token?: string
) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(url + "?" + query, {
    method: method,
    headers: headers(token),
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (json.code === 1009) {
    document.dispatchEvent(new Event(TokenExpiredEvent));
  }
  return json;
};

export const get = async <T>(
  url: string,
  params?: Record<string, string>,
  token?: string
): Promise<APIResponse<T>> => {
  return request("GET", `${API_BASE}${url}`, {}, params, token);
};

export const post = async <T>(
  url: string,
  body: any,
  token?: string
): Promise<APIResponse<T>> => {
  return request("POST", `${API_BASE}${url}`, body, {}, token);
};

export const member = {
  auth: {
    login: async (email: string, password: string) =>
      post<MemberAuthLoginResponse>("/member/auth/login", {
        email,
        password,
        appId: 1,
        appSn: "d848728bc22847ae957db1abfa1fc5e9",
        country: "US",
        phoneBrand: "",
        phoneSystemVersion: "",
        timezone: "Europe/London",
        thirdId: null,
        type: null,
      }),
    register: async (email: string, password: string) =>
      post<MemberAuthLoginResponse>("/member/auth/register", {
        email,
        password,
        appId: 1,
        appSn: "d848728bc22847ae957db1abfa1fc5e9",
        country: "US",
        phoneBrand: "",
        phoneSystemVersion: "",
        timezone: "Europe/London",
        thirdId: null,
        type: null,
      }),
  },
  app: {
    config: (token: string) =>
      post<MemberAppConfigResponse>("/member/app/config", {}, token),
  },
  member: {
    getSetting: async (token: string) =>
      post<MemberMemberGetSettingResponse>("/member/member/getSetting", token),
    updateSetting: async (token: string, body: any) =>
      post<null>("/member/member/updateSetting", body, token),
  },
  pet: {
    list: async (token: string) =>
      post<MemberPetListResponse>("/member/pet/list", {}, token),
  },
  third: {
    tutk: {
      info: async (token: string) =>
        post<null>("/member/third/tutk/info", {}, token),
    },
  },
};

export const device = {
  room: {
    systemRooms: async (token: string) =>
      post<DeviceRoomSystemRoomsResponse>(
        "/device/room/systemRooms",
        {},
        token
      ),
  },
  data: {
    grainStatus: async (token: string, deviceId: string) =>
      post<DeviceDataGrainStatusResponse>(
        "/device/data/grainStatus",
        { id: deviceId },
        token
      ),
    petGrainStatus: async (token: string, deviceId: string) =>
      post<DeviceDataPetGrainStatusResponse>(
        "/device/data/petGrainStatus",
        { id: deviceId },
        token
      ),
  },
  device: {
    list: async (token: string) =>
      post<DeviceDeviceListResponse>("/device/device/list", {}, token),
    baseInfo: async (token: string, deviceId: string) =>
      post<DeviceBaseInfo>("/device/device/baseInfo", { id: deviceId }, token),
    realInfo: async (token: string, deviceId: string) =>
      post<DeviceDeviceRealInfoResponse>(
        "/device/device/realInfo",
        { id: deviceId },
        token
      ),
    manualFeeding: async (token: string, deviceId: string, grainNum: number) =>
      post<number>(
        "/device/device/manualFeeding",
        {
          deviceSn: deviceId,
          grainNum,
          requestId: "",
        },
        token
      ),
  },
  setting: {
    updateFeedingPlanSwitch: async (
      token: string,
      deviceId: string,
      enable: boolean
    ) =>
      post<null>(
        "/device/setting/updateFeedingPlanSwitch",
        { deviceSn: deviceId, enable },
        token
      ),
    updateUnitType: async (token: string, deviceId: string, unitType: number) =>
      post<null>(
        "/device/setting/updateUnitType",
        { deviceSn: deviceId, unitType },
        token
      ),
    getAttributeSetting: async (token: string, deviceId: string) =>
      post<DeviceSettingGetAttributeSettingResponse>(
        "/device/setting/getAttributeSetting",
        { id: deviceId },
        token
      ),
  },
  workRecord: {
    list: async (
      token: string,
      deviceId: string,
      startTime: number,
      endTime: number
    ) =>
      post<DeviceWorkRecordListResponse>(
        "/device/workRecord/list",
        { deviceSn: deviceId, startTime, endTime, size: 5 },
        token
      ),
  },
  feedingPlan: {
    todayNew: async (token: string, deviceId: string) =>
      post<DeviceFeedingPlanTodayNewResponse>(
        "/device/feedingPlan/todayNew",
        { id: deviceId },
        token
      ),
    list: async (token: string, deviceId: string) =>
      post<DeviceFeedingPlanListResponse>(
        "/device/feedingPlan/list",
        { id: deviceId },
        token
      ),
    enableTodaySingle: async (
      token: string,
      deviceId: string,
      planId: number,
      enable: boolean
    ) =>
      post<null>(
        "/device/feedingPlan/enableTodaySingle",
        { deviceSn: deviceId, planId, enable },
        token
      ),
    enable: async (
      token: string,
      deviceId: string,
      planId: number,
      enable: boolean
    ) =>
      post<null>(
        "/device/feedingPlan/enable",
        { deviceSn: deviceId, planId, enable },
        token
      ),
    add: async (token: string, plan: Partial<FeedingPlan>) =>
      post<null>("/device/feedingPlan/add", { ...plan, id: 0 }, token),
    update: async (token: string, plan: FeedingPlan) =>
      post<null>("/device/feedingPlan/update", { ...plan }, token),
    delete: async (token: string, deviceId: string, planId: number) =>
      post<null>(
        "/device/feedingPlan/remove",
        { deviceSn: deviceId, planId },
        token
      ),
  },
  msg: {
    unreadQuantity: async (token: string) =>
      get<DeviceMsgUnreadQuantityResponse>(
        "/device/msg/unreadQuantity",
        {},
        token
      ),
    page: async (
      token: string,
      module: string,
      pageIndex: number,
      pageSize: number
    ) =>
      get<Paginated<Notifcation>>(
        "/device/msg/page",
        {
          module,
          page: pageIndex.toString(),
          pageSize: pageSize.toString(),
        },
        token
      ),
    detail: async (token: string, id: string) =>
      get<Notifcation>("/device/msg/detail", { id }, token),
  },
  deviceShare: {
    myShareList: async (token: string, shareType: number) =>
      post<SharedDevice[]>(
        "/device/deviceShare/myShareList",
        { shareType },
        token
      ),
    // Accept or decline a share
    rec: async (token: string, shareId: number, rec: boolean) =>
      post<null>("/device/deviceShare/rec", { shareId, rec }, token),
  },
  deviceAudio: {
    all: async (token: string, deviceId: string) =>
      post<DeviceDeviceAudioAllResponse>(
        "/device/deviceAudio/all",
        { id: deviceId },
        token
      ),
  },
};

export const mall = {
  device: {
    cloud: {
      storage: {
        state: async (token: string, deviceId: string) =>
          get<MallDeviceCloudStorageStateResponse>(
            "/mall/device/cloud/storage/state",
            { deviceSn: deviceId },
            token
          ),
      },
    },
  },
};

export const data = {
  data: {
    realInfo: async (token: string, deviceId: string) =>
      post<DataDataRealInfoResponse>(
        "/data/data/realInfo",
        { id: deviceId },
        token
      ),
  },
  event: {
    deviceEventsV2: async (token: string, deviceId: string) =>
      post<DataEventDeviceEventsV2Response>(
        "/data/event/deviceEventsV2",
        { id: deviceId },
        token
      ),
  },
};
