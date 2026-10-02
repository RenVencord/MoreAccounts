import definePlugin from "@utils/types";

const MAX_ACCOUNTS = 10;

export default definePlugin({
    name: "MoreAccounts",
    description: "Raises the account switcher limit above the default of 5.",
    authors: [{ name: "ren", id: 163734654040539136n }],

    patches: [
        {
            // The store that persists the account list. On every CONNECTION_OPEN it cuts the list down to the limit
            // and deletes the saved token of every account beyond it, which is why extra accounts were gone after a
            // restart. The find has to be specific: "MultiAccountStore" alone also appears in AuthenticationStore's
            // omit list, which loads first, so the patch was consumed there and never reached the real store.
            find: 'persistKey="MultiAccountStore"',
            replacement: {
                match: /\.length>5&&(\i)\.splice\(5\)/,
                replace: `.length>${MAX_ACCOUNTS}&&$1.splice(${MAX_ACCOUNTS})`
            }
        },
        {
            // The Add Account modal: the "limit reached" message, the check that clears that message and the check
            // behind the Add Account button all live in this one component.
            find: "maxNumAccounts:5",
            replacement: [
                {
                    match: /maxNumAccounts:5/,
                    replace: `maxNumAccounts:${MAX_ACCOUNTS}`
                },
                {
                    match: /(\i)\.length<5&&/,
                    replace: `$1.length<${MAX_ACCOUNTS}&&`
                },
                {
                    match: /(\i)\.length>=5\?/,
                    replace: `$1.length>=${MAX_ACCOUNTS}?`
                }
            ]
        }
    ],
});
