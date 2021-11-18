// spec ref https://gcp-confluence.nextbank.com.tw/pages/viewpage.action?pageId=57618296
import {
  PostMessageBody,
  PostMessageCategory,
  PostMessageCommand,
  sendEventToApp,
} from "@/utils/postToApp";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { webviewState } from "@/store/global";
import { CampaignStatus, JoinStatus } from "@/api/campaign/types";

export enum CampaignTypes {
  CAMPAIGNS = "campaigns",
  ACTIVE_CAMPAIGNS = "active-campaigns",
  CAMPAIGN_DETAIL = "campaign-detail",
  VIEW_CAMPAIGN_DETAIL = "view-campaign-detail",
}

export enum UpdateNavCommand {
  EVENT_BACK = "event.back",
  EVENT_NEXT = "event.next",
  START = "start",
}

type IconConfig = {
  // # 顯示類型。目前只有icon與text。必填
  type: "icon" | "text";
  // # 顯示內容。若type = icon, 則為空。必key
  value: string;
  //  # 點擊行為。目前只有share與app-next, app-back, app-close, app-down, web-back, web-next。必填
  action:
    | "share"
    | "app-next"
    | "app-back"
    | "app-close"
    | "app-down"
    | "web-back"
    | "web-next";
  //   # action額外資訊。share的話可以帶入罐頭訊息。非必填
  extra?: string;
  //  # 禁用/啟用 action。 沒事千萬不要禁用！！！！
  disabled?: boolean;
};

export type UpdateNavParams = {
  //  # title bar背景色碼。非必填，若不操作則不帶此key，但app會改成預設底色
  "background-color": string;
  //  # 非必填，若不操作則不帶此key，但app會把此按鈕移除
  "left-icon"?: IconConfig;
  "right-icon"?: IconConfig;
  //  # 更改title文字。如 : 定存優惠活動, 活動詳情。非必填，若不操作則不帶此key，但app會把title清掉
  title: string;
};

export type UseCampaignParams = {
  campaignId: string;
  backUrl: string;
};

// campaign頁共通post message body
const commonBody: Pick<PostMessageBody<any>, "command" | "category"> = {
  command: PostMessageCommand.UPDATE_NAV,
  category: PostMessageCategory.CAMPAIGN,
};

// /webview/time-deposit/campaigns post message body
export const campaignsMessageBody: PostMessageBody<UpdateNavParams> = {
  ...commonBody,
  params: {
    "background-color": "#eff3f5",
    "left-icon": {
      type: "icon",
      value: "",
      action: "app-back",
    },
    title: "定存優惠活動",
  },
};

// /webview/time-deposit/active-campaigns post message body
export const activeCampaignsMessageBody: PostMessageBody<UpdateNavParams> = {
  ...commonBody,
  params: {
    "background-color": "#eff3f5",
    "left-icon": {
      type: "icon",
      value: "",
      action: "app-down",
    },
    "right-icon": {
      type: "text",
      value: "略過",
      action: "app-next",
    },
    title: "定存優惠活動",
  },
};

// /webview/time-deposit/campaign-detail/ post message body
export const campaignDetailMessageBody: (
  shareMessage?: string,
  campaignStatus?: CampaignStatus,
  joinStatus?: JoinStatus,
) => PostMessageBody<UpdateNavParams> = (
  shareMessage,
  campaignStatus,
  joinStatus,
) => ({
  ...commonBody,
  params: {
    "background-color": "#FBFBFB",
    "left-icon": {
      type: "icon",
      value: "",
      action: "web-back",
    },
    ...(campaignStatus === CampaignStatus.UPCOMING ||
    campaignStatus === CampaignStatus.VALID ||
    joinStatus === JoinStatus.NOT_JOINABLE
      ? {
          "right-icon": {
            type: "icon",
            value: "",
            action: "share",
            extra: shareMessage || "",
          },
        }
      : {}),
    title: "活動詳情",
  },
});

// /webview/time-deposit/view-campaign-detail/ post message body
export const viewCampaignDetailMessageBody: PostMessageBody<UpdateNavParams> = {
  ...commonBody,
  params: {
    "background-color": "#FBFBFB",
    "left-icon": {
      type: "icon",
      value: "",
      action: "app-down",
    },
    title: "活動詳情",
  },
};

// 傳送campaignId to app post message
export const sendCampaignIdMessageBody: (
  campaignId: string,
  backUrl: string,
) => PostMessageBody<UseCampaignParams> = (campaignId, backUrl) => ({
  command: PostMessageCommand.USE_CAMPAIGN,
  category: PostMessageCategory.CAMPAIGN,
  params: {
    campaignId,
    backUrl,
  },
});

export type UseCampaignWebview = ({
  backEvent,
  shareMessage,
  campaignId,
  backUrl,
  campaignStatus,
  joinStatus,
}: {
  backEvent?: () => void;
  shareMessage?: string;
  campaignId?: string;
  backUrl?: string;
  campaignStatus?: CampaignStatus;
  joinStatus?: JoinStatus;
}) => { sendCampaignIdToApp: () => void };

const useCampaignWebview: UseCampaignWebview = ({
  backEvent,
  shareMessage,
  campaignId,
  backUrl,
  campaignStatus,
  joinStatus,
}) => {
  const router = useRouter();

  const [postMessageBody, setPostMessageBody] =
    useState<PostMessageBody<UpdateNavParams> | null>(null);

  const [state, setState] = useRecoilState(webviewState);

  useEffect(() => {
    const { campaignType } = router.query;
    switch (campaignType) {
      case CampaignTypes.CAMPAIGNS:
        setPostMessageBody(campaignsMessageBody);
        return;
      case CampaignTypes.ACTIVE_CAMPAIGNS:
        setPostMessageBody(activeCampaignsMessageBody);
        return;
      case CampaignTypes.CAMPAIGN_DETAIL:
        setPostMessageBody(
          campaignDetailMessageBody(shareMessage, campaignStatus, joinStatus),
        );
        return;
      case CampaignTypes.VIEW_CAMPAIGN_DETAIL:
        setPostMessageBody(viewCampaignDetailMessageBody);
        break;
      default:
    }
  }, [campaignStatus, joinStatus, router.query, shareMessage]);

  const start = useCallback(() => {
    if (!state.start) {
      setState({
        start: true,
      });
    }
  }, [setState, state.start]);

  // 加上custom event listener
  useEffect(() => {
    if (typeof backEvent === "function") {
      window.addEventListener(UpdateNavCommand.EVENT_BACK, backEvent);
    }

    window.addEventListener(UpdateNavCommand.START, start);

    return () => {
      if (typeof backEvent === "function") {
        window.removeEventListener(UpdateNavCommand.EVENT_BACK, backEvent);
      }
      window.removeEventListener(UpdateNavCommand.START, start);
    };
  }, [backEvent, start]);

  useEffect(() => {
    if (state.start && postMessageBody) {
      sendEventToApp(postMessageBody);
    }
  }, [state, postMessageBody]);

  // return 給活動詳情頁送 campaignId給app
  const sendCampaignIdToApp = useCallback(() => {
    if (campaignId && backUrl) {
      sendEventToApp(sendCampaignIdMessageBody(campaignId, backUrl));
    }
  }, [backUrl, campaignId]);

  return { sendCampaignIdToApp };
};

export default useCampaignWebview;
