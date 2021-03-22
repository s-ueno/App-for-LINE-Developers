import { IActionBase } from "../IActionBase";

export const WAITING_OVERLAY_SITE = "WAITING_OVERLAY_SITE";

export function WaitSite(open: boolean): IWaitSiteType {
    return { type: WAITING_OVERLAY_SITE, openWaitingSite: open };
}
interface IWaitSiteType extends IActionBase {
    openWaitingSite: boolean
};

