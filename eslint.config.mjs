import next from "eslint-config-next";

const config = [...next, { ignores: [".claude/**", ".next/**"] }];
export default config;
