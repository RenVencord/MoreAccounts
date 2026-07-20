import definePlugin from "@utils/types";

export default definePlugin({
    name: "MoreAccounts",
    description: "Raises the account switcher limit above the default of 5.",
    authors: [{ name: "ren", id: 163734654040539136n }],

    patches: [
        {
            find: "maxNumAccounts:5",
            replacement: {
                match: /maxNumAccounts:5/,
                replace: "maxNumAccounts:10",
            },
        },
        {
            find: ".length<5&&",
            replacement: {
                match: /\.length<5/,
                replace: ".length<10",
            },
        },
        {
            find: ".length>=5?",
            replacement: {
                match: /\.length>=5/,
                replace: ".length>=10",
            },
        },
    ],
});