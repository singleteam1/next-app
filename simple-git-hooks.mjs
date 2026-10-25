export default {
  "pre-commit": "bunx lint-staged",
  // biome-ignore lint/suspicious/noTemplateCurlyInString: git hook argument
  "commit-msg": "bunx commitlint --edit ${1}",
};
