const common = {
	requireModule: ["@swc-node/register"],
	require: ["node_modules/@yolo/shared-cucumber/**/*.ts", "support/**/*.ts"],
	worldParameters: {
		region: process.env.AWS_REGION || "eu-west-2",
	},
};

export default {
	...common,
	format: ["progress-bar", "html:cucumber-report.html"],
	publishQuiet: true,
};

export const ci = {
	...common,
	parallel: 2,
	format: ["junit:cucumber-report.xml"],
	publishQuiet: true,
};
