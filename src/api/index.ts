const API_BASE = "https://api.us.petlibro.com";

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
  // todo: check for code: 1009 - refresh token
  return json;
};

export const get = async <T>(
  url: string,
  token?: string,
  params?: Record<string, string>
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
    add: async (token: string, plan: Partial<FeedingPlanSchedule>) =>
      post<null>("/device/feedingPlan/add", { ...plan, id: 0 }, token),
    update: async (token: string, plan: FeedingPlanSchedule) =>
      post<null>("/device/feedingPlan/update", { ...plan }, token),
    delete: async (token: string, deviceId: string, planId: number) =>
      post<null>(
        "/device/feedingPlan/remove",
        { deviceSn: deviceId, planId },
        token
      ),
    manualFeeding: async (token: string, deviceId: string, grainNum: number) =>
      post<number>(
        "/device/feedingPlan/manualFeeding",
        { deviceSn: deviceId, grainNum, requestId: "" },
        token
      ),
  },
  msg: {
    unreadQuantity: async (token: string) =>
      get<DeviceMsgUnreadQuantityResponse>("/device/msg/unreadQuantity", token),
    page: async (
      token: string,
      module: string,
      pageIndex: number,
      pageSize: number
    ) =>
      get<Paginated<Notifcation>>("/device/msg/page", token, {
        module,
        page: pageIndex.toString(),
        pageSize: pageSize.toString(),
      }),
    detail: async (token: string, id: string) =>
      get<Notifcation>("/device/msg/detail", token, { id }),
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
};
