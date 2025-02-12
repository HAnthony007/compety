'use client';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from "@/locales/client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function ToggleLangage() {
    const t = useScopedI18n("language");
    const locale = useCurrentLocale();
    const changeLocale = useChangeLocale();
    return (
        <Select defaultValue={locale}
            onValueChange={(e) => changeLocale(e as "fr" | "en")}
        >
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="fr" >{t("fr")}</SelectItem>
                    <SelectItem value="en">{t("en")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}