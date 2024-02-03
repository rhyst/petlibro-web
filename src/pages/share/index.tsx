import React, { useEffect } from "react";

import { useStore } from "@/store";
import Header from "@/components/Header";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { SharedDeviceState } from "@/constants";

const stateMap: Record<number, string> = {
  [SharedDeviceState.Pending]: "Pending",
  [SharedDeviceState.Accepted]: "Accepted",
  [SharedDeviceState.Rejected]: "Rejected",
  [SharedDeviceState.Cancelled]: "Cancelled",
  [SharedDeviceState.Quit]: "Quit",
};

export default function Home() {
  const {
    user,
    sharedDevices,
    getSharedDevices,
    confirmSharedDevice,
    quitSharedDevice,
  } = useStore();

  useEffect(() => {
    if (user) {
      getSharedDevices();
    }
  }, [user, getSharedDevices]);

  const fromName = (user: Member | null, share: SharedDevice) => {
    if (share.fromMemberId === user?.memberId) {
      return "You";
    }
    return share.fromNickname
      ? `${share.fromNickname} (${share.fromAccount})`
      : share.fromAccount;
  };

  const toName = (user: Member | null, share: SharedDevice) => {
    if (share.toMemberId === user?.memberId) {
      return "You";
    }
    share.toNickname
      ? `${share.toNickname} (${share.toAccount})`
      : share.toAccount;
  };

  return (
    <>
      {sharedDevices.length ? (
        <>
          <Header className="mt-6">Shared Devices</Header>
          <div className="grid mt-6 grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center ">
            <Text size="small" className="font-bold">
              Name
            </Text>
            <Text size="small" className="font-bold">
              From
            </Text>
            <Text size="small" className="font-bold">
              To
            </Text>
            <Text size="small" className="font-bold">
              State
            </Text>
            <Text size="small" className="font-bold">
              Action
            </Text>
            {sharedDevices.map((share) => (
              <React.Fragment key={share.id}>
                <Text>{share.deviceName}</Text>
                <Text>{fromName(user, share)}</Text>
                <Text>{toName(user, share)}</Text>
                <Text>{stateMap[share.state]}</Text>
                <div className="flex">
                  {share.state === SharedDeviceState.Pending && (
                    <>
                      <Button
                        variant="transparent"
                        onClick={() => confirmSharedDevice(share.id, true)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="transparent"
                        onClick={() => confirmSharedDevice(share.id, false)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {share.state === SharedDeviceState.Accepted && (
                    <Button
                      variant="transparent"
                      onClick={() => quitSharedDevice(share.deviceSn, share.id)}
                    >
                      Quit
                    </Button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <Text className="mt-6">No devices found</Text>
      )}
    </>
  );
}
