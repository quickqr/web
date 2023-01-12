import hljs from "highlight.js/lib/core";
import hlJSON from "highlight.js/lib/languages/json";
// @ts-ignore
import hlCURL from "highlightjs-curl"

hljs.registerLanguage("json", hlJSON)
hljs.registerLanguage("curl", hlCURL)
hljs.registerLanguage('url', function () {
    return {
        case_insensitive: true,
        contains: [
            hljs.HASH_COMMENT_MODE,
            {
                className: "code", // (protocol: http) color #397300
                begin: /(https?|ftp|file)(?=(:\/\/))/,
            },
            {
                className: "meta hljs-emphasis", // (hostname: api.someservice.io) color #1f7199 italic
                begin: /(?<=((https?|ftp|file):\/\/))[^@:\/\?\n\r]+/,
            },
            {
                className: "comment", // (authority: @www.example.com) color #697070
                begin: /(?<=((https?|ftp|file):\/\/[^:\/@\n\r]+)@)[^:\/\n\r]+/,
            },
            {
                className: "tag hljs-emphasis", // (port: 8000) color #444a italic
                begin: /(?<=((https?|ftp|file):\/\/[^:\/\n\r]+):)[0-9]+/,
            },
            {
                className: "symbol", // (pathname: path1/path2/dothis) color #ab5656
                begin: /(?<=((https?|ftp|file):\/\/[^\/\n\r]+)\/)[^?\n\r]+/,
            },
            {
                className: "literal", // (attribute) color #695
                begin: /(?<=[?&])[^=?&\n\r]+/,
            },
            {
                className: "meta", // (value) color #1f7199
                begin: /(?<=\=)[^=?&\n\r]+/,
            }
        ],
    }
});