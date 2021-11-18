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
import { CampaignStatus } from "@/api/campaign/types";

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
  backUrl?: string;
};

// campaign頁共通post message body
const commonBody: Pick<PostMessageBody<any>, "command" | "category"> = {
  command: PostMessageCommand.UPDATE_NAV,
  category: PostMessageCategory.CAMPAIGN,
};

// /webview/payment/campaign-detail post message body
const campaignsMessageBody: PostMessageBody<UpdateNavParams> = {
  ...commonBody,
  params: {
    "background-color": "#ffffff",
    "left-icon": {
      type: "icon",
      value: "",
      action: "app-back",
    },
    title: "約定中華電信帳單",
  },
};

// 傳送campaignId to app post message
const sendCampaignIdMessageBody: () => PostMessageBody<UseCampaignParams> =
  () => ({
    command: PostMessageCommand.SETTING_PAY_BILL,
    category: PostMessageCategory.PAYBILL,
    params: {},
  });

type UseCampaignWebview = ({
  backEvent,
  shareMessage,
  campaignId,
  backUrl,
}: {
  backEvent?: () => void;
  shareMessage?: string;
  campaignId?: string;
  backUrl?: string;
  campaignStatus?: CampaignStatus;
}) => { sendCampaignIdToApp: () => void };

// TODO: 應該要再規劃與app互動的架構
const useCampaignWebview: UseCampaignWebview = ({ backEvent, backUrl }) => {
  const router = useRouter();
  const [postMessageBody, setPostMessageBody] =
    useState<PostMessageBody<UpdateNavParams> | null>(null);

  const [state, setState] = useRecoilState(webviewState);

  useEffect(() => {
    setPostMessageBody(campaignsMessageBody);
    console.log("yo");
  }, [router.query]);

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
    sendEventToApp(sendCampaignIdMessageBody());
  }, []);

  return { sendCampaignIdToApp };
};

export default useCampaignWebview;
