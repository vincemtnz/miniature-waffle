const common = {
  requireModule: ["@swc-node/register"],
  require: ["node_modules/@yolo/shared-cucumber/**/*.ts", "support/**/*.ts"],
};

export default {
  ...common,
  format: ["progress-bar", "html:cucumber-report.html"],
};
