// release.config.cjs
module.exports = {
  branches: ["main"],

  repositoryUrl:
    process.env.CI_REPOSITORY_URL ||
    "https://gitlab.geosphere.at/gis/test/devops.git",

  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { breaking: true, release: "major" },
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      { preset: "conventionalcommits" },
    ],
    "@semantic-release/gitlab",
  ],
};
