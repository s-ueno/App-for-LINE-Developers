import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useToast } from "../../../core/extensions/SnackbarExtension";
import { UpdateAccount } from "../../../store/Account/action";
import { IAccountHeader } from "../../../store/Account/model";
import { IRootState } from "../../../store/rootModel";



export function useAccountUnsubscribe(account: IAccountHeader){
    const accounts = useSelector((state: IRootState) => state.account);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toast = useToast();    
    const histroy = useHistory();
    const unsubscribe = () => {
        const newAccount = accounts.accounts.Where(x => x.id !== account.id);
        dispatch(UpdateAccount({ accounts: newAccount }));
        toast.Info(t("richmenu.messages.unlinked"));
        histroy.push("/");
    };
    return unsubscribe;
}