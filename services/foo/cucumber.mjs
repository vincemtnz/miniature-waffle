const common = {
  requireModule: ["@swc-node/register"],
  require: ["support/**/*.ts", "node_modules/@yolo/shared-cucumber/**/*.ts"],
};

export default {
  ...common,
  format: ["progress-bar", "html:cucumber-report.html"],
};
